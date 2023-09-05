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
public class UserRequestVO {

    private Integer USERQ_NUM;
    private String USER_ID;
    private Integer CATEGORY_NUM;
    private String USERQ_TITLE;
    private LocalDate USERQ_REGDATE;
    private String USERQ_KIND;
    private String USERQ_COMMENT;
    private String USERQ_YN;
    private String USERQ_GRANTOR;
    private LocalDate USERQ_OKDATE;
    private Integer USERQ_COUNT;


}
