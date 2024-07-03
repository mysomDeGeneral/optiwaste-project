import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/lib/theme.util";


export const metadata = {
  title: "OptiWaste",
  description: "A smart waste collection App",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <h1>Home</h1>
      <p>Welcome to the home page</p>
      <Image
        src="/public/dashboard.png"
        alt="logo"
        width={200}
        height={200}
      />
      </div>
      {/* <ModeToggle /> */}
      
    </div>

    
  );
}
