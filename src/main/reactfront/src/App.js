import Layout from "./pages/Layout";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import ApproveList from "./pages/ApproveList"
import UserList from "./pages/users/UserList";
function App() {

  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/approve" element={<ApproveList/>} />
        <Route path="/users" element={<UserList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
