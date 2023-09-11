package com.ittam.web.asset_request.service;

import com.ittam.web.command.ITAssetsVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface AssetRequestMapper {

    //IT 자산 목록 조회
    public List<ITAssetsVO> AssetAllList();

    // PC/노트북 자산 검색


    //IT 자산 목록 검색
    public ArrayList<ITAssetsVO> AssetRequestSearch(String inputText);


}
