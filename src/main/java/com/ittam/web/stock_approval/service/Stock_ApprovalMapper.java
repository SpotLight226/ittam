package com.ittam.web.stock_approval.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Stock_ApprovalMapper {
    public List<StockApprovalVO> getStockApprovalList();

    public int updateITStatus(ITAssetsVO vo);

    public void ApprovY(StockApprovalVO vo2);

    public int statusUpdate(StockApprovalVO vo);

    public int updateList(ITAssetsVO vo);

}
