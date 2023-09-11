package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface UserMapper {

    public ArrayList<UserVO> passwordFind(String email);
    public void UserPasswordReset(@Param("passwordReset")String passwordReset, @Param("emailInput")String emailInput);

}
