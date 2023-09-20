
import Layout from "./pages/Layout";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import base64 from "base-64";
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

import ITAssets from "./pages/itassets/ITAssets";
import LoginHome from "./pages/login/LoginHome";
import AssetDetail from "./pages/itassets/AssetDetail";
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
import AssetRequestListPC from "./pages/itassets/AssetRequestListPC";
import AssetRequestListSW from "./pages/itassets/AssetRequestListSW";
import AssetRequestListSV from "./pages/itassets/AssetRequestListSV";
import AssetRequestListETC from "./pages/itassets/AssetRequestListETC";

export const userInfoContext = React.createContext({
  // 기본 값 설정
  role: "default",
  userId: "default",
});

function App() {
  // 초기 상태 role, userId
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token"); // 토큰 가져옴

    if (token !== undefined && token !== null) {
      let payload = token.substring(
        token.indexOf(".") + 1,
        token.lastIndexOf(".")
      );
      let roleDec = JSON.parse(base64.decode(payload));
      let idDec = JSON.parse(base64.decode(payload));
      setRole(roleDec.role);
      setUserId(idDec.sub);
    }
  }, []);

  return (
    <userInfoContext.Provider value={{ role, userId }}>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/approveList" element={<ApproveList />} />
          <Route path="/admin/approveBuyList" element={<ApproveBuyList />} />
          <Route path="/admin/approveHandle" element={<ApproveHandleList />} />
          <Route
            path="/admin/approveBuyHandle"
            element={<AdminApproveHandle />}
          />
          <Route path="/highAdmin/approveList" element={<AdminApproveList />} />
          <Route
            path="/highAdmin/approveBuyList"
            element={<AdminApproveBuyList />}
          />
          <Route
            path="/highAdmin/approveHandle"
            element={<AdminApproveHandle />}
          />
          <Route
            path="/highAdmin/approveBuyHandle"
            element={<AdminApproveBuyHandle />}
          />
          <Route path="/logout" element={<Logout />} />

          <Route path="/users" element={<UserList />} />

          <Route path="/itassets" element={<AssetAllList/>} />
          <Route path="/itassets/pc" element={<AssetRequestListPC/>} />
          <Route path="/itassets/sw" element={<AssetRequestListSW/>} />
          <Route path="/itassets/sv" element={<AssetRequestListSV/>} />
          <Route path="/itassets/etc" element={<AssetRequestListETC/>} />

          <Route path="/itassets/detail" element={<AssetDetail />} />
          <Route path="/adminitassets" element={<ITAssets />} />
          <Route path="itassetsapproval" element={<ITAssetsApproval />} />

            <Route path="/admin/adminMain" element={<AdminMain />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/user/userMain" element={<UserMain />} />
            <Route path="/admin/returnExchange" element={<ReturnExchange />} />
            <Route path="/user/userMain_using" element={<UserMain_using />} />
            <Route path="/user/userMain_request" element={<UserMain_request />} />

          <Route path="/:page/:subPage/*" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </userInfoContext.Provider>
  );

}

export default App;
