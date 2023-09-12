import "../../styles/Style.css";

import {useState} from "react";
import {Link} from "react-router-dom";
function UserMain_request() {

  const [cancel, setCancel] = useState("");

  const cancelBtn = (e) => {
    if(window.confirm("취소하시겠습니까?")) {
      e.target.style.backgroundColor = "gray";
      e.target.innerHTML = '취소완료';
      e.target.disabled=true;
      e.target.parentNode.previousSibling.innerHTML="취소";
      setCancel("취소");
    }

  }


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

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">사용 및 구매신청 목록</h5>

                  {/* <!-- Default Table --> */}
                  <table className="table table-borderless">
                        <thead>
                          <tr className="table-info">
                            <th scope="col">#</th>
                            <th scope="col">신청종류</th>
                            <th scope="col">신청자</th>
                            <th scope="col">신청제목</th>
                            <th scope="col">신청날짜</th>
                            <th scope="col">처리상태</th>
                            <th scope="col">처리상태</th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Brandon Jacob</td>
                            <td>Brandon Jacob</td>
                            <td><Link to="####">Designer</Link></td>
                            <td>2016-05-25</td>
                            <td>요청처리중</td>
                            <td>{cancel!=='취소' ?
                                    <button type="button" className="userMain-ask userMain-modalBtn" onClick={cancelBtn}>신청취소</button> :
                                    <button className="userMain-ask userMain-modalBtn" disabled style={{backgroundColor: "gray"}}>취소완료</button>}
                              </td>
                             
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Bridie Kessler</td>
                            <td>Developer</td>
                            <td>2014-12-05</td>
                            <td>35</td>

                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Ashleigh Langosh</td>
                            <td>Finance</td>
                            <td>2011-08-12</td>
                            <td>45</td>

                          </tr>
                          <tr>
                            <th scope="row">4</th>
                            <td>Angus Grady</td>
                            <td>HR</td>
                            <td>2012-06-11</td>
                            <td>34</td>

                          </tr>
                          <tr>
                            <th scope="row">5</th>
                            <td>Raheem Lehner</td>
                            <td>Dynamic Division Officer</td>
                            <td>2011-04-19</td>
                            <td>47</td>

                          </tr>
                        </tbody>
                      </table>
                      {/*  <!-- End Default Table Example --> */}
                </div>
            </div>


        </main>


    );
}

export default UserMain_request;