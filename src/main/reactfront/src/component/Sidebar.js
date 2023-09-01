import { Link } from "react-router-dom";
import "../styles/Style.css";

function Sidebar() {
  return (
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="bi bi-grid"></i>
              <span>메인페이지</span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-item">
            <Link to="/"
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
                <Link to="####">
                  <i className="bi bi-circle"></i>
                  <span>Alerts</span>
                </Link>
              </li>
              <li>
                <Link to="####">
                  <i className="bi bi-circle"></i>
                  <span>Accordion</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <!-- End Components Nav --> */}

          <li className="nav-item">
            <Link to="####"
                  className="nav-link collapsed"
                  data-bs-target="#forms-nav"
                  data-bs-toggle="collapse"
            >
              <i className="bi bi-journal-text"></i>
              <span>나의 신청목록</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
                id="forms-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="####">
                  <i className="bi bi-circle"></i>
                  <span>Form Elements</span>
                </Link>
              </li>
              <li>
                <Link to="####">
                  <i className="bi bi-circle"></i>
                  <span>Form Layouts</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <!-- End Forms Nav --> */}

          <li className="nav-item">
            <Link to="####"
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
            <Link to="#"
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
                <Link to="/approve">
                  <i className="bi bi-circle"></i>
                  <span>신청 목록</span>
                </Link>
              </li>
              <li>
                <Link to="####">
                  <i className="bi bi-circle"></i>
                  <span>ApexCharts</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <!-- End Charts Nav --> */}

          <li className="nav-item">
            <Link to="####"
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
                <Link to="/users">
                  <i className="bi bi-circle"></i>
                  <span>사용자 목록</span>
                </Link>
              </li>
              <li>
                <Link to="####">
                  <i className="bi bi-circle"></i>
                  <span>Remix Icons</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <!-- End Icons Nav --> */}

          <li className="nav-heading">설정</li>

          <li className="nav-item">
            <Link to="####" className="nav-link collapsed">
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