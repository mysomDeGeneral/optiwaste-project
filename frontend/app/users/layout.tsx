import UserLayout from "@/components/user-layout";

export default function UserRequestHistory({children} : {children: React.ReactNode}) {
  return (
    <UserLayout>
        <main>
      {children}
        </main>
    </UserLayout>
  );
}