"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export function useMailbox() {
    const [account, setAccount] = useState(null);
    const [token, setToken] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const initialized = useRef(false);

    const generateNewEmail = useCallback(async () => {
        setIsLoading(true);
        try {
            // 1. Get available domains
            const domainsResponse = await fetch('/api/mail?path=/domains');
            const domainsData = await domainsResponse.json();
            const domain = domainsData['hydra:member'][0].domain;

            // 2. Create a random account
            const randomString = Math.random().toString(36).substring(7);
            const address = `${randomString}@${domain}`;
            const password = 'password123'; // Static password for temp accounts is fine

            const createResponse = await fetch('/api/mail', {
                method: 'POST',
                body: JSON.stringify({
                    path: '/accounts',
                    body: { address, password }
                })
            });
            const accountData = await createResponse.json();

            // 3. Get JWT token
            const tokenResponse = await fetch('/api/mail', {
                method: 'POST',
                body: JSON.stringify({
                    path: '/token',
                    body: { address, password }
                })
            });
            const tokenData = await tokenResponse.json();

            setAccount(accountData);
            setToken(tokenData.token);
            setMessages([]);

            // Store in session storage for persistence on reload
            sessionStorage.setItem('mail_burst_account', JSON.stringify({ ...accountData, password, token: tokenData.token }));
        } catch (error) {
            console.error('Error generating Mail.tm account:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkInbox = useCallback(async (isManual = false) => {
        if (!token) return;
        if (isManual) setIsRefreshing(true);

        try {
            const response = await fetch(`/api/mail?path=/messages`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            const newMessages = data['hydra:member'] || [];

            if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
                setMessages(newMessages);
            }
        } catch (error) {
            console.error('Error checking inbox:', error);
        } finally {
            if (isManual) setIsRefreshing(false);
        }
    }, [token, messages]);

    const getMessageContent = useCallback(async (id) => {
        if (!token) return null;
        try {
            const response = await fetch(`/api/mail?path=/messages/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return await response.json();
        } catch (error) {
            console.error('Error reading message:', error);
            return null;
        }
    }, [token]);

    const deleteMessage = useCallback(async (id) => {
        if (!token) return false;
        try {
            const response = await fetch(`/api/mail?path=/messages/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 204) {
                setMessages(prev => prev.filter(msg => msg.id !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting message:', error);
            return false;
        }
    }, [token]);

    // Initial load logic
    useEffect(() => {
        if (initialized.current) return;

        const stored = sessionStorage.getItem('mail_burst_account');
        if (stored) {
            const data = JSON.parse(stored);
            setAccount(data);
            setToken(data.token);
            setIsLoading(false);
        } else {
            generateNewEmail();
        }

        initialized.current = true;
    }, [generateNewEmail]);

    // Polling
    useEffect(() => {
        if (!token) return;
        const interval = setInterval(() => checkInbox(), 5000);
        return () => clearInterval(interval);
    }, [token, checkInbox]);

    return {
        email: account?.address || '',
        messages,
        isLoading,
        isRefreshing,
        generateNewEmail: () => {
            sessionStorage.removeItem('mail_burst_account');
            generateNewEmail();
        },
        checkInbox,
        getMessageContent,
        deleteMessage
    };
}
