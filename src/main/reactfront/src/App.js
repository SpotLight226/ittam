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

            </Routes>
        </BrowserRouter>
    );
}

export default App;
