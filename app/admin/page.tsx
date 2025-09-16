//"use client" //estrnho, coloocar user client e tirar o comentario do const app o site volta a funcionar, se deixar apenas a importação e tirar o const aí dá errado

//import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { getIsAdmin } from "@/lib/admin";

import App from "./app";

//const App = dynamic(() => import("./app"), { ssr: true });

const AdminPage = async () => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        redirect("/");
    }

    return (
        <App />
    );
};

export default AdminPage;

