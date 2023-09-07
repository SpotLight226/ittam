package com.ittam.web.user_request.service;

import com.ittam.web.command.UserRequestVO;

import java.util.ArrayList;

public interface UserRequestService {

    public ArrayList<UserRequestVO> UserRequestList();
    public int UserRequestApprove(int userq_NUM);
    public int UserRequestreturn(int userq_NUM);
    public ArrayList<UserRequestVO> UserRequestSearch (String inputText);
    public ArrayList<UserRequestVO> UserRequestHandle();
    public ArrayList<UserRequestVO> UserRequestHandleSearch(String inputText, ArrayList<String> pageNav);
    public ArrayList<UserRequestVO> UserRequestNavSearch(ArrayList<String> navText);
}
