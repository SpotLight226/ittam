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
    public ArrayList<UserRequestVO> UserRequestHandleSearch(String inputText, ArrayList<String> pageNav) {
        return userRequestMapper.UserRequestHandleSearch(inputText, pageNav);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestNavSearch(ArrayList<String> navText) {
        return userRequestMapper.UserRequestNavSearch(navText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestCategorySearch(String category_num, ArrayList<String> navText) {
        return userRequestMapper.UserRequestCategorySearch(category_num, navText);
    }


    /////////////////////////////// 관리자 구매 관련
    @Override
    public ArrayList<UserRequestVO> UserRequestBuyList() {
        return userRequestMapper.UserRequestBuyList();
    }

    @Override
    public int UserRequestBuyApprove(int userq_NUM) {
        return userRequestMapper.UserRequestBuyApprove(userq_NUM);
    }

    @Override
    public int UserRequestBuyReturn(int userq_NUM) {
        return userRequestMapper.UserRequestBuyReturn(userq_NUM);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuySearch(String inputText) {
        return userRequestMapper.UserRequestBuySearch(inputText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyHandlePage() {
        return userRequestMapper.UserRequestBuyHandlePage();
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyHandleSearch(String inputText, ArrayList<String> pageNav) {
        return userRequestMapper.UserRequestBuyHandleSearch(inputText, pageNav);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyNavSearch(ArrayList<String> navText) {
        return userRequestMapper.UserRequestBuyNavSearch(navText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyCategorySearch(String category_num, ArrayList<String> navText) {
        return userRequestMapper.UserRequestBuyCategorySearch(category_num, navText);
    }

}
