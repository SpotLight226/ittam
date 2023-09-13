package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserVO {

    private String user_id; // PK
    private String user_pw;
    private String user_name;
    private String user_email;
    private String user_depart;
    private String user_phone;
    private String user_address;
    private String user_auth;
    private LocalDate user_joindate;
    private String user_leave_yn;
    private LocalDate user_leavedate;
    private String role;

    // FK : 자산 연결을 위한 키
    private Integer assets_num;




}
