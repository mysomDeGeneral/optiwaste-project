import CollectorLayoutPage from "@/components/collector-layout";
import FirebaseInit from "@/components/FirebaseInit";

export default function CollectorLayout({ children } : { children: React.ReactNode }) {
    
    return ( 
        <CollectorLayoutPage>
        <FirebaseInit />
            <main>{children}</main>
        </CollectorLayoutPage>
    );
}