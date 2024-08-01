
import React from "react";
import { Requests } from "@/components/collector-requests";
import { useAuth } from "@/contexts/auth-context";

export default function Page() {

  return (
    <>
      <Requests />
    </>
  );
}