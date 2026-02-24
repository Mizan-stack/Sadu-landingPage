import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <div
        dir="rtl"
        className="[font-family:Tajawal,sans-serif] bg-black text-white"
      >
        <MainLayout />
      </div>
    </BrowserRouter>
  );
}

export default App;
