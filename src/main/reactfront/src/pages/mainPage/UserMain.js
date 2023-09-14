
import { useEffect, useState } from "react";
import "../../styles/Style.css";
import "../../styles/MainPageStyle/UserStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import DounutChart_user from "../../component/Chart/DonutChart";

function UserMain() {


  const username = 'DE0003';
  const [userCnt, setUserCnt] = useState({});

  useEffect(() => {
    axios.get("/mainPage/getUserCnt", {
      params: {username: username}
    }).then(response => setUserCnt(response.data))
        .catch(error => console.log(error))
  },[])



  return (
    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Page Title</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Components</li>
            <li className="breadcrumb-item active">Breadcrumbs</li>
          </ol>
        </nav>
      </div>

      <section className="contact">
        <div className="row">
          <div className="col-lg-6">
            <Link to="/userMain_using">
              <div className="info-box card">
                <i className="bi bi-check2-square"></i>
                <h3>내가 사용 중인 자산</h3>
                <span style={{ fontSize: '14px', color: "#777" }}>사용중: {userCnt.using}건 | 반납신청: {userCnt.return}건 | 교환신청: {userCnt.exchange}건</span>
              </div>
            </Link>
          </div>
          
          <div className="col-lg-6">
            <Link to="/userMain_request">
              <div className="info-box card">
                <i className="bi bi-clipboard-check"></i>
                <h3>내 사용/구매신청 목록</h3>
                <span style={{ fontSize: '14px', color: "#777" }}>사용신청건: 2건 | 구매신청건: 3건</span>

              </div>
            </Link>
          </div>


        </div>



      </section>

      <section className="section">
        <div className="row">
          <div className="col-lg-3">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{fontWeight: "800"}}>나의 자산 현황</h5>
                <DounutChart_user />
              </div>
            </div>

          </div>
          <div className="col-lg-3">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{fontWeight: "800"}}>나의 자산 현황</h5>
                <DounutChart_user />
              </div>
            </div>

          </div>

          <div className="col-lg-6">

            <div className="card">
              <div className="card-body">
                <Link to="/####"><h5 className="card-title" style={{fontWeight: "800"}}>공지사항 <span>| 전체보기</span></h5></Link>
                <table className="table table-sm">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Age</th>
                    <th scope="col">Start Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Brandon Jacob</td>
                    <td>Designer</td>
                    <td>28</td>
                    <td>2016-05-25</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Bridie Kessler</td>
                    <td>Developer</td>
                    <td>35</td>
                    <td>2014-12-05</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Ashleigh Langosh</td>
                    <td>Finance</td>
                    <td>45</td>
                    <td>2011-08-12</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Angus Grady</td>
                    <td>HR</td>
                    <td>34</td>
                    <td>2012-06-11</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Raheem Lehner</td>
                    <td>Dynamic Division Officer</td>
                    <td>47</td>
                    <td>2011-04-19</td>
                  </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default UserMain;