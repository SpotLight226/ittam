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
    public UserVO getUserInfo(String username) {
        UserVO vo = mainPageMapper.getUserInfo(username);
        return vo;
    }

    @Override
    public void modifyProfile(UserVO vo) {
        mainPageMapper.modifyProfile(vo);
    }

    @Override
    public Integer getUserCnt_using(String username) {
        return mainPageMapper.getUserCnt_using(username);
    }

    @Override
    public Integer getUserCnt_exchange(String username) {
        return mainPageMapper.getUserCnt_exchange(username);
    }

    @Override
    public Integer getUserCnt_return(String username) {
        return mainPageMapper.getUserCnt_return(username);
    }

    @Override
    public List<Map<Object, Object>> getMyAssetList(String username) {
        return mainPageMapper.getMyAssetList(username);
    }

    @Override
    public void updateReturn_yn( Map<String, Object> map) {

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

    @Override
    public Map<Object, Object> getAssetChartAllNum() {

        return mainPageMapper.getAssetChartAllNum();
    }

    @Override
    public Map<Object, Object> getAssetChartUsingNum() {
        return mainPageMapper.getAssetChartUsingNum();
    }

    @Override
    public Map<Object, Object> getAssetChartDisposeNum() {
        return mainPageMapper.getAssetChartDisposeNum();
    }
}
