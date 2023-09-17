package com.ittam.web.stock_approval.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("stock_ApprovalService")
public class Stock_approvalServiceImp1 implements Stock_approvalService{

    @Autowired
    private Stock_ApprovalMapper stockApprovalMapper;

    @Override
    public List<StockApprovalVO> getStockApprovalList() {
        return stockApprovalMapper.getStockApprovalList();
    }

    @Override
    public int updateITStatus(ITAssetsVO vo) {


        return stockApprovalMapper.updateITStatus(vo);
    }

    @Override
    public void ApprovY(StockApprovalVO vo2) {

        stockApprovalMapper.ApprovY(vo2);
    }

    @Override
    public int statusUpdate(StockApprovalVO vo) {
        return stockApprovalMapper.statusUpdate(vo);
    }

    @Override
    public int updateList(ITAssetsVO vo) {
        return stockApprovalMapper.updateList(vo);
    }
}
