import {useContext, useEffect, useState} from 'react';

import Pagenation from '../../component/Pagenation';
import axios from 'axios';
import ApprovalComment from '../approve/ApprovalComment';

import base64 from 'base-64';
import { ITAssetsApprovalOptionList } from '../../constants/OptionList';
import ControlMenu from '../../component/ControlMenu';
import ITAssetsApprovalItem from './ITAssetsApprovalItem';

function ITAssetsApproval() {
  const contextValues = useContext(userInfoContext); // 항상 가장 위에서 선언해야 사용 가능
  let username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  // const { userId, role } = contextValues || {}; // 들어온 값 없으면 공백으로

  useEffect(() => {
    const token = localStorage.getItem('token');
    let payload = token.substring(
      token.indexOf('.') + 1,
      token.lastIndexOf('.')
    );
    let dec = JSON.parse(base64.decode(payload));
    let role = dec.role;
    if (role !== 'ROLE_HIGH_ADMIN') {
      alert('접근 권한이 없습니다.');
      window.history.back();
    }
  }, []);

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

  const getProcessedOption = () => {
    const copyOptionList = JSON.parse(
      JSON.stringify(ITAssetsApprovalOptionList)
    );

    return copyOptionList.filter(
      (it) =>
        it.value !== 'leaveDate' &&
        it.value !== 'detail' &&
        it.value !== 'process'
    );
  };

  // 1. 정렬을 위한 state
  const [sortType, setSortType] = useState('number'); // 정렬 컬럼 state
  const [checkClass, setCheckClass] = useState(false); // 내림, 오름 차순 선택 state

  const getProcessedList = () => {
    const copyList = JSON.parse(JSON.stringify(data));

    const compare = (a, b) => {
      switch (sortType) {
        case 'appro_num': {
          if (checkClass) {
            return parseInt(b.appro_num) - parseInt(a.appro_num); // 오름차순
          } else {
            return parseInt(a.appro_num) - parseInt(b.appro_num); // 내림차순
          }
        }
        case 'username': {
          const aExists = a.username !== null && a.username !== undefined;
          const bExists = b.username !== null && b.username !== undefined;

          if (aExists && !bExists) return -1;
          if (!aExists && bExists) return 1;

          if (!aExists && !bExists) return 0;

          if (checkClass) {
            return b.username.localeCompare(a.username);
          } else {
            return a.username.localeCompare(b.username);
          }
        }
        case 'appro_title': {
          if (checkClass) {
            return b.appro_title.localeCompare(a.appro_title);
          } else {
            return a.appro_title.localeCompare(b.appro_title);
          }
        }
        case 'appro_kind': {
          if (checkClass) {
            return b.appro_kind.localeCompare(a.appro_kind);
          } else {
            return a.appro_kind.localeCompare(b.appro_kind);
          }
        }
        case 'appro_date': {
          const a_appro_date = new Date(a.appro_date).getTime();
          const b_appro_date = new Date(b.appro_date).getTime();

          if (checkClass) {
            return b_appro_date - a_appro_date;
          } else {
            return a_appro_date - b_appro_date;
          }
        }
      }
    };

    // 비교함수에따라 정렬
    const sortedList = copyList.sort(compare);
    return sortedList;
  };
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
                <h5 className="card-title">결제 요청</h5>

                {/* <!-- 데이터 테이블 --> */}
                <table className="table datatable">
                  <thead>
                    <tr>
                      {/* <th scope="col">
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
                      </th> */}
                      {getProcessedOption().map((it, idx) => (
                        <ControlMenu
                          {...it}
                          checkClass={checkClass}
                          sortType={sortType}
                          setSortType={setSortType}
                          setCheckClass={setCheckClass}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getProcessedList()
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((item, index) => (
                        /* <tr key={index}>
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
                        </tr> */
                        <ITAssetsApprovalItem
                          key={index}
                          isUser={true}
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                          index={index}
                          handleModal={() => handleModal(item)}
                          appro_title={item.appro_title}
                          username={item.username}
                          appro_kind={item.appro_kind}
                          formatDate={formatDate}
                          appro_date={item.appro_date}
                          handleSubmit={() => handleSubmit(item)}
                          handleNsubmit={() => handleNsubmit(item)}
                        />
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
