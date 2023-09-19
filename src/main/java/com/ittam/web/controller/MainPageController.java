package com.ittam.web.controller;

import com.ittam.web.command.*;
import com.ittam.web.mainPage.service.MainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mainPage")
@CrossOrigin(origins = "http://localhost:3000")
public class MainPageController {

    @Autowired
    @Qualifier("mainPageService")
    private MainPageService mainPageService;


    //요청및미승인건수가져오기
    @GetMapping("/adminMainCnt")
    public ResponseEntity<Map<String, Integer>> getUsereqNum() {
        Integer num = mainPageService.getUsereqNum();
        Integer num2 = mainPageService.getBuyNum();
        Integer num3 = mainPageService.getYetOkNum();
        Integer num4 = mainPageService.getLeaveReq();
        Map<String, Integer> map = new HashMap<>();
        map.put("userReq", num);
        map.put("buyReq", num2);
        map.put("yetok", num3);
        map.put("leaveReq", num4);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    //교환반품 요청서 보내기(user페이지)
    @PostMapping("/returnForm")
    public ResponseEntity<String> registReturnReq(@RequestBody StockReturnVO vo) {
        mainPageService.registReturnReq(vo);
        return new ResponseEntity<>("요청등록성공", HttpStatus.OK);
    }
    //교환반품 요청 리스트 가져오기(admin페이지)
    @GetMapping("/returnList")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Map<Object, Object>>> getReturnList() {
        List<Map<Object, Object>> list = mainPageService.getReturnList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //마이페이지 정보 가져오기
    @GetMapping("/getUserInfo")
    public ResponseEntity<UserVO> getUserInfo(@RequestParam String username) {
        System.out.println("유저아이디:"+username);
        UserVO vo = mainPageService.getUserInfo(username);
        return new ResponseEntity<>(vo, HttpStatus.OK);
    }
    //마이페이지 수정하기
    @PostMapping("/modifyProfile")
    public ResponseEntity<String> modifyProfile(@RequestBody UserVO vo) {
        mainPageService.modifyProfile(vo);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    //유저 자산 사용정보 가져오기
    @GetMapping("/getUserCnt")
    public ResponseEntity<Map<String, Integer>> getUserCnt(@RequestParam String username) {
        Map<String, Integer> map = new HashMap<>();
        map.put("using", mainPageService.getUserCnt_using(username));
        map.put("exchange", mainPageService.getUserCnt_exchange(username));
        map.put("return", mainPageService.getUserCnt_return(username));
        map.put("usingReq", mainPageService.getUserCnt_usingReq(username));
        map.put("buyReq", mainPageService.getUserCnt_buyReq(username));
        return new ResponseEntity<>(map , HttpStatus.OK);
    }

    //내 사용중인 자산 리스트 가져오기
    @GetMapping("/getMyAssetList")
    public ResponseEntity<List<Map<String, Object>>> getMyAssetList(@RequestParam String username) {
        List<Map<String, Object>> list = mainPageService.getMyAssetList(username);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/return_yn")
    public ResponseEntity<String> updateReturn_yn(@RequestBody Map<String, Object> map) {
        mainPageService.updateReturn_yn(map);
        mainPageService.updateAssetUsing((Integer) map.get("assets_num"));
        return new ResponseEntity<>("승인처리",HttpStatus.OK);
    }

    @DeleteMapping("/deleteCancelReq")
    public ResponseEntity<String> deleteCancelReq(@RequestParam Integer return_num) {
        mainPageService.deleteCancelReq(return_num);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

////////////////////////관리자 페이지 차트 데이터 불러오기///////////////////////////////////
    @GetMapping("/getAssetChartAllNum")
    public ResponseEntity<Map<Object, Object>> getAssetChartAllNum() {
        Map<Object, Object> map = mainPageService.getAssetChartAllNum();
        System.out.println(map.toString());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/getAssetChartUsingNum")
    public ResponseEntity<Map<Object, Object>> getAssetChartUsingNum() {
        Map<Object, Object> map = mainPageService.getAssetChartUsingNum();
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    @GetMapping("/getAssetChartDisposeNum")
    public ResponseEntity<Map<Object, Object>> getAssetChartDisposeNum() {
        Map<Object, Object> map = mainPageService.getAssetChartDisposeNum();
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

///////////////////////////////////////////////////////////////////////////////////////

    //교환가능한 자산 리스트 가져오기
    @GetMapping("/getSelectAssetList")
    public ResponseEntity<List<Map<Object, Object>>> getSelectAssetList(Integer category_num) {
        List<Map<Object, Object>> map = mainPageService.getSelectAssetList(category_num);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //교환신청 승인처리하기
    @PostMapping ("/exchangeAsset")
    public ResponseEntity<String> exchangeAsset(@RequestBody Map<String, Object> map) {
        mainPageService.exchangeAsset_exchange(map);
        mainPageService.exchangeAsset_cancel(map);
        mainPageService.updateReturn_yn(map);
        mainPageService.exchangeAsset_assetlog(map);
//        System.out.println("assets_num_now:   " + map.get("assets_num_later"));
//        System.out.println("assets_num_now:   " + map.get("assets_num_now"));
        return new ResponseEntity<>("승인처리되었습니다", HttpStatus.OK);
    }

    //내가 사용 및 구매 요청한 리스트 가져오기
    @GetMapping("/getMyRequestList")
    public ResponseEntity<List<UserRequestVO>> getMyRequestList(@RequestParam String username) {
        List<UserRequestVO> list = mainPageService.getMyRequestList(username);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //사용 구매신청 취소
    @DeleteMapping("/deleteUsingPerchaseReq")
    public ResponseEntity<String> deleteUsingPerchaseReq(@RequestParam Integer userq_num) {
        mainPageService.deleteUsingPerchaseReq(userq_num);
        return new ResponseEntity<>("요청취소완료", HttpStatus.OK);
    }


    //퇴사신청
    @GetMapping("/registLeaveReq")
    public ResponseEntity<String> registLeaveReq(@RequestParam String username) {
        mainPageService.registLeaveReq(username);
        return new ResponseEntity<>("퇴사요청완료", HttpStatus.OK);
    }

    //userMain에 들어가는 차트 숫자 가져오기
    @GetMapping("/getMyAssetChartCnt")
    public ResponseEntity<Map<String, Integer>> getMyAssetChartCnt(@RequestParam String username) {
        Map<String, Integer> map = new HashMap<>();
        map.put("pcCnt", mainPageService.getMyPcCnt(username));
        map.put("swcnt", mainPageService.getMySwCnt(username));
        map.put("etcCnt", mainPageService.getMyEtcCnt(username));
        map.put("serverCnt", mainPageService.getMyServerCnt(username));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //최근자산 목록 불러오기
    @GetMapping("/getRecentAssetsList")
    public ResponseEntity<List<Map<String, Object>>> getRecentAssetsList(Integer nnn) {
        List<Map<String, Object>> map = mainPageService.getRecentAssetsList(nnn);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //최근 공지사항 목록 불러오기
    @GetMapping("/getNoticeList")
    public ResponseEntity<List<NoticeVO>> getNoticeList() {
        List<NoticeVO> list = mainPageService.getNoticeList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
