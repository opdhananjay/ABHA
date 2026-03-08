import { Outlet } from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <div className="layout">
            <Header/>
            <div className="main-layout">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout;