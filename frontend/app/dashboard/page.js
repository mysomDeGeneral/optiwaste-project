"use client"
import Link from "next/link";
import dynamic from "next/dynamic";
import DashboardPage from "@/components/dashboard";
import Layout from "@/components/Layout";

export default function Dashboard(){
    return (
        <Layout>
            <DashboardPage />
        </Layout>
    );
}