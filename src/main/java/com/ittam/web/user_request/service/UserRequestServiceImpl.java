package com.ittam.web.user_request.service;

import com.ittam.web.command.UserRequestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("userRequestService")
public class UserRequestServiceImpl implements UserRequestService{

    @Autowired
    private UserRequestMapper userRequestMapper;


    @Override
    public ArrayList<UserRequestVO> UserRequestList() {
        return userRequestMapper.UserRequestList();
    }

    @Override
    public int UserRequestApprove(int userq_NUM) {
        System.out.println(userq_NUM);
        return userRequestMapper.UserRequestApprove(userq_NUM);
    }

    @Override
    public int UserRequestreturn(int userq_NUM) {
        return userRequestMapper.UserRequestreturn(userq_NUM);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestSearch(String inputText) {
        return userRequestMapper.UserRequestSearch(inputText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestHandle() {
        return userRequestMapper.UserRequestHandle();
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestHandleSearch(String inputText) {
        return userRequestMapper.UserRequestHandleSearch(inputText);
    }


}
