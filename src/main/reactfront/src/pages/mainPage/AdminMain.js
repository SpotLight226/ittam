import AreaChart from "../../component/Chart/AdminMainChart";
import { Link } from "react-router-dom";
import "../../styles/Style.css";
import "../../styles/MainPageStyle/AdminStyle.css";
import {useEffect, useState} from "react";
import axios from "axios";


function AdminMain() {
  const [dataa, setDataa] = useState({});

  useEffect(() => {
    axios.get('/mainPage/adminMain').then(response => {setDataa(response.data);});
  }, [setDataa]);

  //////////차~~~트///////////
  const [all, setAll] = useState();
  //const [today_all, setToday_all] = useState();
  const [using, setUsing] = useState();
  //const [today_using, setToday_using]  = useState();
  const [dispose, setDispose] = useState();
  //const [today_dispose, setToday_dispose] = useState();


  const getAssetChartAllNum = () => {
     axios.get("/mainPage/getAssetChartAllNum")
        .then(response => {
          setAll(response.data);
          //setToday_all(response.data.today);
          console.log(response.data);})
        .catch(error => console.log(error))

  }
  const getAssetChartUsingNum = () => {
    axios.get("/mainPage/getAssetChartUsingNum")
        .then(response => {
          setUsing(response.data);
          //setToday_using(response.data.today)
        })
        .catch(error => console.log(error))
  }
  const getAssetChartDisposeNum = () => {
    axios.get("/mainPage/getAssetChartDisposeNum")
        .then(response => {
          setDispose(response.data);
          //setToday_dispose(response.data.today)
        })
        .catch(error => console.log(error))
  }



  useEffect(() => {

    getAssetChartAllNum();
    getAssetChartUsingNum();
    getAssetChartDisposeNum();
  }, [])



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

        <section className="section dashboard">
          <div className="row">

            {/* <!-- Left side columns --> */}
            <div className="col-lg-12">
              <div className="row">

                {/*  <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-3">
                  <div className="card info-card sales-card">


                    <Link to="/approveList">
                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>자산사용요청 미승인건 <span>| Today</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-box-arrow-in-up-right"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{dataa.userReq}건</h6>

                        </div>
                      </div>
                    </div>
                    </Link>

                  </div>
                </div>{/* <!-- End Sales Card --> */}

                {/* <!-- Revenue Card --> */}
                <div className="col-xxl-3 col-md-3">
                  <div className="card info-card sales-card">

                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>자산구매요청 미승인건<span>| This Month</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-cart-plus"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{dataa.adminReq}건</h6>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>{/* <!-- End Revenue Card --> */}

                  <div className="col-xxl-3 col-md-3">

                    <div className="card info-card sales-card">
                      <Link to="/returnExchange">
                      <div className="card-body">
                        <h5 className="card-title" style={{fontWeight: "800"}}>교환 및 반납요청 미승인건<span>| This Year</span></h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                            <i className="bi bi-arrow-left-right"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{dataa.yetok}건</h6>

                          </div>
                        </div>

                      </div>
                </Link>
                    </div>

                  </div>{/* <!-- End Customers Card --> */}

                {/* <!-- Customers Card --> */}
                <div className="col-xxl-3 col-md-3">

                  <div className="card info-card sales-card">

                    <Link to="/userLeave">
                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>퇴사요청 미승인건<span>| This Year</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-person-dash"></i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>

                        </div>
                      </div>

                    </div>
                    </Link>
                  </div>

                </div>{/* <!-- End Customers Card --> */}


                {/* <!-- Reports --> */}
                <div className="col-8">
                  <div className="card">

                    <div className="card-body">
                      <Link to="/reports"><h5 className="card-title" style={{fontWeight: "800"}}>자산 사용률 <span>| 전체통계보기</span></h5></Link>

                      {/*  <!-- Line Chart --> */}
                      {all!==undefined && using!==undefined && dispose!==undefined && <div id="reportsChart"><AreaChart all={all} using={using} dispose={dispose}/></div>}




                    </div>

                  </div>
                </div>{/* <!-- End Reports --> */}

                {/*  <!-- Right side columns --> */}
                <div className="col-lg-4">

                  {/*   <!-- Recent Activity --> */}
                  <div className="card">

                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>재고처리현황 <span>| Today</span></h5>

                      <div className="activity">

                        <div className="activity-item d-flex">
                          <div className="activite-label">32 min</div>
                          <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                          <div className="activity-content">
                            Quia quae rerum <Link to="####" className="fw-bold text-dark">explicabo officiis</Link> beatae
                          </div>
                        </div>{/* <!-- End activity item--> */}

                        <div className="activity-item d-flex">
                          <div className="activite-label">56 min</div>
                          <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                          <div className="activity-content">
                            Voluptatem blanditiis blanditiis eveniet
                          </div>
                        </div>{/* <!-- End activity item--> */}

                        <div className="activity-item d-flex">
                          <div className="activite-label">2 hrs</div>
                          <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                          <div className="activity-content">
                            Voluptates corrupti molestias voluptatem
                          </div>
                        </div>{/* <!-- End activity item--> */}

                        <div className="activity-item d-flex">
                          <div className="activite-label">1 day</div>
                          <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                          <div className="activity-content">
                            Tempore autem saepe <Link to="####" className="fw-bold text-dark">occaecati voluptatem</Link> tempore
                          </div>
                        </div>{/* <!-- End activity item--> */}

                        <div className="activity-item d-flex">
                          <div className="activite-label">2 days</div>
                          <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                          <div className="activity-content">
                            Est sit eum reiciendis exercitationem
                          </div>
                        </div>{/* <!-- End activity item--> */}

                        <div className="activity-item d-flex">
                          <div className="activite-label">4 weeks</div>
                          <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                          <div className="activity-content">
                            Dicta dolorem harum nulla eius. Ut quid
                          </div>
                        </div>{/* <!-- End activity item--> */}
                        <div className="activity-item d-flex">
                          <div className="activite-label">2 months</div>
                          <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                          <div className="activity-content">
                            Dicta dolorem harum nulla eius. Ut quide
                          </div>
                        </div>{/* <!-- End activity item--> */}

                      </div>

                    </div>
                  </div>{/* <!-- End Recent Activity --> */}


                </div>{/* <!-- End Right side columns --> */}

                {/* <!-- Recent Sales --> */}
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">

                    <div className="filter">
                      <Link to="####" className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><Link to="####" className="dropdown-item">Today</Link></li>
                        <li><Link to="####" className="dropdown-item">This Month</Link></li>
                        <li><Link to="####" className="dropdown-item">This Year</Link></li>
                      </ul>
                    </div>



                    <div class="">
                      <div class="card-body">
                        <h5 class="card-title" style={{fontWeight: "800"}}>나의 결재 요청 승인 현황 <Link to="####"><span>| 전체보기</span></Link></h5>

                        <div class="tab-pane fade show active" id="home-justified" role="tabpanel" aria-labelledby="home-tab">
                          <table className="table table-borderless">
                            <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">요청자</th>
                              <th scope="col">결재요청사항</th>
                              <th scope="col">결재종류</th>
                              <th scope="col">승인여부</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <th scope="row"><Link to="####">2457</Link></th>
                              <td>Brandon Jacob</td>
                              <td><Link to="####" className="text-primary">At praesentium minu</Link></td>
                              <td>$64</td>
                              <td><span className="badge bg-success">승인</span></td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="####">2458</Link></th>
                              <td>Bridie Kessler</td>
                              <td><Link to="####" className="text-primary">Blanditiis dolor omnis similique</Link></td>
                              <td>$47</td>
                              <td><span className="badge bg-warning">확인중</span></td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="####">2049</Link></th>
                              <td>Ashleigh Langosh</td>
                              <td><Link to="####" className="text-primary">At recusandae consectetur</Link></td>
                              <td>$147</td>
                              <td><span className="badge bg-success">승인</span></td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="####">2644</Link></th>
                              <td>Angus Grady</td>
                              <td><Link to="####" className="text-primar">Ut voluptatem id earum et</Link></td>
                              <td>$67</td>
                              <td><span className="badge bg-danger">반려</span></td>
                            </tr>
                            <tr>
                              <th scope="row"><Link to="####">2644</Link></th>
                              <td>Raheem Lehner</td>
                              <td><Link to="####" className="text-primary">Sunt similique distinctio</Link></td>
                              <td>$165</td>
                              <td><span className="badge bg-success">승인</span></td>
                            </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>
                    </div>



                  </div>
                </div>{/* <!-- End Recent Sales --> */}

                {/*  <!-- Top Selling --> */}
                <div className="col-12">
                  <div className="card top-selling overflow-auto">

                    <div className="filter">
                      <Link to="####" className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li><Link to="####" className="dropdown-item">Today</Link></li>
                        <li><Link to="####" className="dropdown-item">This Month</Link></li>
                        <li><Link to="####" className="dropdown-item">This Year</Link></li>
                      </ul>
                    </div>

                    <div className="card-body pb-0">
                      <h5 className="card-title" style={{fontWeight: "800"}}>재고구매사항 <span>| 전체보기</span></h5>

                      <table className="table table-borderless">
                        <thead>
                        <tr>
                          <th scope="col">제품사진</th>
                          <th scope="col">자산명</th>
                          <th scope="col">자산설명</th>
                          <th scope="col">제품수량</th>
                          <th scope="col">추가날짜</th>
                          {/* <th scope="col">Revenue</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th scope="row"><Link to="####"><img src="assets/img/product-1.jpg" alt="" /></Link></th>
                          <td>$64</td>
                          <td><Link to="####" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</Link></td>
                          <td className="fw-bold">124</td>
                          {/* <td>$5,828</td> */}
                        </tr>
                        <tr>
                          <th scope="row"><Link to="####"><img src="assets/img/product-2.jpg" alt="" /></Link></th>
                          <td>$46</td>
                          <td><Link to="####" className="text-primary fw-bold">Exercitationem similique doloremque</Link></td>
                          <td className="fw-bold">98</td>
                          {/* <td>$4,508</td> */}
                        </tr>
                        <tr>
                          <th scope="row"><Link to="####"><img src="assets/img/product-3.jpg" alt="" /></Link></th>
                          <td>$59</td>
                          <td><Link to="####" className="text-primary fw-bold">Doloribus nisi exercitationem</Link></td>
                          <td className="fw-bold">74</td>
                          {/* <td>$4,366</td> */}
                        </tr>
                        <tr>
                          <th scope="row"><Link to="####"><img src="assets/img/product-4.jpg" alt="" /></Link></th>
                          <td>$32</td>
                          <td><Link to="####" className="text-primary fw-bold">Officiis quaerat sint rerum error</Link></td>
                          <td className="fw-bold">63</td>
                          {/* <td>$2,016</td> */}
                        </tr>
                        <tr>
                          <th scope="row"><Link to="####"><img src="assets/img/product-5.jpg" alt="" /></Link></th>
                          <td>$79</td>
                          <td><Link to="####" className="text-primary fw-bold">Sit unde debitis delectus repellendus</Link></td>
                          <td className="fw-bold">41</td>
                          {/* <td>$3,239</td> */}
                        </tr>
                        </tbody>
                      </table>

                    </div>

                  </div>
                </div>{/* <!-- End Top Selling --> */}

              </div>
            </div>{/* <!-- End Left side columns --> */}



          </div>
        </section>

      </main>
  );
}

export default AdminMain;
