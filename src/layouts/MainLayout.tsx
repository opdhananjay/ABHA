import { Outlet } from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div className="layout">
            <Header/>
            <div className="main-layout">
                <Outlet/>
                <Toaster/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout;