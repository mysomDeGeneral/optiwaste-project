import { AdminLayout } from "@/components/admin-layout";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
                <AdminLayout>
                    <main>{children}</main>
                </AdminLayout>
            
    );
}