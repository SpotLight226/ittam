package com.ittam.web.asset_request.service;

import com.ittam.web.command.ITAssetsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("assetRequestService")
public class AssetRequestServiceImpl implements AssetRequestService{

    @Autowired
    AssetRequestMapper assetRequestMapper;

    //IT 자산 목록 조회
    @Override
    public List<ITAssetsVO> AssetAllList() {
        return assetRequestMapper.AssetAllList();
    }

    //PC
    @Override
    public List<ITAssetsVO> AssetRequestListPC() {
        return assetRequestMapper.AssetRequestListPC();
    }

    //SW
    @Override
    public List<ITAssetsVO> AssetRequestListSW() {
        return assetRequestMapper.AssetRequestListSW();
    }

    //SV
    @Override
    public List<ITAssetsVO> AssetRequestListSV() {
        return assetRequestMapper.AssetRequestListSV();
    }

    //ETC
    @Override
    public List<ITAssetsVO> AssetRequestListETC() {
        return assetRequestMapper.AssetRequestListETC();
    }

    //검색
    @Override
    public ArrayList<ITAssetsVO> AssetRequestSearch(String inputText) {
        return assetRequestMapper.AssetRequestSearch(inputText);
    }

    // 카테고리별 검색
    @Override
    public ArrayList<ITAssetsVO> AssetRequestSearchPC(String inputText) {
        return assetRequestMapper.AssetRequestSearchPC(inputText);
    }

    @Override
    public ArrayList<ITAssetsVO> AssetRequestSearchSW(String inputText) {
        return assetRequestMapper.AssetRequestSearchSW(inputText);
    }

    @Override
    public ArrayList<ITAssetsVO> AssetRequestSearchSV(String inputText) {
        return assetRequestMapper.AssetRequestSearchSV(inputText);
    }

    @Override
    public ArrayList<ITAssetsVO> AssetRequestSearchETC(String inputText) {
        return assetRequestMapper.AssetRequestSearchETC(inputText);
    }


}
