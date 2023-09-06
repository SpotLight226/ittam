package com.ittam.web.itassets.service;

import com.ittam.web.command.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("iTAssetsService")
public class ITAssetsServiceImp1 implements ITAssetsService{

    @Autowired
    private ITAssetsMapper iTAssetsMapper;

    @Override
    public List<ITAssetsVO> getITList() {

        return iTAssetsMapper.getITList();
    }

    @Override
    public int SWSpecInsert(Map<String, Object> requestData) {
        SWSpecVO vo = new SWSpecVO();
        vo.setSw_spec_seriel((String)requestData.get("sw_spec_seriel") );
        vo.setSw_spec_warranty((String) requestData.get("sw_spec_warranty"));
        vo.setSw_mfg((String) requestData.get("sw_mfg"));
        return iTAssetsMapper.SWSpecInsert(vo );
    }

    @Override
    public int ETCSpecInsert(Map<String, Object> requestData) {
        ETCSpecVO vo = new ETCSpecVO();
        //vo.setEtc_spec_siriel((String) requestData.get("etc_spec_siriel"));
        vo.setEtc_spec_warranty((String) requestData.get("etc_spec_warranty"));
        vo.setEtc_mfg((String) requestData.get("etc_mfg"));

        return iTAssetsMapper.ETCSpecInsert(vo);
    }

    @Override
    public int PCSpecInsert(Map<String, Object> requestData) {
        PCSpecVO vo = new PCSpecVO();
        vo.setSpec_cpu((String) requestData.get("spec_cpu"));
        vo.setSpec_ram((String) requestData.get("spec_ram"));
        vo.setSpec_mainboard((String) requestData.get("spec_mainboard"));
        vo.setSpec_power((String) requestData.get("spec_power"));
        vo.setSpec_gpu((String) requestData.get("spec_gpu"));
        vo.setSpec_hdd((String) requestData.get("spec_hdd"));
        vo.setSpec_ssd((String) requestData.get("spec_ssd"));
        vo.setSpec_ops((String) requestData.get("spec_ops"));
        vo.setSpec_mfg((String) requestData.get("spec_mfg"));
        vo.setSpec_seriel((String) requestData.get("spec_seriel"));
        vo.setSpec_warranty((String) requestData.get("spec_warranty"));

        return iTAssetsMapper.PCSpecInsert(vo);
    }

    @Override
    public int ServerSpecInsert(Map<String, Object> requestData) {
        ServerSpecVO vo = new ServerSpecVO();
        vo.setServer_mfg((String) requestData.get("server_mfg"));
        vo.setServer_spec_warranty((String) requestData.get("server_spec_warranty"));
        vo.setServer_capa((String) requestData.get("server_capa"));

        return iTAssetsMapper.ServerSpecInsert(vo);
    }

    @Override
    public int ITAssetsInsertSW(Map<String, Object> requestData) {
        ITAssetsVO vo = new ITAssetsVO();
        vo.setAssets_name((String) requestData.get("assets_name"));


        return iTAssetsMapper.ITAssetsInsertSW(vo);
    }

    @Override
    public int ITAssetsInsertETC(Map<String, Object> requestData) {
        ITAssetsVO vo = new ITAssetsVO();
        vo.setAssets_name((String) requestData.get("assets_name"));

        return iTAssetsMapper.ITAssetsInsertETC(vo);
    }

    @Override
    public int ITAssetsInsertPC(Map<String, Object> requestData) {
        ITAssetsVO vo = new ITAssetsVO();
        vo.setAssets_name((String) requestData.get("assets_name"));

        return iTAssetsMapper.ITAssetsInsertPC(vo);
    }

    @Override
    public int ITAssetsInsertServer(Map<String, Object> requestData) {
        ITAssetsVO vo = new ITAssetsVO();
        vo.setAssets_name((String) requestData.get("assets_name"));

        return iTAssetsMapper.ITAssetsInsertServer(vo);
    }

    @Override
    public void createTable() {
        iTAssetsMapper.createTable();
    }

    @Override
    public void deleteTable() {
        iTAssetsMapper.deleteTable();
    }


}
