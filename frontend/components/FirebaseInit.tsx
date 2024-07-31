"use client";

import { useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import { useAuth, getTokenFromCookie } from '@/contexts/auth-context';
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "optiwaste-19300.firebaseapp.com",
    projectId: "optiwaste-19300",
    storageBucket: "optiwaste-19300.appspot.com",
    messagingSenderId: "1007165989012",
    appId: "1:1007165989012:web:46d17e7306554fc3251481",
    measurementId: "G-168DKTZ6V9"
};

const FirebaseInit = () => {
  const { user } = useAuth();
  const messagingRef = useRef<Messaging | null>(null);
  const tokenSentRef = useRef(false);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    messagingRef.current = getMessaging(app);

    const initFirebase = async () => {
      await registerServiceWorker();
      await requestPermission();

      const unsubscribe = onMessage(messagingRef.current!, (payload) => {
        console.log('Message received. ', payload);
        if (payload.notification) {
          new Notification(payload.notification.title!, {
            body: payload.notification.body,
          });
        }
      });

      return () => {
        unsubscribe();
      };
    };

    initFirebase();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (user && !tokenSentRef.current) {
      getMessagingToken();
    }
  }, [user]); // This effect runs when user changes

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    } catch (error) {
      console.error('An error occurred while requesting permission ', error);
    }
  };

  const getMessagingToken = async () => {
    try {
      if (user && messagingRef.current) {
        const token = getTokenFromCookie();
        console.log('token:', token);

        // Wait for the Service Worker to be ready
        await navigator.serviceWorker.ready;

        const currentToken = await getToken(messagingRef.current, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
        });
        console.log('current token:', currentToken);
        if (currentToken) {
          await sendTokenToServer(token!, currentToken!);
          tokenSentRef.current = true;
        } else {
          console.log('No registration token available. Request permission to generate one.');
          await requestPermission();
        }
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err);
    }
  };

  const sendTokenToServer = async (token: string, fmcToken: string) => {
    try {
      const response = await axios.put(`${API_URL}/collectors/updateFMCToken`, {fmcToken}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        throw new Error('Failed to update FCM token');
      }
      console.log('FCM token updated successfully');
    } catch (error) {
      console.error('Error updating FCM token:', error);
    }
  };

  return null;
};

export default FirebaseInit;