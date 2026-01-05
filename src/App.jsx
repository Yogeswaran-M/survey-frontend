import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import SurveyForm from "./SurveyForm";

function App() {
  return (
    <SurveyForm/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<AdminLogin />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;