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
import java.util.Random;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "http://localhost:3000")
public class Stock_ApprovalController {

    @Autowired
    private Stock_approvalService stock_approvalService;

    private String randomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder(length);
        Random rd = new Random();

        for(int i = 0; i< length; i++) {
            sb.append(characters.charAt(rd.nextInt(characters.length())));
        }

        return sb.toString();
    }

    @GetMapping("/getStockApprovalList")
    public ResponseEntity<List<StockApprovalVO>> getStockApprovalList() {
        List<StockApprovalVO> data = stock_approvalService.getStockApprovalList();

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/updateITStatus")
    public ResponseEntity<Integer> updateITStatus(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> itemData = (Map<String, Object>) requestData.get("item");
        System.out.println(itemData.toString());
        ITAssetsVO vo = new ITAssetsVO();
        StockApprovalVO vo2 = new StockApprovalVO();
        int data = 0;
        if("판매".equals((String) itemData.get("appro_kind")) || "수리".equals((String) itemData.get("appro_kind"))) {
            vo2.setAppro_num((int)itemData.get("appro_num"));
            stock_approvalService.ApprovY(vo2);
            vo.setAssets_status((String) itemData.get("appro_kind"));
            vo.setAssets_num((int) itemData.get("assets_num"));
            data = stock_approvalService.updateITStatus(vo);
        }else if("구매".equals((String) itemData.get("appro_kind"))) {
            vo2.setAppro_num((int)itemData.get("appro_num"));
            stock_approvalService.ApprovY(vo2);
            stock_approvalService.updateList(vo);

        }


        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/statusUpdate")
    public ResponseEntity<Integer> statusUpdate(@RequestBody Map<String, Object> requestData ) {
        System.out.println(requestData.toString());
        StockApprovalVO vo = new StockApprovalVO();
        vo.setUsername((String) requestData.get("username"));
        vo.setAssets_num((int) requestData.get("assets_num"));
        vo.setCategory_num((int) requestData.get("category_num"));
        vo.setAppro_title((String) requestData.get("appro_title"));
        vo.setAsset_seriel(randomString(4) + "-" + randomString(4) + "-" + randomString(4));
        vo.setAppro_comment((String) requestData.get("appro_comment"));
        vo.setAppro_kind((String) requestData.get("assets_status"));

        int data = stock_approvalService.statusUpdate(vo);

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/approvalN")
    public ResponseEntity<Integer> approvalN(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> itemData = (Map<String, Object>) requestData.get("item");
        System.out.println("react에서 가져온데이터: "+requestData.toString());
        System.out.println("컨트롤러에서 걸러낸 데이터: " +itemData.toString());
        StockApprovalVO vo = new StockApprovalVO();
        int data = 0;
        vo.setAppro_num((int)itemData.get("appro_num"));
        stock_approvalService.ApprovY(vo);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
