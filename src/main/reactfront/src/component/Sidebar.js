import { Link } from 'react-router-dom';
import '../styles/Style.css';
import { tokenInfoContext } from './TokenInfoProvider';
import React, { useContext } from 'react';

function Sidebar() {
  const { userRole, username, handleChange } = useContext(tokenInfoContext);
  if (window.location.pathname === '/') return null;

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {userRole == 'ROLE_USER' && (
          <li className="nav-item">
            <Link to="/user/userMain" className="nav-link">
              <i className="bi bi-grid"></i>
              <span>사원메인페이지</span>
            </Link>
          </li>
        )}
        {userRole == 'ROLE_ADMIN' && (
          <li className="nav-item">
            <Link to="/admin/adminMain" className="nav-link">
              <i className="bi bi-grid"></i>
              <span>관리자메인페이지</span>
            </Link>
          </li>
        )}
        {userRole == 'ROLE_HIGH_ADMIN' && (
          <li className="nav-item">
            <Link to="/highadmin/highAdminMain" className="nav-link">
              <i className="bi bi-grid"></i>
              <span>상위관리자메인페이지</span>
            </Link>
          </li>
        )}
        {userRole == 'ROLE_USER' && (
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>IT 자산 목록</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/itassets">
                  <span>전체 목록</span>
                </Link>
              </li>
              <li className="accordion-item" style={{ border: 'none' }}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <span className="nav-category-sidebar">카테고리별</span>
                </button>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <Link to="/itassets/pc">
                    <div
                      className="accordion-body nav-category-sidebar"
                      style={{ marginTop: '-15px' }}
                    >
                      PC/노트북
                    </div>
                  </Link>
                </div>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <Link to="/itassets/sw">
                    <div
                      className="accordion-body nav-category-sidebar"
                      style={{ marginTop: '-25px' }}
                    >
                      소프트웨어
                    </div>
                  </Link>
                </div>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <Link to="/itassets/sv">
                    <div
                      className="accordion-body nav-category-sidebar"
                      style={{ marginTop: '-25px' }}
                    >
                      서버
                    </div>
                  </Link>
                </div>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <Link to="/itassets/etc">
                    <div
                      className="accordion-body nav-category-sidebar"
                      style={{ marginTop: '-25px' }}
                    >
                      기타
                    </div>
                  </Link>
                </div>
              </li>
              <Link to="/itassets/use">
                <span>자산 사용 일괄 신청</span>
              </Link>
            </ul>
          </li>
        )}
        {/* <!-- End Components Nav --> */}

        <li className="nav-item">
          <Link
            to="####"
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-journal-text"></i>
            <span>IT 자산</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="forms-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/adminitassets">
                <i className="bi bi-circle"></i>
                <span>재고 관리</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Forms Nav --> */}

        <li className="nav-item">
          <Link
            to="####"
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>결제 신청</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="tables-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="####">
                <i className="bi bi-circle"></i>
                <span>General Tables</span>
              </Link>
            </li>
            <li>
              <Link to="####">
                <i className="bi bi-circle"></i>
                <span>Data Tables</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Tables Nav --> */}

        <li className="nav-item">
          <Link
            to="#"
            className="nav-link collapsed"
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-bar-chart"></i>
            <span>사용자 신청</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="charts-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/admin/approveList">
                <i className="bi bi-circle"></i>
                <span>사용 신청 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/approveHandle">
                <i className="bi bi-circle"></i>
                <span>사용 처리 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/approveBuyList">
                <i className="bi bi-circle"></i>
                <span>구매 신청 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/approveBuyHandle">
                <i className="bi bi-circle"></i>
                <span>구매 처리 목록</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            to="#"
            className="nav-link collapsed"
            data-bs-target="#high-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-bar-chart"></i>
            <span>관리자 신청</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="high-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/highAdmin/approveList">
                <i className="bi bi-circle"></i>
                <span>최종 사용 신청 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/highAdmin/approveBuyList">
                <i className="bi bi-circle"></i>
                <span> 최종 구매 신청 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/highAdmin/approveHandle">
                <i className="bi bi-circle"></i>
                <span>최종 사용 처리 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/highAdmin/approveBuyHandle">
                <i className="bi bi-circle"></i>
                <span>최종 구매 처리 목록</span>
              </Link>
            </li>
            <li>
              <Link to="/itassetsapproval">
                <i className="bi bi-circle"></i>
                <span>폐기/수리 처리 목록</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <!-- End Charts Nav --> */}

        <li className="nav-item">
          <Link
            to="####"
            className="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-gem"></i>
            <span>사용자 관리</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </Link>
          <ul
            id="icons-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="users/userReg">
                <i className="bi bi-circle"></i>
                <span>사용자 등록</span>
              </Link>
            </li>
            <li>
              <Link to="/users/userList">
                <i className="bi bi-circle"></i>
                <span>사용자 목록</span>
              </Link>
            </li>
            <li>
              <Link to="users/userLeave">
                <i className="bi bi-circle"></i>
                <span>퇴사 신청</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <!-- End Icons Nav --> */}
        <li className="nav-item">
          <Link to="admin/reports" className="nav-link collapsed">
            <i className="bi bi-graph-up"></i>
            <span>자산 리포트</span>
          </Link>
        </li>

        <li className="nav-heading">설정</li>

        <li className="nav-item">
          <Link to="/noticelist" className="nav-link collapsed">
            <i className="bi bi-person"></i>
            <span>공지사항</span>
          </Link>
        </li>
        {/* <!-- End Profile Page Nav --> */}

        <li className="nav-item">
          <Link to="####" className="nav-link collapsed">
            <i className="bi bi-question-circle"></i>
            <span>설정</span>
          </Link>
        </li>
        {/* <!-- End F.A.Q Page Nav --> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
