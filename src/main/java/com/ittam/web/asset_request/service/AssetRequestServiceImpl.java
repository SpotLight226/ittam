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

    @Override
    public ArrayList<ITAssetsVO> AssetRequestSearch(String inputText) {
        return assetRequestMapper.AssetRequestSearch(inputText);
    }


}
