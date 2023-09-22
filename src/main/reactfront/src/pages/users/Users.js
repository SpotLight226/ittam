import React, { useEffect, useReducer, useRef } from "react";

import { useParams } from "react-router-dom";

// pages
import UserList from "./UserList";
import UserReg from "./UserReg";
import UserLeave from "./UserLeave";
import PageTitle from "../../component/PageTitle";
import axios from "axios";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state]; // 새로운 아이템을 추가
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId); // id가 타켓의 id가 아닌 것만 newState로
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        // 전체 데이터를 변경가능
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default: {
      return state;
    }
  }

  return newState;
};

// 모든 컴포넌트에 보낼 Context
export const UserStateContext = React.createContext(); // 데이터
export const UserDispatchContext = React.createContext(); // 데이터 변환 함수

const Users = () => {
  const page = useParams().page;
  const subPage = useParams().subPage;

  const dataId = useRef(0);
  // 데이터 받아올 useReducer
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // 데이터 가져오는 부분
    const getData = async () => {
      try {
        const res = await axios.get("/User/UserList");
        const mappedData = res.data.map((it) => {
          dataId.current += 1;
          return {
            id: dataId.current,
            ...it,
          };
        });
        dispatch({
          type: "INIT",
          data: mappedData,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getData(); // 데이터 가져오기
  }, []); //

  // 새 유저 추가
  const onCreate = (content) => {
    axios
      .post("/User/UserRegist", content)
      .then((res) => {
        if (res.data === 1) {
          dataId.current += 1;
          const newData = {
            id: dataId.current,
            ...content,
          };
          dispatch({
            type: "CREATE",
            data: newData,
          });
        } else {
          alert("등록에 실패하였습니다");
        }
      })
      .catch((err) => console.log(err));
  };

  // 유저 수정
  const onEdit = (targetId, role) => {
    axios({
      url: "/User/UserEdit",
      method: "post",
      data: {
        targetId: targetId,
        role: role,
      },
    })
      .then((res) => {
        dispatch({
          type: "EDIT",
          data: {
            username: targetId,
            role: role,
          },
        });
        alert(res.data);
      })
      .catch((err) => alert(err.data));
  };

  // 유저 삭제
  const onRemove = () => {
    dispatch({
      type: "REMOVE",
    });
  };

  // subPage 에 따라 랜더링할 컴포넌트 결정
  let subPageComponent;
  switch (subPage) {
    case "userList":
      subPageComponent = <UserList />;
      break;
    case "userReg":
      subPageComponent = <UserReg />;
      break;
    case "userLeave":
      subPageComponent = <UserLeave />;
      break;
    default:
      subPageComponent = null;
  }

  return (
    <UserStateContext.Provider value={data}>
      <UserDispatchContext.Provider value={{ onCreate, onEdit }}>
        <div className="Users">
          <main id="main" className="main">
            <PageTitle page={page} subPage={subPage} />
            {subPageComponent}
          </main>
        </div>
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

Users.defaultProps = {
  data: [],
};

export default Users;
