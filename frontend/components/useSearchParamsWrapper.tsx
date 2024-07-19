"use client"
import { useSearchParams } from 'next/navigation';

export const UseSearchParamsWrapper = ({ children }: { children: (searchParams: URLSearchParams) => React.ReactNode }) => {
    const searchParams = useSearchParams();
    return <>{children(searchParams)}</>;
};