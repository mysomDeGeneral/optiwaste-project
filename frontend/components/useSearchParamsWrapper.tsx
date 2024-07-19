"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';

interface UseSearchParamsWrapperProps {
  children: (searchParams: URLSearchParams) => React.ReactNode;
}

export function UseSearchParamsWrapper({ children }: UseSearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}