import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Content from "./pages/Content";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
