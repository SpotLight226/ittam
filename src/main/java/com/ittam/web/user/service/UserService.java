package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;

public interface UserService {

    // 사용자 목록
    ArrayList<UserVO> userList();
    
    //사용자 등록
    int userRegist(UserVO vo);

    // 사용자 상세정보
    UserVO userDetail(String userId);

    // 사용자 권한 변경
    int userEdit(String targetId, String newRole);

    // 비밀번호 찾기
    public ArrayList<UserVO> passwordFind(String email);

    //비밀번호 리셋
    public void UserPasswordReset(String passwordReset, String emailInput);

}
