package com.ittam.web.controller;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import com.ittam.web.stock_approval.service.Stock_approvalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "http://localhost:3000")
public class Stock_ApprovalController {

    @Autowired
    private Stock_approvalService stock_approvalService;

    @GetMapping("/getStockApprovalList")
    public ResponseEntity<List<StockApprovalVO>> getStockApprovalList() {
        List<StockApprovalVO> data = stock_approvalService.getStockApprovalList();

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/updateITStatus")
    public ResponseEntity<Integer> updateITStatus(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> itemData = (Map<String, Object>) requestData.get("item");
        StockApprovalVO vo2 = new StockApprovalVO();
        vo2.setAppro_num((int)itemData.get("appro_num"));
        stock_approvalService.ApprovY(vo2);
        ITAssetsVO vo = new ITAssetsVO();
        vo.setAssets_status((String) itemData.get("appro_kind"));
        vo.setAssets_num((int) itemData.get("assets_num"));
        System.out.println(requestData.toString());
        int data = stock_approvalService.updateITStatus(vo);

        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
