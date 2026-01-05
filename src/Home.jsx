import { useNavigate } from "react-router-dom";
import SurveyForm from "./SurveyForm";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <button className="admin" onClick={() => navigate("/login")}>
        Admin Login
      </button>

      <SurveyForm />
    </>
  );
}