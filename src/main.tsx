import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { UnitProvider } from './context/UnitContext.tsx'
import { LoaderProvider } from './context/LoaderProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <LoaderProvider>
        <AuthProvider>
            <UnitProvider>
                <App />
            </UnitProvider>
        </AuthProvider>
    </LoaderProvider>
)

