import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/Style.css";
import axios from "axios";

function Header() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem('username');
  const [myInfo, setMyInfo] = useState({});
  const [myAlarmList, setMyAlarmList] = useState([]);
  const [myAlarmCnt, setMyAlarmCnt] = useState(0);
  const navigate = useNavigate(); // navigate 함수 생성
  const getMyInfo = (username) => {
    axios({
      url: "/mainPage/getMyInfo",
      method: "get",
      headers: {
        Authorization : token
      },
      params: {
        username: username
      }
    })
        .then(response => {setMyInfo(response.data); console.log(response.data);})
        .catch(error => console.log(error))
  }

  const getMyAlarmList =  (username) => {
     axios({
        url: "/mainPage/getMyAlarmList",
        method: "get",
        headers: {
          Authorization : token
        },
        params: {
          username: username
        }
      }).then(response => {setMyAlarmList(response.data); console.log("dd"+response.data);})
        .catch(error => console.log(error))

    };



  const getMyAlarmCnt = (username) => {
    axios({
      url: "/mainPage/getMyAlarmCnt",
      method: "get",
      headers: {
        Authorization : token
      },
      params: {
        username: username
      }
    }).then(response => {console.log(response.data); setMyAlarmCnt(response.data);})
        .catch(error => console.log(error))
  }




  const handleMyAlamConfirm = (e, alarm_num) => {
    e.stopPropagation();
    axios({
      url: "/mainPage/handleMyAlamConfirm",
      method: "put",
      headers: {
        Authorization : token
      },
      params: {
        alarm_num: alarm_num
      }
    }).then(response => {
      console.log(response.data);
      getMyAlarmList(username);
      getMyAlarmCnt(username);
      })
        .catch(error => console.log(error))

    navigate("/user/userMain_using");
  }



  useEffect(() => {
    getMyInfo(username);
    getMyAlarmList(username);
    getMyAlarmCnt(username);

  }, []);


  if(window.location.pathname === '/') return null

  const handleToggleClick = () => {
    // React에서는 body에 직접 접근하지 않고, 상태를 사용하여 UI를 변경합니다.
    // 여기에서는 상태를 토글하는 방식으로 body의 classList를 변경하는 효과를 달성합니다.
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="/assets/img/ittam2.png" alt=""></img>
            <span className="d-none d-lg-block">IT 자산 관리 시스템</span>
          </Link>
          <i
              className="bi bi-list toggle-sidebar-btn"
              onClick={handleToggleClick}
          ></i>
        </div>
        {/* <!-- End Logo --> */}

        <div className="search-bar">
          <form
              className="search-form d-flex align-items-center"
              method="POST"
              action="#"
          >
            <input
                type="text"
                name="query"
                placeholder="Search"
                title="Enter search keyword"
            ></input>
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        {/* <!-- End Search Bar --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link to="####" className="nav-link nav-icon search-bar-toggle ">
                <i className="bi bi-search"></i>
              </Link>
            </li>
            {/* <!-- End Search Icon--> */}

            <li className="nav-item dropdown">
              <Link to="####" className="nav-link nav-icon" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                {myAlarmCnt !== 0 && <span className="badge bg-primary badge-number">{myAlarmCnt}</span>}
              </Link>
              {/* <!-- End Notification Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" style={{overflow: 'scroll', maxHeight: '486px'}}>
                <li className="dropdown-header">
                  You have {myAlarmCnt} new notifications
                  <Link to="####">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                  </Link>
                </li>
                {
                  myAlarmList.map((a, i) => {
                    return <div onClick={(e) => handleMyAlamConfirm(e, a.alarm_num)} key={i} style={{cursor: 'pointer'}}>
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li className="notification-item">
                        <i className="bi bi-exclamation-circle text-warning"></i>
                        <div>
                          <h4>관리자 {a.alarm_status}처리 완료</h4>
                          <p>요청하신 {a.assets_name}({a.assets_detail_name})의 {a.alarm_type} {a.alarm_status}처리가 완료되었습니다.</p>
                          <p>{a.alarm_regdate}</p>
                        </div>
                      </li>

                    </div>
                  })
                }

                {/*<li>*/}
                {/*  <hr className="dropdown-divider"></hr>*/}
                {/*</li>*/}

                {/*<li className="notification-item">*/}
                {/*  <i className="bi bi-x-circle text-danger"></i>*/}
                {/*  <div>*/}
                {/*    <h4>Atque rerum nesciunt</h4>*/}
                {/*    <p>Quae dolorem earum veritatis oditseno</p>*/}
                {/*    <p>1 hr. ago</p>*/}
                {/*  </div>*/}
                {/*</li>*/}

                {/*<li>*/}
                {/*  <hr className="dropdown-divider"></hr>*/}
                {/*</li>*/}

                {/*<li className="notification-item">*/}
                {/*  <i className="bi bi-check-circle text-success"></i>*/}
                {/*  <div>*/}
                {/*    <h4>Sit rerum fuga</h4>*/}
                {/*    <p>Quae dolorem earum veritatis oditseno</p>*/}
                {/*    <p>2 hrs. ago</p>*/}
                {/*  </div>*/}
                {/*</li>*/}

                {/*<li>*/}
                {/*  <hr className="dropdown-divider"></hr>*/}
                {/*</li>*/}

                {/*<li className="notification-item">*/}
                {/*  <i className="bi bi-info-circle text-primary"></i>*/}
                {/*  <div>*/}
                {/*    <h4>Dicta reprehenderit</h4>*/}
                {/*    <p>Quae dolorem earum veritatis oditseno</p>*/}
                {/*    <p>4 hrs. ago</p>*/}
                {/*  </div>*/}
                {/*</li>*/}

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li className="dropdown-footer">
                  <Link to="####">Show all notifications</Link>
                </li>
              </ul>
              {/* <!-- End Notification Dropdown Items --> */}
            </li>
            {/* <!-- End Notification Nav --> */}

            <li className="nav-item dropdown">
              <Link to="####"
                    className="nav-link nav-icon"
                    data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </Link>
              {/* <!-- End Messages Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <Link to="####">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="message-item">
                  <Link to="####">
                    <img
                        src="/assets/img/messages-1.jpg"
                        alt=""
                        className="rounded-circle"
                    ></img>
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="message-item">
                  <Link to="####">
                    <img
                        src="/assets/img/messages-2.jpg"
                        alt=""
                        className="rounded-circle"
                    ></img>
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="message-item">
                  <Link to="####">
                    <img
                        src="/assets/img/messages-3.jpg"
                        alt=""
                        className="rounded-circle"
                    ></img>
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="dropdown-footer">
                  <Link to="####">Show all messages</Link>
                </li>
              </ul>
              {/* <!-- End Messages Dropdown Items --> */}
            </li>
            {/* <!-- End Messages Nav --> */}

            <li className="nav-item dropdown pe-3">
              <Link to="####"
                    className="nav-link nav-profile d-flex align-items-center pe-0"
                    data-bs-toggle="dropdown"
              >
                <img
                    src="/assets/img/profile-img.jpg"
                    alt="Profile"
                    className="rounded-circle"
                ></img>
                <span className="d-none d-md-block dropdown-toggle ps-2">
                {myInfo.user_name}
              </span>
              </Link>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{myInfo.user_name}</h6>
                  <span>{username}</span>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <Link
                      to="/mypage"
                      className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <Link to="####"
                        className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <Link to="####"
                        className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <Link to="/logout"
                        className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
  );
}

export default Header;