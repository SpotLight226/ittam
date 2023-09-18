package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    // 사용자 목록
    @Override
    public ArrayList<UserVO> userList() {
        return userMapper.userList();
    }
    
    // 사용자 등록
    @Override
    public int userRegist(UserVO vo) {

        return userMapper.userRegist(vo);
    }

    // 사용자 상세 정보
    @Override
    public UserVO userDetail(String userId) {
        return userMapper.userDetail(userId);
    }

    // 사용자 권한 변경


    @Override
    public int userEdit(String targetId, String newRole) {
        return userMapper.userEdit(targetId, newRole);
    }

    @Override
    public ArrayList<UserVO> passwordFind(String email) {
        return userMapper.passwordFind(email);
    }

    @Override
    public void UserPasswordReset(String passwordReset, String emailInput) {
        String encryptedPassword = passwordEncoder.encode(passwordReset);

        System.out.println("서비스 : " + passwordReset);
        System.out.println("서비스 : " + emailInput);
        userMapper.UserPasswordReset(encryptedPassword, emailInput);
    }


}
