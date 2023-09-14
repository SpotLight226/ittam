import "../../styles/Style.css";
import "../../styles/MainPageStyle/UserStyle.css";
import {useEffect, useState} from "react";
import axios from "axios";
import ReturnReqModal from '../../component/Modal/ReturnReqModal';
import ReturnCancelModal from "../../component/Modal/ReturnCancelModal";
function UserMain_using() {
  const [openModal, setOpenModal] = useState(false);
  const [openCancelMddal, setOpenCancelModal] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputComment, setInputComment] = useState('');
  const [myAssetNum, setMyAssetNum] = useState(0);
  const [myAssetList, setMyAssetList] = useState([]);

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();
    const week = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + dayOfWeek + " ";
  }


  const [data, setData] = useState({
    assets_num: "",
    username: "DE0003",
    return_kind: "교환",
    return_title: "",
    return_comment: "",
    return_date: "",
    return_status: ""
  });

  const handleChange = (e) => {

    if(e.target.name === 'return_title') {
      setInputTitle(e.target.value);

    } else if (e.target.name === 'return_comment') {
      setInputComment(e.target.value);
    }

    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };
  const handleSubmit = (e, assets_num) => {
    e.preventDefault();
    const returnForm = {
      assets_num: assets_num,
      username: data.username,
      return_kind: data.return_kind,
      return_title: inputTitle,
      return_comment: inputComment,
      return_date: data.return_date,
      return_status: data.return_status
    };
    console.log(returnForm);
    axios
        .post("/mainPage/returnForm", returnForm)
        .then((response) => {
          alert('신청완료되었습니다.');
          console.log(response);

          setOpenModal(false);
          getMyAssetList();

        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        });
    setInputTitle('');
    setInputComment('');
  };

  const getMyAssetList = () => {
    axios.get("/mainPage/getMyAssetList", {
      params: {username: 'DE0003'}
    }).then(response => {setMyAssetList(response.data); console.log(response.data)})
        .catch(error => console.log(error))
  }

  useEffect(() => {
    getMyAssetList();
  }, []);




  return (
      <main id="main" className="main">
        {
            openModal && <ReturnReqModal setOpenModal={setOpenModal} handleSubmit={handleSubmit} handleChange={handleChange} todayTime={todayTime} inputTitle={inputTitle} inputComment={inputComment} setInputComment={setInputComment} setInputTitle={setInputTitle} myAssetList={myAssetList} myAssetNum={myAssetNum}/>
        }
        {
          openCancelMddal && <ReturnCancelModal setOpenCancelModal={setOpenCancelModal} myAssetList={myAssetList} myAssetNum={myAssetNum} getMyAssetList={getMyAssetList}/>
        }




        <div className="pagetitle">
          <h1>나의 사용자산</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">나의 사용자산</li>

            </ol>
          </nav>
        </div>




        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Default Table</h5>

            {/* <!-- Default Table --> */}
            <table className="table table-borderless" style={{textAlign: 'center'}}>
              <thead>
              <tr className="table-info">
                <th scope="col">#</th>
                <th scope="col">자산종류</th>
                <th scope="col">자산스펙</th>
                <th scope="col">대여일자</th>
                <th scope="col">자산상태</th>
                <th scope="col">교환/반납</th>

              </tr>
              </thead>
              <tbody>

              {
                myAssetList.map((a, i) => {
                  return <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{a.ASSETS_NAME}{a.ASSETS_DETAIL_NAME}</td>
                <td style={{fontSize:"14px", color: "gray", width: '800px'}}>{a.SPEC_CPU!==undefined? a.SPEC_CPU+' |':''}
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
                                                                              {a.ETC_PRICE!==undefined?a.ETC_PRICE+" |":''}</td>
                <td>2016-05-25</td>
                <td>{a.ASSETS_STATUS}</td>

                <td>
                  {
                    a.RETURN_STATUS===undefined ?
                  <button type="button" className="userMain-ask userMain-modalBtn" onClick={() => {setOpenModal(true); setMyAssetNum(a.ASSETS_NUM)}}>교환/반납</button>
                    : ( a.RETURN_STATUS==='승인대기' ?
                        <button type="button" className="userMain-ask userMain-modalBtn" style={{backgroundColor: "orange"}} onClick={() => {setOpenCancelModal(true); setMyAssetNum(a.ASSETS_NUM)}}>{a.RETURN_KIND}취소</button>
                            : <button type="button" className="userMain-ask userMain-modalBtn" style={{backgroundColor: "darkgreen"}} disabled>{a.RETURN_KIND}완료</button>
                        )

                  }
                </td>

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


export default UserMain_using;