import Layout from "./pages/Layout";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import ApproveList from "./pages/approve/ApproveList";
import AdminApproveList from "./pages/adminapprove/AdminApproveList";
import AdminApproveBuyList from "./pages/adminapprove/AdminApproveBuyList";
import AdminApproveHandle from "./pages/adminapprove/AdminApproveHandleList";
import AdminApproveBuyHandle from "./pages/adminapprove/AdminApproveBuyHandleList";
import Logout from "./pages/login/Logout";
import Login from "./pages/login/LoginHome";

import ApproveBuyList from "./pages/approve/ApproveBuyList";
import UserList from "./pages/users/UserList";
import ApproveHandleList from "./pages/approve/ApproveHandleList";

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
import ITAssetsApproval from "./pages/itassets/ITAssetsApproval";
function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/admin/approveList" element={<ApproveList/>}/>
                <Route path="/admin/approveBuyList" element={<ApproveBuyList/>}/>
                <Route path="/admin/approveHandle" element={<ApproveHandleList/>}/>
                <Route path="/admin/approveBuyHandle" element={<AdminApproveHandle/>}/>
                <Route path="/highAdmin/approveList" element={<AdminApproveList/>}/>
                <Route path="/highAdmin/approveBuyList" element={<AdminApproveBuyList/>}/>
                <Route path="/highAdmin/approveHandle" element={<AdminApproveHandle/>}/>
                <Route path="/highAdmin/approveBuyHandle" element={<AdminApproveBuyHandle/>}/>
                <Route path="/logout" element={<Logout/>}/>


                <Route path="/users" element={<UserList/>}/>
                <Route path="/itassets" element={<AssetAllList/>} />
                <Route path="/itassets/use" element={<UseRequest/>} />
                <Route path="/itassets/purchase" element={<PurchaseRequest/>} />
                <Route path="/itassets/detail" element={<AssetDetail/>} />
                <Route path="/adminitassets" element={<ITAssets/>}/>
                <Route path="itassetsapproval" element={<ITAssetsApproval/>}/>
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
