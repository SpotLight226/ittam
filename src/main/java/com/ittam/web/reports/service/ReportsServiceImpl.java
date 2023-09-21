package com.ittam.web.reports.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("reportsService")
public class ReportsServiceImpl implements ReportsService{

    @Autowired
    private ReportsMapper reportsMapper;


    @Override
    public Integer allUsersNum() {
        return reportsMapper.allUsersNum();
    }

    @Override
    public Integer allAssetsNum() {
        return reportsMapper.allAssetsNum();
    }

    @Override
    public Integer usingAssetsNum() {
        return reportsMapper.usingAssetsNum();
    }


//////////////////////////////////////////////////////////
    @Override
    public Integer getDesignNum() {
        return reportsMapper.getDesignNum();
    }

    @Override
    public Integer getDevNum() {
        return reportsMapper.getDevNum();
    }

    @Override
    public Integer getEngNum() {
        return reportsMapper.getEngNum();
    }

    @Override
    public Integer getFinNum() {
        return reportsMapper.getFinNum();
    }

    @Override
    public Integer getRndNum() {
        return reportsMapper.getRndNum();
    }

    @Override
    public Integer getPurNum() {
        return reportsMapper.getPurNum();
    }

    @Override
    public Integer getSalesNum() {
        return reportsMapper.getSalesNum();
    }

    @Override
    public Integer getMarkNum() {
        return reportsMapper.getMarkNum();
    }

    @Override
    public Integer getHrNum() {
        return reportsMapper.getHrNum();
    }

    @Override
    public Integer getProdNum() {
        return reportsMapper.getProdNum();
    }

///////////////////////////////////////////////////////////
    @Override
    public Map<String, Integer> getAssetStickNum() {
        Map<String, Integer> map = new HashMap<>();
        map.put("pc6",reportsMapper.getAssetStickNum(6, 1));
        map.put("sw6",reportsMapper.getAssetStickNum(6, 2));
        map.put("etc6", reportsMapper.getAssetStickNum(6, 3));
        map.put("ser6", reportsMapper.getAssetStickNum(6, 4));
        map.put("pc5", reportsMapper.getAssetStickNum(5, 1));
        map.put("sw5", reportsMapper.getAssetStickNum(5, 2));
        map.put("etc5", reportsMapper.getAssetStickNum(5, 3));
        map.put("ser5", reportsMapper.getAssetStickNum(5, 4));
        map.put("pc4", reportsMapper.getAssetStickNum(4, 1));
        map.put("sw4", reportsMapper.getAssetStickNum(4, 2));
        map.put("etc4", reportsMapper.getAssetStickNum(4, 3));
        map.put("ser4", reportsMapper.getAssetStickNum(4, 4));
        map.put("pc3", reportsMapper.getAssetStickNum(3, 1));
        map.put("sw3", reportsMapper.getAssetStickNum(3, 2));
        map.put("etc3", reportsMapper.getAssetStickNum(3, 3));
        map.put("ser3", reportsMapper.getAssetStickNum(3, 4));
        map.put("pc2", reportsMapper.getAssetStickNum(2, 1));
        map.put("sw2", reportsMapper.getAssetStickNum(2, 2));
        map.put("etc2", reportsMapper.getAssetStickNum(2, 3));
        map.put("ser2", reportsMapper.getAssetStickNum(2, 4));
        map.put("pc1", reportsMapper.getAssetStickNum(1, 1));
        map.put("sw1", reportsMapper.getAssetStickNum(1, 2));
        map.put("etc1", reportsMapper.getAssetStickNum(1, 3));
        map.put("ser1", reportsMapper.getAssetStickNum(1, 4));
        map.put("pc0", reportsMapper.getAssetStickNum(0, 1));
        map.put("sw0", reportsMapper.getAssetStickNum(0, 2));
        map.put("etc0", reportsMapper.getAssetStickNum(0, 3));
        map.put("ser0", reportsMapper.getAssetStickNum(0, 4));

        return map;
    }

    @Override
    public Map<String, Integer> getCPUNum() {
        Map<String, Integer> map = new HashMap<>();
        map.put("Intel", reportsMapper.getCPUNum("Intel"));
        map.put("AMD", reportsMapper.getCPUNum("AMD"));
//        map.put("M1", reportsMapper.getCPUNum("M1"));
//        map.put("M2", reportsMapper.getCPUNum("M2"));
        return map;
    }

    @Override
    public Map<String, Integer> getGPUNum() {
        Map<String, Integer> map = new HashMap<>();
        map.put("NVIDIA", reportsMapper.getGPUNum("NVIDIA"));
        map.put("AMD", reportsMapper.getGPUNum("AMD"));
        map.put("Intel", reportsMapper.getGPUNum("Intel"));
        return map;
    }

    @Override
    public Map<String, Integer> getMFGNum() {
        return null;
    }

    @Override
    public Map<Object, Object> getRadialBarNum() {
        Map<Object, Object> map = new HashMap<>();
        map.put("all", reportsMapper.getAssetsAllNum());
        map.put("using", reportsMapper.getAssetsUsingNum());
        return map;
    }
}
