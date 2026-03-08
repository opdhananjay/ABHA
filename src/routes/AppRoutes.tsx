import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Login/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import MainLayout from "../layouts/MainLayout"
import ModulePage from "../pages/Module/ModulePage"
import RegistrationPage from "../pages/Registration/RegistrationPage"
import ProtectedRoutes from "./ProtectedRoute"
import NotFound from "../pages/NotFound/NotFound"

const AppRoutes = () => {

    return (
       <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginPage />} />

                <Route path="/module" element={
                    <ProtectedRoutes>
                        <ModulePage/>
                    </ProtectedRoutes>
                } />

                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={
                        <ProtectedRoutes>
                            <DashboardPage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/registration/:action" element={
                        <ProtectedRoutes>
                            <RegistrationPage/>
                        </ProtectedRoutes>
                    } />

                </Route>


                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;