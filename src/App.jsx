// src/App.js
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/register/RegisterForm";
import Users from "./components/users/Users";
import Me from "./components/user-detail/Me";
import AllUser from "./components/user-detail/AllUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/me" element={<Me />} />
        <Route path="/users/all-users" element={<AllUser />} />
      </Routes>
    </div>
  );
}

export default App;
