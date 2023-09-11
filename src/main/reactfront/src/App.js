import Layout from "../../../../../ittam/src/main/reactfront/src/pages/Layout";
import Header from "../../../../../ittam/src/main/reactfront/src/component/Header";
import Sidebar from "../../../../../ittam/src/main/reactfront/src/component/Sidebar";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "../../../../../ittam/src/main/reactfront/src/App.css";
import ApproveList from "../../../../../ittam/src/main/reactfront/src/pages/approve/ApproveList"
import UserList from "../../../../../ittam/src/main/reactfront/src/pages/users/UserList";
import ApproveHandleList from "../../../../../ittam/src/main/reactfront/src/pages/approve/ApproveHandleList"
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
