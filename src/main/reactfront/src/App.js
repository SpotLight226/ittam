import Layout from "./pages/Layout";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import ApproveList from "./pages/approve/ApproveList"
import UserList from "./pages/users/UserList";
import ApproveHandleList from "./pages/approve/ApproveHandleList"
import ITAssets from "./pages/itassets/ITAssets"



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
                <Route path="/itassets" element={<ITAssets/>}/>
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
