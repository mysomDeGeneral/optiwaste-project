"use client"
import React, { useState, ReactElement } from 'react';
import PushNotification from '@/components/pushNotification';
import CollectorLayoutPage from "@/components/collector-layout";

interface ChildProps {
  openRequestId: string;
  setOpenRequestId: React.Dispatch<React.SetStateAction<string>>;
}

export default function CollectorLayout({ children } : { children: React.ReactNode }) {
    const [openRequestId, setOpenRequestId] = useState('');

    const handleRequestOpen = (requestId: string) => {
        setOpenRequestId(requestId);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as ReactElement<ChildProps>, { 
                openRequestId, 
                setOpenRequestId 
            });
        }
        return child;
    });

    return (
        <CollectorLayoutPage>
            <PushNotification onRequestOpen={handleRequestOpen} />
            <main>{childrenWithProps}</main>
        </CollectorLayoutPage>
    );
}