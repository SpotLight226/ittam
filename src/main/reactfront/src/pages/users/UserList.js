import React, { useContext, useState } from "react";

import { UserStateContext } from "./Users";
import UserItem from "./UserItem";
import Pagenation from "../../component/Pagenation";
import ControlMenu from "../../component/ControlMenu";
import { UserOptionList } from "../../constants/OptionList"; // 옵션들을 정의해둔 list에서 객체로 사용할 옵션을 가져온다

// 비구조 할당으로 subPage 주소 받아옴
const UserList = () => {
  const userList = useContext(UserStateContext);

  const getProcessedOption = () => {
    const copyOptionList = JSON.parse(JSON.stringify(UserOptionList));

    return copyOptionList.filter(
      (it) =>
        it.value !== "leaveDate" &&
        it.value !== "detail" &&
        it.value !== "process"
    );
  };

  // 1. 정렬을 위한 state
  const [sortType, setSortType] = useState("number"); // 정렬 컬럼 state
  const [checkClass, setCheckClass] = useState(false); // 내림, 오름 차순 선택 state

  // 2. 각 정렬 선택에 따른 데이터 정렬 함수
  const getProcessedList = () => {
    // 기존 리스트는 수정하지 않기 위해서 깊은 복사
    const copyList = JSON.parse(JSON.stringify(userList));

    // 각 선택된 링크에 대한 비교함수
    const compare = (a, b) => {
      // 선택된 컬럼에 대해서 case 별로 분류
      switch (sortType) {
        case "number": {
          // 번호 : 숫자 비교 => 문자열 일 수도 있으니 parseInt 로 감싼다
          if (checkClass) {
            return parseInt(b.id) - parseInt(a.id); // 오름차순
          } else {
            return parseInt(a.id) - parseInt(b.id); // 내림차순
          }
        }
        case "name": {
          // 이름 : 문자열을 사전 순으로 비교한다
          if (checkClass) {
            return b.user_name.localeCompare(a.user_name);
          } else {
            return a.user_name.localeCompare(b.user_name);
          }
        }
        case "id": {
          // 사원번호 : 부서 빼고 번호만 비교
          const a_id = parseInt(a.username.slice(3, a.username.length));
          const b_id = parseInt(b.username.slice(3, b.username.length));

          if (checkClass) {
            return b_id - a_id;
          } else {
            return a_id - b_id;
          }
        }
        case "depart": {
          // 부서
          if (checkClass) {
            return b.user_depart.localeCompare(a.user_depart);
          } else {
            return a.user_depart.localeCompare(b.user_depart);
          }
        }
        case "auth": {
          // 권한
          if (checkClass) {
            return b.role.localeCompare(a.role);
          } else {
            return a.role.localeCompare(b.role);
          }
        }
        case "email": {
          // 이메일
          if (checkClass) {
            return b.user_email.localeCompare(a.user_email);
          } else {
            return a.user_email.localeCompare(b.user_email);
          }
        }
        case "date": {
          // 입사일 : Date 를 비교해야 하므로 state의 날짜 문자열을 가지고 와서 새로운 Date 객체에 넣고 getTime()을 사용해 ms로 변환 후 비교
          const a_date = new Date(a.user_joindate).getTime();
          const b_date = new Date(b.user_joindate).getTime();

          if (checkClass) {
            return b_date - a_date;
          } else {
            return a_date - b_date;
          }
        }
        default: {
          return null;
        }
      }
    };

    // 비교함수에따라 정렬
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  const handleSelectorChange = (event) => {
    setItemPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(userList.length / itemsPerPage);
  /* 페이지네이션 */
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  /* const totalPages = Math.ceil(data.length / itemsPerPage); */
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹

  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages); // 끝 페이지

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="UserList">
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">사용자 목록</h5>
                <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                  <div className="datatable-top">
                    <div className="datatable-dropdown">
                      <label htmlFor="">
                        <select
                          className="datatable-selector"
                          value={itemsPerPage}
                          onChange={handleSelectorChange}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </select>
                      </label>
                    </div>
                    <div className="datatable-search">
                      <input
                        className="datatable-input"
                        placeholder="검색"
                        type="search"
                        title="Search within table"
                      />
                    </div>
                  </div>
                </div>
                <table className="table datatable">
                  {/* 리스트 정렬 기준 */}
                  <thead>
                    <tr>
                      {/* 리스트 헤드, 각 state와 변환함수를 넘긴다 */}
                      {getProcessedOption().map((it, idx) => (
                        <ControlMenu
                          key={idx}
                          {...it}
                          checkClass={checkClass}
                          sortType={sortType}
                          setSortType={setSortType}
                          setCheckClass={setCheckClass}
                        />
                      ))}
                    </tr>
                  </thead>

                  {/* 리스트 */}
                  <tbody>
                    {getProcessedList()
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((it) => (
                        <UserItem key={it.id} isUser={true} {...it} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Pagenation
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        handleClick={handleClick}
      />
    </div>
  );
};

export default UserList;
