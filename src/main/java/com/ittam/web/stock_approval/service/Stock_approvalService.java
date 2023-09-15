package com.ittam.web.stock_approval.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface Stock_approvalService {
    public List<StockApprovalVO> getStockApprovalList();

    public int updateITStatus(ITAssetsVO vo);

    public void ApprovY(StockApprovalVO vo2);

    public int statusUpdate(StockApprovalVO vo);
}
