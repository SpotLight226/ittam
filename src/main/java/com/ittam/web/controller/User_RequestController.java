package com.ittam.web.controller;

import com.ittam.web.command.UserRequestVO;
import com.ittam.web.user_request.service.UserRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/UserRequest")
@CrossOrigin(origins = "http://localhost:3000")
public class User_RequestController {

    @Autowired
    @Qualifier("userRequestService")
    private UserRequestService userRequestService;


    @GetMapping("/UserRequestList") // (관리자 페이지) 신청 조회 페이지 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestList(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestList();
        return ResponseEntity.ok(list);
    }

    int count = 0;
    @PostMapping("/UserRequestApprove") // (관리자 페이지) 신청 승인 처리
    public ResponseEntity<String> UserRequestApprove(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            userRequestService.UserRequestApprove(Integer.parseInt(requestBody.get("userq_NUM")));
            count++;
            return ResponseEntity.ok("자산 사용 승인이 완료되었습니다." + count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 승인 중 오류가 발생했습니다.");
        }

    }

    int count1 = 0;
    @PostMapping("/UserRequestReturn") // (관리자 페이지) 신청 반려 처리
    public ResponseEntity<String> UserRequestReturn(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            userRequestService.UserRequestreturn(Integer.parseInt(requestBody.get("userq_NUM")));
            count1++;
            return ResponseEntity.ok("자산 사용 승인이 반려되었습니다." + count1);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 반려 중 오류가 발생했습니다.");
        }

    }

    @PostMapping("/UserRequestSearch") // (관리자 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestSearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestSearch(requestBody.get("inputText"));
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    //
    @GetMapping("/UserRequestHandlePage") // (관리자 처리 페이지) 목록 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestHandle(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestHandle();
        return ResponseEntity.ok(list);

    }

    @PostMapping("/UserRequestHandleSearch") // (관리자 신청 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestHandleSearch(@RequestBody Map<String, String> requestBody){
        ArrayList pageNav = new ArrayList();
        if (requestBody.get("pageNav").equals("관리자전체")){
            pageNav.add("관리자사용승인");
            pageNav.add("관리자사용반려");
        } else if (requestBody.get("pageNav").equals("관리자승인")){
            pageNav.add("관리자사용승인");
        } else if (requestBody.get("pageNav").equals("관리자반려")){
            pageNav.add("관리자사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestHandleSearch(requestBody.get("inputText"), pageNav);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestNavSearch") // (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestNavSearch(@RequestBody Map<String, String> requestBody){
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("관리자전체")){
            navText.add("관리자사용승인");
            navText.add("관리자사용반려");
        } else if (requestBody.get("navText").equals("관리자승인")){
            navText.add("관리자사용승인");
        } else if (requestBody.get("navText").equals("관리자반려")){
            navText.add("관리자사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestNavSearch(navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestCategorySearch") // (관리자) 자산별 검색 select
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestCategorySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("전체")){
            navText.add("관리자사용승인");
            navText.add("관리자사용반려");
        } else if (requestBody.get("navText").equals("승인")){
            navText.add("관리자사용승인");
        } else if (requestBody.get("navText").equals("반려")){
            navText.add("관리자사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestCategorySearch(requestBody.get("category_num"),navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    /////////////////////////////// 관리자 구매 관련
    @GetMapping("/UserRequestBuyList") // (관리자 페이지) 신청 조회 페이지 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyList(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestBuyList();
        return ResponseEntity.ok(list);
    }

    int count2 = 0;
    @PostMapping("/UserRequestBuyApprove") // (관리자 페이지) 신청 승인 처리
    public ResponseEntity<String> UserRequestBuyApprove(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            userRequestService.UserRequestBuyApprove(Integer.parseInt(requestBody.get("userq_NUM")));
            count2++;
            return ResponseEntity.ok("자산 구매 승인이 완료되었습니다." + count2);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 구매 승인 중 오류가 발생했습니다.");
        }

    }

    int count3 = 0;
    @PostMapping("/UserRequestBuyReturn") // (관리자 페이지) 신청 반려 처리
    public ResponseEntity<String> UserRequestBuyReturn(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            userRequestService.UserRequestBuyReturn(Integer.parseInt(requestBody.get("userq_NUM")));
            count3++;
            return ResponseEntity.ok("자산 사용 승인이 반려되었습니다." + count1);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 반려 중 오류가 발생했습니다.");
        }

    }

    @PostMapping("/UserRequestBuySearch") // (관리자 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuySearch(requestBody.get("inputText"));
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @GetMapping("/UserRequestBuyHandlePage") // (관리자 처리 페이지) 목록 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyHandlePage(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestBuyHandlePage();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/UserRequestBuyHandleSearch") // (관리자 신청 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyHandleSearch(@RequestBody Map<String, String> requestBody){
        ArrayList pageNav = new ArrayList();
        if (requestBody.get("pageNav").equals("관리자전체")){
            pageNav.add("관리자구매승인");
            pageNav.add("관리자구매반려");
        } else if (requestBody.get("pageNav").equals("관리자승인")){
            pageNav.add("관리자구매승인");
        } else if (requestBody.get("pageNav").equals("관리자반려")){
            pageNav.add("관리자구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuyHandleSearch(requestBody.get("inputText"), pageNav);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 구매 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestBuyNavSearch") // (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyNavSearch(@RequestBody Map<String, String> requestBody){
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("관리자전체")){
            navText.add("관리자구매승인");
            navText.add("관리자구매반려");
        } else if (requestBody.get("navText").equals("관리자승인")){
            navText.add("관리자구매승인");
        } else if (requestBody.get("navText").equals("관리자반려")){
            navText.add("관리자구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuyNavSearch(navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestBuyCategorySearch") // (관리자) 자산별 검색 select
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyCategorySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("전체")){
            navText.add("관리자구매승인");
            navText.add("관리자구매반려");
        } else if (requestBody.get("navText").equals("승인")){
            navText.add("관리자구매승인");
        } else if (requestBody.get("navText").equals("반려")){
            navText.add("관리자구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuyCategorySearch(requestBody.get("category_num"),navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

}
