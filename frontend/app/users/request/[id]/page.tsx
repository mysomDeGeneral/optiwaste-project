"use client";
import { useParams } from "next/navigation";
import { RequestStatus } from "@/components/request-status";

export default function RequestStatusPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <RequestStatus params={{ id }} />
  );
}