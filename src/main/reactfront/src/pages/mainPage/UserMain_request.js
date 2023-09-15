import "../../styles/Style.css";

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ReqDetailModal from "../../component/Modal/ReqDetailModal";
function UserMain_request() {

  const [cancel, setCancel] = useState("");
  const [username, setUsername] = useState('');
  const [myRequestList, setMyRequestList] = useState([]);
  const [openReqDetailModal, setOpenReqDetailModal] = useState(false);
  const [userq_num, setUserq_num] = useState(0);



  const getMyRequestList = (username) => {
    axios.get("/mainPage/getMyRequestList", {params: {username: username}})
        .then(response => {setMyRequestList(response.data); console.log(response.data);})
        .catch(error => console.log(error))
  }


  useEffect(() => {
    const username = localStorage.getItem('username');
    if(username) {
      setUsername(username);
    }
    getMyRequestList(username);

  }, []);



    return (
        <main id="main" className="main">
            {openReqDetailModal && <ReqDetailModal setOpenReqDetailModal={setOpenReqDetailModal} username={username} myRequestList={myRequestList} userq_num={userq_num} getMyRequestList={getMyRequestList}/>}

          <div className="pagetitle">
            <h1>Page Title</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/userMain">Home</Link></li>
                <li className="breadcrumb-item">Components</li>
                <li className="breadcrumb-item active">Breadcrumbs</li>
              </ol>
            </nav>
          </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">사용 및 구매신청 목록</h5>

                  {/* <!-- Default Table --> */}
                  <table className="table table-borderless" style={{textAlign: 'center'}}>
                        <thead>
                          <tr className="table-info">
                            <th scope="col">#</th>
                            <th scope="col">신청종류</th>
                            <th scope="col">신청자산</th>
                            <th scope="col">신청제목</th>
                            <th scope="col">신청개수</th>
                            <th scope="col">신청날짜</th>
                            <th scope="col">처리상태</th>

                          </tr>
                        </thead>
                        <tbody>
                        {
                          myRequestList.filter(a => a.userq_yn.includes('사원사용') || a.userq_yn.includes('관리자구매승인')).map((a, i) => {
                            return <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{a.userq_yn.includes("사용") ? "사용신청" : "구매신청"}</td>
                            <td>{a.userq_kind}</td>
                            <td><Link to="#" onClick={() => {setOpenReqDetailModal(true); setUserq_num(a.userq_num)}}>{a.userq_title}</Link></td>
                            <td>{a.userq_count}</td>
                            <td>{a.userq_regdate}</td>
                                <td>{a.userq_yn.includes('사용승인') ? "승인" : (a.userq_yn.includes('사원사용') ? "승인대기" : (a.userq_yn.includes('반려') ? '반려' : '승인대기'))}</td>

                          </tr>
                          })
                        }



                        {
                            myRequestList.filter(a => a.userq_yn.includes('사용승인') || a.userq_yn.includes('반려')).map((a, i) => {
                                return <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{a.userq_yn.includes("사용") ? "사용신청" : "구매신청"}</td>
                                    <td>{a.userq_kind}</td>
                                    <td><Link to="#" onClick={() => {setOpenReqDetailModal(true); setUserq_num(a.userq_num)}}>{a.userq_title}</Link></td>
                                    <td>{a.userq_count}</td>
                                    <td>{a.userq_regdate}</td>
                                    <td>{a.userq_yn.includes('사용승인') ? "승인" : (a.userq_yn.includes('사원사용') ? "승인대기" : (a.userq_yn.includes('반려') ? '반려' : '승인대기'))}</td>

                                </tr>
                            })


                        }

                        </tbody>
                      </table>
                      {/*  <!-- End Default Table Example --> */}
                </div>
            </div>


        </main>


    );
}

export default UserMain_request;