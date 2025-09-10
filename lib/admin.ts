import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_31WIhnPfS3XArZESzsSqJSuwyqC",
];

export const getIsAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}

/*
import { redirect } from "next/navigation";
import  isAdmin  from "@/lib/admin";
import App from "./app";

export default async function AdminPage() {
  const admin = await isAdmin(); // ✅ agora espera o resultado real

  if (!admin) {
    redirect("/");
  }

  return <App />;
}
*/