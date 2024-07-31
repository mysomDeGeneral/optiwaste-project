
import React from "react";
import { Requests } from "@/components/collector-requests";
import { useAuth } from "@/contexts/auth-context";
// import FirebaseInit from "@/components/FirebaseInit";

export default function Page() {

  return (
    <>
            {/* <FirebaseInit /> */}
      <Requests />
    </>
  );
}