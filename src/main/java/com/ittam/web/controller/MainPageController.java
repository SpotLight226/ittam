package com.ittam.web.controller;

import com.ittam.web.command.StockReturnVO;
import com.ittam.web.command.UserVO;
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
    @GetMapping("/adminMain")
    public ResponseEntity<Map<String, Integer>> getUsereqNum() {
        Integer num = mainPageService.getUsereqNum();
        Integer num2 = mainPageService.getAdminOkNum();
        Integer num3 = mainPageService.getYetOkNum();
        Map<String, Integer> map = new HashMap<>();
        map.put("userReq", num);
        map.put("adminReq", num2);
        map.put("yetok", num3);

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
        System.out.println(username);
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

        return new ResponseEntity<>(map , HttpStatus.OK);
    }

    //내 사용중인 자산 리스트 가져오기
    @GetMapping("/getMyAssetList")
    public ResponseEntity<List<Map<Object, Object>>> getMyAssetList(@RequestParam String username) {
        List<Map<Object, Object>> list = mainPageService.getMyAssetList(username);
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





}
