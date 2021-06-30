package com.anhntn.qlcn.controller;

import com.anhntn.qlcn.model.ChuyenNganh;
import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.repository.ChuyenNganhRepository;
import com.anhntn.qlcn.service.ChuyenNganhService;
import com.anhntn.qlcn.service.KhoaService;
import com.anhntn.qlcn.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class ChuyenNganhController {

    @Autowired
    private ChuyenNganhService chuyenNganhService;

    @Autowired
    private KhoaService khoaService;

    @Autowired
    private TaiKhoanService taiKhoanService;

    public static final String URL = "chuyennganh";
    public List<String> COLUMNS = new ArrayList<>(Arrays.asList(
            "ID chuyên ngành", "Mã chuyên ngành", "Chuyên ngành", "Mã khoa", "Mô tả", "Ghi chú"
    ));

    @GetMapping("/chuyennganh")
    public ModelAndView chuyennganh() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        modelAndView.addObject("title_web","Quản lý chuyên ngành");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("columns", COLUMNS);
        modelAndView.addObject("url", URL);
        modelAndView.addObject("listKhoa", khoaService.findAll());
        modelAndView.setViewName("home");
        return modelAndView;
    }
//xuất ra danh sách
    @GetMapping("/chuyennganh/listChuyenNganh")
    public ResponseEntity<List<ChuyenNganh>> listAllAccount(){
        List<ChuyenNganh> chuyenNganhs = chuyenNganhService.findAll();
        return new ResponseEntity<>(chuyenNganhs, HttpStatus.OK);
    }
    // truy vấn chuyenNganh đã tồn tại hay chưa
    @GetMapping("/chuyennganh/validateChuyennganh")
    public ResponseEntity<Boolean> validateChuyennganh(@RequestParam String chuyenNganh){
        boolean validChuyennganh = chuyenNganhService.validateChuyennganh(chuyenNganh);
        return validChuyennganh ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.OK);
    }
// truy vấn maCn đã tồn tại hay chưa
    @GetMapping("/chuyennganh/validateMaCN")
    public ResponseEntity<Boolean> validateMaCN(@RequestParam String maCN){
        boolean validMaCN = chuyenNganhService.validateMaCN(maCN);
        return validMaCN ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.OK);
    }

    @PostMapping("/chuyennganh/add")
    public ResponseEntity<ChuyenNganh> createChuyenNganh(@RequestBody ChuyenNganh chuyenNganh){
        return new ResponseEntity<>(chuyenNganhService.save(chuyenNganh), HttpStatus.OK);
    }

    @PutMapping("/chuyennganh/edit")
    public ResponseEntity<ChuyenNganh> editChuyenNganh(@RequestBody ChuyenNganh chuyenNganh){
        return new ResponseEntity<>(chuyenNganhService.save(chuyenNganh), HttpStatus.OK);
    }

    @DeleteMapping("/chuyennganh/delete/{idCN}")
    public ResponseEntity<HttpStatus> deleteChuyenNganh(@PathVariable Long idCN){
        ChuyenNganh chuyenNganh = chuyenNganhService.findByIdCN(idCN);
        chuyenNganhService.deleteTaiKhoan(chuyenNganh);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/chuyennganh/findByMaKhoa")
    public ResponseEntity<List<ChuyenNganh>> findByMaKhoa(@RequestParam Long maKhoa){
        List<ChuyenNganh> chuyenNganh = chuyenNganhService.findByMaKhoa(maKhoa);
        return new ResponseEntity<>(chuyenNganh, HttpStatus.OK);
    }
}
