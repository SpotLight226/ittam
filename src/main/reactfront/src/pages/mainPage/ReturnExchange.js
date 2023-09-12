import "../../styles/Style.css";

import { useEffect, useState } from "react";
import axios from "axios";
import ReturnDetailModal_return from '../../component/Modal/ReturnDetailModal_return';
import ReturnDetailModal_exchange from "../../component/Modal/ReturnDetailModal_exchange";




function ReturnExchange() {

  const [returnList, setReturnList] = useState([]);
  const [openModal_return, setOpenModal_return] = useState(false);
  const [openModal_exchange, setOpenModal_exchange] = useState(false);
  const [num, setNum] = useState(null);

  const getreturnList = () => {
    axios.get('/mainPage/returnList').then(response => { setReturnList(response.data); console.log(response.data); })
        .catch(error => console.log(error))
  }

  useEffect(() => {
    getreturnList();

  }, []);

  const count = returnList.filter(a => a.RETURN_STATUS === '승인대기').length;

  function yyyymmdd(timestamp) {
    let d = new Date(timestamp); // Convert the passed timestamp to milliseconds
    let yyyy = d.getFullYear();
    let mm = ('0' + (d.getMonth() + 1)).slice(-2);  // Months are zero based. Add leading 0.
    let dd = ('0' + d.getDate()).slice(-2);         // Add leading 0.
    let hh = ('0' + d.getHours()).slice(-2);
    let min = ('0' + d.getMinutes()).slice(-2);     // Add leading 0.



    let time = yyyy + '.' + mm + '.' + dd + ' ' + hh + ':' + min

    return time;
  }

  return (
    <>
    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Page Title</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">메인페이지</a></li>
            <li className="breadcrumb-item">교환 및 반납 요청</li>
            {/*<li className="breadcrumb-item active">Breadcrumbs</li>*/}
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">교환 및 반납 요청건</h5>

          {/* <!-- Default Table --> */}
          <table className="table table-bordered" style={{ textAlign: 'center' }}>
            <thead>
              <tr className="table-success">
                <th scope="col">#</th>
                <th scope="col">신청종류</th>
                <th scope="col">사원명</th>
                <th scope="col">자산명</th>
                <th scope="col">신청제목</th>
                <th scope="col">신청날짜</th>
                <th scope="col">승인처리</th>
                <th scope="col">처리상태</th>

              </tr>
            </thead>
            <tbody>
              {
                
                returnList.filter(a => a.RETURN_STATUS === '승인대기').map((a, i) => {

                  return <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{a.RETURN_KIND}</td>
                    <td>{a.USER_NAME}</td>
                    <td>{a.ASSETS_NAME}</td>
                    <td>{a.RETURN_TITLE}</td>
                    <td>{yyyymmdd(a.RETURN_DATE)}</td>
                    <td><button type="button" className="userMain-ask userMain-modalBtn" onClick={() => {a.RETURN_KIND==='반납' ? setOpenModal_return(true) : setOpenModal_exchange(true); setNum(a.RETURN_NUM); console.log(a.RETURN_NUM)}} >상세보기</button></td>
                    <td>{a.RETURN_STATUS}</td>
                  </tr>
                }

                )

              }

              {
                returnList.filter(a => a.RETURN_STATUS !== '승인대기').map((a, i) => {
                  return <tr key={i}>
                  <th scope="row">{count + i + 1}</th>
                  <td>{a.RETURN_KIND}</td>
                  <td>{a.USER_NAME}</td>
                  <td>{a.ASSETS_NAME}</td>
                  <td>{a.RETURN_TITLE}</td>
                  <td>{yyyymmdd(a.RETURN_DATE)}</td>
                  <td><button type="button" className="userMain-ask userMain-modalBtn" onClick={() => {  setNum(a.RETURN_NUM); a.RETURN_KIND==='반납' ? setOpenModal_return(true) : setOpenModal_exchange(true);} } >상세보기</button></td>
                  <td>{a.RETURN_STATUS}</td>
                </tr>

                })
              }


            </tbody>
          </table>
          {/*  <!-- End Default Table Example --> */}

        </div>
      </div>



    </main>
    {openModal_return && <ReturnDetailModal_return setOpenModal_return={setOpenModal_return} num={num} returnList={returnList} getreturnList={getreturnList}/>}
      {openModal_exchange && <ReturnDetailModal_exchange setOpenModal_exchange={setOpenModal_exchange} num={num} returnList={returnList} getreturnList={{getreturnList}}/>}
    </>
  );
}

export default ReturnExchange;