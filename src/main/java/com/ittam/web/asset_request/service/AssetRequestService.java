package com.ittam.web.asset_request.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.UserRequestVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public interface AssetRequestService {

    //IT 자산 목록 리스트
    public List<ITAssetsVO> AssetAllList();

    // PC/노트북 자산 목록 조회

    //IT 자산 목록 검색
    public ArrayList<ITAssetsVO> AssetRequestSearch (String inputText);


}
