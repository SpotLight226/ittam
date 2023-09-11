package com.ittam.web.controller;


import com.ittam.web.asset_request.service.AssetRequestService;
import com.ittam.web.command.ITAssetsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/AssetRequest")
public class Asset_RequestController {

    @Autowired
    @Qualifier("assetRequestService")
    private AssetRequestService assetRequestService;

    //자산 목록 조회
    @GetMapping("/AssetRequestList")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<ITAssetsVO>> AssetAllList(){
        List<ITAssetsVO> data = assetRequestService.AssetAllList();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    //자산 목록 검색
    @PostMapping("/AssetRequestSearch")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ArrayList<ITAssetsVO>> AssetRequestSearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try{
            ArrayList<ITAssetsVO> data = assetRequestService.AssetRequestSearch(requestBody.get("inputText"));
            return ResponseEntity.ok(data);
        } catch (Exception e){
            String errorMessage = "오류가 있습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<ITAssetsVO>());
        }
    }




}
