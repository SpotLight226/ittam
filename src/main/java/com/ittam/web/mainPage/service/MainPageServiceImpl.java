package com.ittam.web.mainPage.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockReturnVO;
import com.ittam.web.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("mainPageService")
public class MainPageServiceImpl implements MainPageService{

    @Autowired
    private MainPageMapper mainPageMapper;
    @Override
    public Integer getUsereqNum() {
        return mainPageMapper.getUsereqNum();

    }

    @Override
    public Integer getAdminOkNum() {
        return mainPageMapper.getAdminOkNum();
    }

    @Override
    public Integer getYetOkNum() {
        return mainPageMapper.getYetOkNum();
    }

    @Override
    public void registReturnReq(StockReturnVO vo) {
        mainPageMapper.registReturnReq(vo);
    }

    @Override
    public List<Map<Object, Object>> getReturnList() {
        List<Map<Object, Object>> list = mainPageMapper.getReturnList();
        return list;
    }

    @Override
    public UserVO getUserInfo(String user_id) {
        UserVO vo = mainPageMapper.getUserInfo(user_id);
        return vo;
    }

    @Override
    public void modifyProfile(UserVO vo) {
        mainPageMapper.modifyProfile(vo);
    }

    @Override
    public Integer getUserCnt_using(String user_id) {
        return mainPageMapper.getUserCnt_using(user_id);
    }

    @Override
    public Integer getUserCnt_exchange(String user_id) {
        return mainPageMapper.getUserCnt_exchange(user_id);
    }

    @Override
    public Integer getUserCnt_return(String user_id) {
        return mainPageMapper.getUserCnt_return(user_id);
    }

    @Override
    public List<Map<Object, Object>> getMyAssetList(String user_id) {
        return mainPageMapper.getMyAssetList(user_id);
    }

    @Override
    public void updateReturn_yn( Map<String, Object> map) {
//        StockReturnVO vo = new StockReturnVO();
//        vo.setAssets_num((int) map.get("assets_num"));
//        vo.setReturn_status((String) map.get("return_status"));
//        ITAssetsVO vo2 = new ITAssetsVO();
//        vo2.setAssets_num((int)map.get("assets_num"));

        mainPageMapper.updateReturn_yn(map);
    }

    @Override
    public void updateAssetUsing(Integer assets_num) {
        mainPageMapper.updateAssetUsing(assets_num);
    }

    @Override
    public void deleteCancelReq(Integer return_num) {
        mainPageMapper.deleteCancelReq(return_num);
    }
}
