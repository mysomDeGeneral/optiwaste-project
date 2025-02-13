"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface PushNotificationProps {
  onRequestOpen: (requestId: string) => void;
}

const PushNotification: React.FC<PushNotificationProps> = ({ onRequestOpen }) => {
  const { user, token } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'NOTIFICATION_CLICKED') {
        onRequestOpen(event.data.requestId);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [onRequestOpen]);

  useEffect(() => {
    const fetchData = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.register('/sw-push.js');
          console.log('Service Worker registered successfully:', registration);

          await initializePushNotifications(registration);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
          setError(`Service Worker registration failed: ${error}`);
        }
      } else {
        setError('Push notifications are not supported in this browser');
      }
    };

    fetchData();
  }, []);

  const initializePushNotifications = async (registration: ServiceWorkerRegistration) => {
    try {
      console.log('Initializing push notifications...');

      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data.type === 'NOTIFICATION_CLICKED') {
          onRequestOpen(event.data.requestId);
        }
      });

      console.log('Requesting notification permission...');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
      }
      console.log('Notification permission granted');

      const subscription = await subscribeUserToPush(registration);
      const collectorId = await getCollectorId();
      await sendSubscriptionToBackend(subscription, collectorId);
      setIsSubscribed(true);
      console.log('Push notification setup complete');
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
      setError(`Failed to initialize push notifications: ${error}`);
    }
  };

  const subscribeUserToPush = async (registration: ServiceWorkerRegistration) => {
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    console.log('VAPID Public Key:', vapidPublicKey);

    if (!vapidPublicKey) {
      throw new Error('VAPID public key is not set');
    }

    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    };

    try {
      console.log('Subscribing user to push...');
      const subscription = await registration.pushManager.subscribe(subscribeOptions);
      console.log('User is subscribed:', subscription);
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe the user: ', error);
      throw error;
    }
  };

  const sendSubscriptionToBackend = async (subscription: PushSubscription, collectorId: string) => {
    try {
      console.log('Sending subscription to backend...');
      const response = await axios.post(`${API_URL}/subscribe`, {
        collectorId,
        subscription: JSON.stringify(subscription)
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Backend subscription response:', response.data);
    } catch (error) {
      console.error('Error sending subscription to backend:', error);
      throw error;
    }
  };

  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const getCollectorId = async () => {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }
    const payload = decodeJwt(token);
    return payload.id as string;
  }

  return (
    <div>
      <h2>Push Notification Status</h2>
      {isSubscribed ? (
        <p>Subscribed to push notifications</p>
      ) : (
        <p>Not subscribed to push notifications</p>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default PushNotification;