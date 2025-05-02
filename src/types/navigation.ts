"use client";
import { useRouter } from "@";

export const useNavigate = () => {
  const router = useRouter();

  return {
    goHome: () => router.push("/"),
    goBack: () => router.back(),
    goToPage: (path: string) => router.push(path),
  };
};
