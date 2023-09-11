package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;


    @Override
    public ArrayList<UserVO> passwordFind(String email) {
        return userMapper.passwordFind(email);
    }

    @Override
    public void UserPasswordReset(String passwordReset, String emailInput) {
        System.out.println("서비스 : " + passwordReset);
        System.out.println("서비스 : " + emailInput);
        userMapper.UserPasswordReset(passwordReset, emailInput);
    }


}
