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
import AbhaVerificationPage from "../pages/Registration/AbhaVerificationPage"
import LinkAbhaPage from "../pages/Registration/LinkAbhaPage"

const AppRoutes = () => {

    return (
       <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginPage />} />

                <Route element={<MainLayout />}>

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

                    <Route path="/abhaverification" element={
                        <ProtectedRoutes>
                           <AbhaVerificationPage/>
                        </ProtectedRoutes>
                    } />

                    <Route path="/linkabhaverification" element={
                        <ProtectedRoutes>
                            <LinkAbhaPage />
                        </ProtectedRoutes>
                    }
                    />

                </Route>


                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;