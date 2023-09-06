package com.ittam.web.controller;

import com.ittam.web.command.*;
import com.ittam.web.itassets.service.ITAssetsMapper;
import com.ittam.web.itassets.service.ITAssetsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/assets")
@CrossOrigin(origins = "http://localhost:3000")
public class ITAssetsController {
    @Autowired
    private ITAssetsService iTAssetsService;


    @GetMapping("/getITList")
    public ResponseEntity<List<ITAssetsVO>> getITList() {
        List<ITAssetsVO> data = iTAssetsService.getITList();

        return new ResponseEntity<>(data,HttpStatus.OK);
    }

    @PostMapping("/specInsert")
    public ResponseEntity<Integer> specInsert(@RequestBody Map<String, Object> requestData) {
        System.out.println("Received: " + requestData);
        int data = 0;

        iTAssetsService.createTable();
        if("소프트웨어".equals(requestData.get("assets_name"))) {
            data = iTAssetsService.SWSpecInsert(requestData);
            iTAssetsService.ITAssetsInsertSW(requestData);
        }else if ("기타".equals(requestData.get("assets_name"))) {
            data = iTAssetsService.ETCSpecInsert(requestData);
            iTAssetsService.ITAssetsInsertETC(requestData);
        }else if("PC".equals(requestData.get("assets_name"))){
            data = iTAssetsService.PCSpecInsert(requestData);
            iTAssetsService.ITAssetsInsertPC(requestData);
        }else if("서버".equals(requestData.get("assets_name"))){
            data = iTAssetsService.ServerSpecInsert(requestData);
            iTAssetsService.ITAssetsInsertServer(requestData);
        }
        iTAssetsService.deleteTable();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
