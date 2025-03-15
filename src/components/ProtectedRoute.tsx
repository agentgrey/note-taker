"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // Ensure AuthContext provides a loading state
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
      if (!user) {
        router.push("/signIn");
      }
    }
  }, [user, loading, router]);

  if (!isAuthChecked) return <div>Loading...</div>; // Prevents redirecting before auth check is complete

  return <>{children}</>;
}