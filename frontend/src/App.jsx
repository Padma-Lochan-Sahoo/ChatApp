import { Navigate, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from 'lucide-react'
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore"
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {
  const {authUser,checkAuth,isCheckingAuth, onlineUsers} = useAuthStore();
  console.log(onlineUsers);
  
    const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser){
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
}
  
  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" /> }/>
        <Route path="/signup" element={!authUser ? < SignUpPage /> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? < LogInPage /> :<Navigate to="/" />}/>
        <Route path="/settings" element={ < SettingsPage /> }/>
        <Route path="/profile" element={authUser ? < ProfilePage /> : <Navigate to="/login" />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App