import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "./contexts/ContentContext";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <div dir="rtl" className="bg-black text-white">
          <MainLayout />
        </div>
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;
