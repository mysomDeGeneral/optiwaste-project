"use client"
import Link from "next/link";
import dynamic from "next/dynamic";
import DashboardPage from "@/components/dashboard";

export default function Dashboard(){
    return (
        <div>
            <DashboardPage />
        </div>
    );
}