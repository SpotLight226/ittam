package com.ittam.web.controller;

import com.ittam.web.command.UserVO;
import com.ittam.web.user.service.UserService;
import com.ittam.web.utill.MailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@Controller
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    // 사용자 목록
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/userList")
    public ResponseEntity<ArrayList<UserVO>> userList() {
        ArrayList<UserVO> list = userService.userList();
        return ResponseEntity.ok(list);
    }

    // 사용자 등록
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userRegist")
    public ResponseEntity<Integer> userRegist(@RequestBody UserVO userVO) {
        System.out.println("userVO = " + userVO);
        int data = userService.userRegist(userVO);

        System.out.println("data = " + data);

        if (data == 1) {
            return new ResponseEntity<>(data, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세정보
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userDetail")
    public ResponseEntity<UserVO> userDetail(@RequestBody Map<String, String> requestData) {

        try {
            UserVO vo = userService.userDetail(requestData.get("userId"));
            System.out.println("vo = " + vo);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 권한 변경
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userEdit")
    public ResponseEntity<String> userEdit(@RequestBody Map<String, String> requestData) {

        int result = userService.userEdit(requestData.get("targetId"), requestData.get("role"));


        if (result == 1) {
            return ResponseEntity.ok("권한이 변경되었습니다");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("권한 변경 중 오류가 발생하였습니다");
        }
    }

    // 사용자 퇴사 처리
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userRemove")
    public ResponseEntity<String> userRemove(@RequestBody Map<String, String> requestData) {

        int changeResult = 2;
        int removeResult = 2;

        String targetId = requestData.get("targetId");


        try {
            int result = userService.userRemove(targetId); // 사용자 삭제
            int userAssetCount = userService.userFindAsset(targetId); // 삭제된 사용자가 사용 중이던 자산 확인
            int userApprovalCount = userService.userFindApproval(targetId);
            int userRequestCount = userService.userFindRequest(targetId);
            int userReturnCount = userService.userFindReturn(targetId);

            if (result == 1) {
                // 삭제가 완료되고, 사용 중이던 자산이 있다면
                if (userAssetCount != 0) {
                    changeResult = userService.userAssetChange(targetId); // ItAssets 에서 사용자와 상태를 변경한 결과
                }
                // 각 신청 테이블에 삭제된 사용자의 신청이 하나라도 있다면
                if (userApprovalCount != 0 || userRequestCount != 0 || userReturnCount != 0) {
                    removeResult = userService.removeAll(targetId);
                }
                // 위의 각 처리를 다 통과 했다면 퇴사 처리 메세지를 담아서 반환
                if (changeResult != 2 && removeResult != 2) {
                    System.out.println("result = " + result);
                    System.out.println("removeResult = " + removeResult);
                    System.out.println("changeResult = " + changeResult);

                }
            }
            String msg = "퇴사 처리되었습니다";
            return ResponseEntity.ok(msg);

        } catch (Exception e) {
            String msg = "퇴사 처리에 실패했습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
        }
    }

    //////////////검색
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/userSearch")
    public ResponseEntity<ArrayList<UserVO>> userSearch(@RequestParam("value") String value,
                                                        @RequestParam("option") String option) {

        ArrayList<UserVO> search = userService.getSearch(value, option);

        return ResponseEntity.ok(search);
    }


    @PostMapping("/passwordFind")
    public ResponseEntity<ArrayList<UserVO>> PasswordFind(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.toString());

        try {
            ArrayList<UserVO> vo = userService.passwordFind(requestBody.get("emailInput"));

            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserVO>());
        }

    }

    @PostMapping("/authSend")
    public ResponseEntity<Integer> authSend(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.get("emailInput"));
        MailSend send = new MailSend();
        send.setAuthNum((int) (Math.random() * 899999) + 100000);
        String result = send.welcomeMailSend(requestBody.get("emailInput"), send.getAuthNum());
        System.out.println(result);
        return ResponseEntity.ok(send.getAuthNum());
    }

    @PostMapping("/passwordModify")
    public ResponseEntity<String> passwordModify(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.toString());
        try {
            userService.UserPasswordReset(requestBody.get("passwordReset"), requestBody.get("emailInput"));
            return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("비밀번호 변경 중 오류가 발생했습니다.");
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Map<String, String> request) {
//        System.out.println(request.toString());
//
//
//        try {
//            return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("비밀번호 변경 중 오류가 발생했습니다.");
//        }
//
//
//    }

}
