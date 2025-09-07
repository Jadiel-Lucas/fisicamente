import dynamic from "next/dynamic";

import App from "./app";

//const App = dynamic(() => import("./app"), { ssr: false });
const AdminPage = () => {
    return (
        <App />
    );
};

export default AdminPage;
