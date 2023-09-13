package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface UserMapper {

    // 사용자 목록
    ArrayList<UserVO> userList();

    //사용자 등록
    int userRegist(UserVO vo);

    public ArrayList<UserVO> passwordFind(String email);
    public void UserPasswordReset(@Param("passwordReset")String passwordReset, @Param("emailInput")String emailInput);
    public UserVO login (String username);
}
