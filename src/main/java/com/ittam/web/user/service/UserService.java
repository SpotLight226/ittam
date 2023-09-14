package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;

public interface UserService {

    // 사용자 목록
    ArrayList<UserVO> userList();
    
    //사용자 등록
    int userRegist(UserVO vo);
    
    // 비밀번호 찾기
    public ArrayList<UserVO> passwordFind(String email);

    //비밀번호 리셋
    public void UserPasswordReset(String passwordReset, String emailInput);

}
