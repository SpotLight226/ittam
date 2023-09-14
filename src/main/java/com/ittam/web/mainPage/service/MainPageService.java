package com.ittam.web.mainPage.service;

import com.ittam.web.command.StockReturnVO;
import com.ittam.web.command.UserVO;

import java.util.List;
import java.util.Map;

public interface MainPageService {

    public Integer getUsereqNum(); //사원 사용신청건수
    public Integer getAdminOkNum(); // 관리자 사용승인건수
    public Integer getYetOkNum(); //교환반납요청미승인건수
    public void registReturnReq(StockReturnVO vo);
    public List<Map<Object, Object>> getReturnList();
    public UserVO getUserInfo(String username);//로그인한 유저 정보가져오기(Mypage)
    public void modifyProfile(UserVO vo); //회원정보 수정
    public Integer getUserCnt_using(String username); // 사원이 사용 중인 자산 개수
    public Integer getUserCnt_exchange(String username); //사원이 교환신청한 자산개수
    public Integer getUserCnt_return(String username); //사원이 반품신청한 자산개수
    public List<Map<Object, Object>> getMyAssetList(String username); //사원이 사용 중인 자산목록
    public void updateReturn_yn( Map<String, Object> map); //반납요청에 대한 승인반려처리
    public void updateAssetUsing(Integer assets_num); //반납 교환처리된 자산은 사용보류처리
    public void deleteCancelReq(Integer return_num); //교환반납 요청 취소하기
    public Map<Object, Object> getAssetChartAllNum(); //날짜별로 전체 자산 개수 가져오기
    public Map<Object, Object> getAssetChartUsingNum(); //날짜별로 전체 사용중인 자산 개수 가져오기
    public Map<Object, Object> getAssetChartDisposeNum(); //날짜별로 전체 사용중인 자산 개수 가져오기

}
