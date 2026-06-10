import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

import WelcomePage from "./pages/intro";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import PageLoader from "./components/PageLoader";

export default function App() {
  const { authUser, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <PageLoader />;

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/home" />} />
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
      </Routes>
    </>
  );
}