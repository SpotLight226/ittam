package com.ittam.web.mainPage.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockReturnVO;
import com.ittam.web.command.UserRequestVO;
import com.ittam.web.command.UserVO;

import java.util.List;
import java.util.Map;

public interface MainPageService {

    public Integer getUsereqNum(); //사원 사용신청건수
    public Integer getBuyNum(); // 관리자 사용승인건수
    public Integer getYetOkNum(); //교환반납요청미승인건수
    public Integer getLeaveReq(); //퇴사요청건수
    public void registReturnReq(StockReturnVO vo); //교환반납요청등록하기
    public List<Map<Object, Object>> getReturnList(); //교환요청리스트가져오기
    public List<Map<Object, Object>> getSelectAssetList(Integer category_num); // 교환해줄 자산 리스트 가져오기
    public UserVO getUserInfo(String username);//로그인한 유저 정보가져오기(Mypage)
    public void modifyProfile(UserVO vo); //회원정보 수정
    public Integer getUserCnt_using(String username); // 사원이 사용 중인 자산 개수
    public Integer getUserCnt_exchange(String username); //사원이 교환신청한 자산개수
    public Integer getUserCnt_return(String username); //사원이 반품신청한 자산개수
    public Integer getUserCnt_usingReq(String username); //사원의 사용신청건수
    public Integer getUserCnt_buyReq(String username); //사원의 구매요청건수
    public List<Map<String, Object>> getMyAssetList(String username); //사원이 사용 중인 자산목록
    public void updateReturn_yn( Map<String, Object> map); //반납요청에 대한 승인반려처리
    public void updateAssetUsing(Integer assets_num); //반납교환처리된 자산은 사용보류처리
    public void deleteCancelReq(Integer return_num); //교환반납 요청 취소하기
    public Map<Object, Object> getAssetChartAllNum(); //날짜별로 전체 자산 개수 가져오기
    public Map<Object, Object> getAssetChartUsingNum(); //날짜별로 전체 사용중인 자산 개수 가져오기
    public Map<Object, Object> getAssetChartDisposeNum(); //날짜별로 전체 사용중인 자산 개수 가져오기
    public void exchangeAsset_exchange(Map<String, Object> map); //교환할 제품 사용중 처리하기
    public void exchangeAsset_cancel(Map<String, Object> map); //교환된 제품 사용보류 처리하기
    public List<UserRequestVO> getMyRequestList(String username); //내가 사용 구매 요청한 리스트 가져오기
    public void deleteUsingPerchaseReq(Integer userq_num); //사용 구매 신청 취소
    public void registLeaveReq(String username); //퇴사요청

}
