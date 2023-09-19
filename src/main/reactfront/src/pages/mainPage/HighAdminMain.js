import AreaChart from "../../component/Chart/AdminMainChart";
import { Link } from "react-router-dom";
import "../../styles/Style.css";
import "../../styles/MainPageStyle/AdminStyle.css";
import {useEffect, useState} from "react";
import axios from "axios";
import UsingRateChart from "../../component/Chart/UsingRateChart";


function HighAdminMain() {
  const token = localStorage.getItem("token");

  const [dataa, setDataa] = useState({});
  //////////차~~~트///////////
  const [all, setAll] = useState();
  const [using, setUsing] = useState();
  const [dispose, setDispose] = useState();

  const [recentAssets, setRecentAssets] = useState([]);
  const [nnn, setNnn] = useState(5);
  const [cardNum, setCardNum] = useState();


  const addDate = (add) => {
    let now = new Date(add);
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "-" + (todayMonth >= 10 ? todayMonth : '0'+todayMonth) + "-" + (todayDate >= 10 ? todayDate : '0'+todayDate);
  }




  const adminMainCnt = () => {

    axios({
      url: "/mainPage/adminMainCnt",
      method: "get",
      headers: {
        Authorization : token
      },
    }).then(response => {setDataa(response.data);})
        .catch(error => console.log(error))
  }

  const getAssetChartAllNum = () => {
        axios({
          url: "/mainPage/getAssetChartAllNum",
          method: "get",
          headers: {
            Authorization : token
          },
        })
        .then((res) => {
          setAll(res.data);
          })
            .catch(error => console.log(error));

  }
  const getAssetChartUsingNum = () => {
   
        axios({
          url: "/mainPage/getAssetChartUsingNum",
          method: "get",
          headers: {
            Authorization : token
          },
        })
        .then((res) => {
          setUsing(res.data);
          })
            .catch(error => console.log(error));



  }
  const getAssetChartDisposeNum = () => {
        axios({
          url: "/mainPage/getAssetChartDisposeNum",
          method: "get",
          headers: {
            Authorization : token
          },
        })
        .then((res) => {
          setDispose(res.data);
          })
            .catch(error => console.log(error));
  }
  const getRecentAssetsList = (nnn) => {

    axios({
      url: "/mainPage/getRecentAssetsList",
      method: "get",
      headers: {
        Authorization : token
      },
      params: {
        nnn: nnn
      },
    })
        .then(response => {
          setRecentAssets(response.data);
          console.log(response.data);
        })
        .catch((error => console.log(error)));
  }

  const getCardNum = () => {

        axios({
          url: "/reports/getCardNum",
          method: "get",
          headers: {
            Authorization : token
          },
        })
        .then((res) => {
          setCardNum(res.data) 
               })
            .catch(error => console.log(error));
  }



  useEffect(() => {
    adminMainCnt();
    getAssetChartAllNum();
    getAssetChartUsingNum();
    getAssetChartDisposeNum();
    getCardNum();
  }, [])

  useEffect(() => {

    getRecentAssetsList(nnn);
  }, [nnn]);




  return (
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>상위관리자 홈</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active"><Link to="/admin/adminMain">Home</Link></li>
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


                    <Link to="/highAdmin/approveList">
                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>최종자산사용요청 미승인건 <span>| Today</span></h5>

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

                    <Link to="/highAdmin/approveBuyList">
                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>최종자산구매요청 미승인건<span>| This Month</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-cart-plus"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{dataa.buyReq}건</h6>

                        </div>
                      </div>
                    </div>
                    </Link>

                  </div>
                </div>{/* <!-- End Revenue Card --> */}

                  <div className="col-xxl-3 col-md-3">

                    <div className="card info-card sales-card">
                      <Link to="/admin/returnExchange">
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

                    <Link to="/users/userLeave">
                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>퇴사요청 미승인건<span>| This Year</span></h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center AdminMain-icon">
                          <i className="bi bi-person-dash"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{dataa.leaveReq}건</h6>

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
                      <Link to="/admin/reports"><h5 className="card-title" style={{fontWeight: "800"}}>자산 사용률 <span>| 전체 리포트 보기</span></h5></Link>

                      {/*  <!-- Line Chart --> */}
                      {(all!==undefined && using!==undefined && dispose!==undefined) ? <div id="reportsChart"><AreaChart all={all} using={using} dispose={dispose}/></div> :
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>}

                    </div>

                  </div>
                </div>{/* <!-- End Reports --> */}

                {/*  <!-- Right side columns --> */}
                <div className="col-lg-4">

                  {/*   <!-- Recent Activity --> */}
                  <div className="card">

                    <div className="card-body">
                      <h5 className="card-title" style={{fontWeight: "800"}}>자산 사용률 <span>| 전체 리포트 보기</span></h5>

                      {cardNum !== undefined ? <UsingRateChart cardNum={cardNum}/> :
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>}
                      {/*<div className="activity">*/}

                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">32 min</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Quia quae rerumbeatae*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}

                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">56 min</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Voluptatem blanditiis blanditiis eveniet*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}

                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">2 hrs</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Voluptates corrupti molestias voluptatem*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}

                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">1 day</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Tempore autem saepetempore*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}

                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">2 days</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Est sit eum reiciendis exercitationem*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}

                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">4 weeks</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Dicta dolorem harum nulla eius. Ut quid*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}
                      {/*  <div className="activity-item d-flex">*/}
                      {/*    <div className="activite-label">2 months</div>*/}
                      {/*    <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>*/}
                      {/*    <div className="activity-content">*/}
                      {/*      Dicta dolorem harum nulla eius. Ut quide*/}
                      {/*    </div>*/}
                      {/*  </div>/!* <!-- End activity item--> *!/*/}

                      {/*</div>*/}

                    </div>
                  </div>{/* <!-- End Recent Activity --> */}


                </div>{/* <!-- End Right side columns --> */}

                {/* <!-- Recent Sales --> */}
                {/*<div className="col-12">*/}
                {/*  <div className="card recent-sales overflow-auto">*/}

                {/*    */}
                {/*    <div class="">*/}
                {/*      <div class="card-body">*/}
                {/*        <h5 class="card-title" style={{fontWeight: "800"}}>나의 결재 요청 승인 현황 <Link to="####"><span>| 전체보기</span></Link></h5>*/}

                {/*        <div class="tab-pane fade show active" id="home-justified" role="tabpanel" aria-labelledby="home-tab">*/}
                {/*          <table className="table table-borderless">*/}
                {/*            <thead>*/}
                {/*            <tr>*/}
                {/*              <th scope="col">#</th>*/}
                {/*              <th scope="col">요청자</th>*/}
                {/*              <th scope="col">결재요청사항</th>*/}
                {/*              <th scope="col">결재종류</th>*/}
                {/*              <th scope="col">승인여부</th>*/}
                {/*            </tr>*/}
                {/*            </thead>*/}
                {/*            <tbody>*/}
                {/*            <tr>*/}
                {/*              <th scope="row"><Link to="####">2457</Link></th>*/}
                {/*              <td>Brandon Jacob</td>*/}
                {/*              <td><Link to="####" className="text-primary">At praesentium minu</Link></td>*/}
                {/*              <td>$64</td>*/}
                {/*              <td><span className="badge bg-success">승인</span></td>*/}
                {/*            </tr>*/}
                {/*            <tr>*/}
                {/*              <th scope="row"><Link to="####">2458</Link></th>*/}
                {/*              <td>Bridie Kessler</td>*/}
                {/*              <td><Link to="####" className="text-primary">Blanditiis dolor omnis similique</Link></td>*/}
                {/*              <td>$47</td>*/}
                {/*              <td><span className="badge bg-warning">확인중</span></td>*/}
                {/*            </tr>*/}
                {/*            <tr>*/}
                {/*              <th scope="row"><Link to="####">2049</Link></th>*/}
                {/*              <td>Ashleigh Langosh</td>*/}
                {/*              <td><Link to="####" className="text-primary">At recusandae consectetur</Link></td>*/}
                {/*              <td>$147</td>*/}
                {/*              <td><span className="badge bg-success">승인</span></td>*/}
                {/*            </tr>*/}
                {/*            <tr>*/}
                {/*              <th scope="row"><Link to="####">2644</Link></th>*/}
                {/*              <td>Angus Grady</td>*/}
                {/*              <td><Link to="####" className="text-primar">Ut voluptatem id earum et</Link></td>*/}
                {/*              <td>$67</td>*/}
                {/*              <td><span className="badge bg-danger">반려</span></td>*/}
                {/*            </tr>*/}
                {/*            <tr>*/}
                {/*              <th scope="row"><Link to="####">2644</Link></th>*/}
                {/*              <td>Raheem Lehner</td>*/}
                {/*              <td><Link to="####" className="text-primary">Sunt similique distinctio</Link></td>*/}
                {/*              <td>$165</td>*/}
                {/*              <td><span className="badge bg-success">승인</span></td>*/}
                {/*            </tr>*/}
                {/*            </tbody>*/}
                {/*          </table>*/}
                {/*        </div>*/}

                {/*      </div>*/}
                {/*    </div>*/}



                {/*  </div>*/}
                {/*</div>/!* <!-- End Recent Sales --> *!/*/}

                {/*  <!-- Top Selling --> */}
                <div className="col-12">
                  <div className="card top-selling overflow-auto">

                    <div className="card-body pb-0" style={{paddingTop: '20px'}}>
                     <Link to="/adminitassets"><h5 className="card-title" style={{fontWeight: "800", display: 'inline'}}>재고구매사항 <span>| 전체보기</span></h5></Link>
                      <select style={{marginLeft: '1447px', display:'inline'}} onChange={(e) => {setNnn(parseInt(e.target.value));}}>
                        <option value="5">5개</option>
                        <option value="7">7개</option>
                        <option value="10">10개</option>
                      </select>


                      <table className="table" style={{marginTop: '10px'}}>
                        <thead>
                        <tr className="table-light">
                          <th scope="col">카테고리</th>
                          <th scope="col">자산명</th>
                          <th scope="col">자산스펙</th>
                          <th scope="col">추가날짜</th>
                          {/* <th scope="col">Revenue</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {
                          recentAssets.map((a, i) => {
                            return <tr key={i}>
                          <td scope="row">{
                            a.CATEGORY_PARENT_NUM === 1 ? 'PC/노트북' : (a.CATEGORY_PARENT_NUM === 2 ? '소프트웨어' : (a.CATEGORY_PARENT_NUM === 3 ? '주변기기' : '서버'))
                          }</td>
                          <td>{a.ASSETS_NAME}</td>
                          <td style={{fontSize:"14px", color: "gray", width: '800px'}}>
                            {a.SPEC_CPU!==undefined? a.SPEC_CPU+' |':''}
                            {a.SPEC_RAM!==undefined? a.SPEC_RAM+" |":''}
                            {a.SPEC_MAINBOARD!==undefined? a.SPEC_MAINBOARD+" |":''}
                            {a.SPEC_POWER!==undefined?a.SPEC_POWER+' |':''}
                            {a.SPEC_GPU!==undefined?a.SPEC_GPU+' |':''}
                            {a.SPEC_HDD!==undefined?a.SPEC_HDD+' |':''}
                            {a.SPEC_SSD!==undefined?a.SPEC_SSD+" |":''}
                            {a.SPEC_OPS!==undefined?a.SPEC_OPS+" |":''}
                            {a.SPEC_MFG!==undefined?a.SPEC_MFG+" |":''}
                            {a.SPEC_SERIEL!==undefined?a.SPEC_SERIEL+" |":''}
                            {/*{a.SPEC_PURCHASE_DATE!==undefined?a.SPEC_PURCHASE_DATE+" |":''}*/}
                            {a.SPEC_WARRANTY!==undefined?a.SPEC_WARRANTY+" |":''}
                            {a.SW_MFG!==undefined?a.SW_MFG+" |":''}
                            {a.SW_SPEC_SERIEL!==undefined?a.SW_SPEC_SERIEL+" |":''}
                            {a.SW_SPEC_WARRANTY!==undefined?a.SW_SPEC_WARRANTY+" |":''}
                            {/*{a.SW_PURCHASE_DATE!==undefined?a.SW_PURCHASE_DATE+" |":''}*/}
                            {a.SW_PRICE!==undefined?a.SW_PRICE+" |":''}
                            {a.SERVER_MFG!==undefined?a.SERVER_MFG+" |":''}
                            {a.SERVER_PRICE!==undefined?a.SERVER_PRICE+" |":''}
                            {/*{a.SERVER_PURCHASE_DATE!==undefined?a.SERVER_PURCHASE_DATE+" |":''}*/}
                            {a.SERVER_INTERFACE!==undefined?a.SERVER_INTERFACE+" |":''}
                            {a.SERVER_AVERAGE_LIFE!==undefined?a.SERVER_AVERAGE_LIFE+" |":''}
                            {a.SERVER_RPM!==undefined?a.SERVER_RPM+" |":''}
                            {a.SERVER_DATARECOVERY_LIFE!==undefined?a.SERVER_DATARECOVERY_LIFE+" |":''}
                            {a.ETC_MFG!==undefined?a.ETC_MFG+" |":''}
                            {a.ETC_SPEC_WARRANTY!==undefined?a.ETC_SPEC_WARRANTY+" |":''}
                            {/*{a.ETC_PURCHASE_DATE!==undefined?a.ETC_PURCHASE_DATE+" |":''}*/}
                            {a.ETC_PRICE!==undefined?a.ETC_PRICE+" |":''}
                          </td>
                          <td>{addDate(a.ADD_DATE)}</td>
                        </tr>
                          })
                        }

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

export default HighAdminMain;
