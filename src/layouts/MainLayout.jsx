import ContactPage from "../pages/ContactPage";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/shared/NavBar";

export default function MainLayout() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  );
}
