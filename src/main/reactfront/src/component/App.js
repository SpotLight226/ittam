import Layout from "./pages/Layout";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import ApproveList from "./pages/approve/ApproveList"
import UserList from "./pages/users/UserList";
import ApproveHandleList from "./pages/approve/ApproveHandleList"
import ITAssets from "./pages/itassets/ITAssets"
import LoginHome from "./pages/login/LoginHome";
import AssetDetail from "./pages/itassets/AssetDetail";
import PurchaseRequest from "./pages/itassets/PurchaseRequest";
import UseRequest from "./pages/itassets/UseRequest";
import AssetAllList from "./pages/itassets/AssetAllList";
import AdminMain from "./pages/mainPage/AdminMain";
import Mypage from "./pages/mainPage/Mypage";
import Reports from "./pages/mainPage/Reports";
import UserMain from "./pages/mainPage/UserMain";
import ReturnExchange from "./pages/mainPage/ReturnExchange";
import UserMain_using from "./pages/mainPage/UserMain_using";
import UserMain_request from "./pages/mainPage/UserMain_request";
import Users from "./pages/users/Users";
function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Layout/>}/>
                <Route path="/approve" element={<ApproveList/>}/>
                <Route path="/approveHandle" element={<ApproveHandleList/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/itassets" element={<AssetAllList/>} />
                <Route path="/itassets/use" element={<UseRequest/>} />
                <Route path="/itassets/purchase" element={<PurchaseRequest/>} />
                <Route path="/itassets/detail" element={<AssetDetail/>} />
                <Route path="/adminitassets" element={<ITAssets/>}/>
                <Route path="/login" element={<LoginHome/>}/>
                <Route path="/adminMain" element={<AdminMain />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/userMain" element={<UserMain />} />
                <Route path="/returnExchange" element={<ReturnExchange />} />
                <Route path="/userMain_using" element={<UserMain_using />} />
                <Route path="/userMain_request" element={<UserMain_request />} />
                <Route path="/:page/:subPage/*" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
