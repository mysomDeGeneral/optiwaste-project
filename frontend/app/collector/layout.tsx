import CollectorLayoutPage from "@/components/collector-layout";

export default function CollectorLayout({ children } : { children: React.ReactNode }) {
    return (
        <CollectorLayoutPage>
            <main>{children}</main>
        </CollectorLayoutPage>
    );
}