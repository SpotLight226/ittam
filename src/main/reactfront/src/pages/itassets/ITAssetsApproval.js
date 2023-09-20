import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagenation from '../../component/Pagenation';
import axios from 'axios';
import ApprovalComment from '../approve/ApprovalComment';
import { useContext } from 'react';
import { userInfoContext } from '../../App';

function ITAssetsApproval() {
  const contextValues = useContext(userInfoContext); // 항상 가장 위에서 선언해야 사용 가능
  let username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  const { userId, role } = contextValues || {}; // 들어온 값 없으면 공백으로

  /* 결제요청목록 데이터 */
  const [data, setData] = useState([]);
  const stockList = () => {
    axios
      .get('/stock/getStockApprovalList', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    stockList();
  }, []);

  /* 상세정보모달로 데이터보내기 */
  const [info, setInfo] = useState(null);
  const handleModal = (data) => {
    setInfo(data);
    console.log(data);
  };

  /* 페이지네이션 */
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const totalPages = Math.ceil(1 / itemsPerPage);
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹

  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /* 요청수락 */
  const handleSubmit = (item) => {
    axios
      .post(
        '/stock/updateITStatus',
        { item },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      .then((response) => {
        stockList();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* 요청 반려 */
  const handleNsubmit = (item) => {
    axios
      .post(
        '/stock/approvalN',
        { item },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      .then((response) => {
        stockList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function formatDate(dateString) {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return '';
    }

    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 `;
  }
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>구매/수리/폐기 결재요청</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">Tables</li>
            <li className="breadcrumb-item active">Data</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                  <div className="datatable-top"></div>
                </div>
                <h5 className="card-title">재고 관리</h5>

                {/* <!-- 데이터 테이블 --> */}
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          #
                        </Link>
                      </th>

                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          신청인
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          제목
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          신청종류
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          신청일
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          승인
                        </Link>
                      </th>
                      <th scope="col">
                        <Link to="#" className="datatable-sorter">
                          반려
                        </Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <th scope="row">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </th>
                          <td>{item.username}</td>
                          <td>
                            <Link
                              to="#"
                              style={{ color: 'black' }}
                              data-bs-toggle="modal"
                              data-bs-target="#modalDialogScrollable"
                              onClick={() => handleModal(item)}
                            >
                              {item.appro_title}
                            </Link>
                          </td>
                          <td>{item.appro_kind}</td>
                          <td>{formatDate(item.appro_date)}</td>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => handleSubmit(item)}
                            >
                              승인
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleNsubmit(item)}
                            >
                              반려
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* 신청내용모달 */}
                <div
                  className="modal fade"
                  id="modalDialogScrollable"
                  tabIndex="-1"
                >
                  <ApprovalComment info={info} />
                </div>
                {/* <!-- End Table with stripped rows --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 페이징네이션 */}
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        handleClick={handleClick}
      />
    </main>
  );
}

export default ITAssetsApproval;
