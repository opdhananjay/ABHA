import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Login/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import MainLayout from "../layouts/MainLayout"
import ModulePage from "../pages/Module/ModulePage"
import RegistrationPage from "../pages/Registration/RegistrationPage"
import ProtectedRoutes from "./ProtectedRoute"
import NotFound from "../pages/NotFound/NotFound"
import GetDetailsPage from "../pages/Registration/GetDetailsPage"
import UnitSubscriptionPage from "../pages/Module/UnitSubscriptionPage"

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

                <Route path="/unitsubscription" element={
                    <ProtectedRoutes>
                        <UnitSubscriptionPage/>
                    </ProtectedRoutes>
                }
                />

                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={
                        <ProtectedRoutes>
                            <DashboardPage />
                        </ProtectedRoutes>
                    } />

                    <Route path="/registration" element={
                        <ProtectedRoutes>
                            <RegistrationPage/>
                        </ProtectedRoutes>
                    } />

                    <Route path="/getdetails" element={
                        <ProtectedRoutes>
                           <GetDetailsPage/>
                        </ProtectedRoutes>
                    } />

                </Route>


                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;