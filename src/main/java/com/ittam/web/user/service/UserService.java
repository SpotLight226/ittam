package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;

import java.util.ArrayList;

public interface UserService {
    public ArrayList<UserVO> passwordFind(String email);
    public void UserPasswordReset(String passwordReset, String emailInput);

}
