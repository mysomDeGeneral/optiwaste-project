import Link from "next/link";

export default function Dashboard(){
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
            <p>Welcome to the dashboard page</p>
            </div>

            <div>
                <Link href="/dashboard/settings">Settings</Link>
            </div>
            
        </div>
    );
}