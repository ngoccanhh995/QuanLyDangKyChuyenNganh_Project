package com.anhntn.qlcn.controller;

import com.anhntn.qlcn.model.Khoa;
import com.anhntn.qlcn.model.Lop;
import com.anhntn.qlcn.model.SinhVien;
import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class SinhVienController {

    @Autowired
    private TaiKhoanService taiKhoanService;
    @Autowired
    private SinhVienService sinhVienService;
    @Autowired
    private LopService lopService;
    @Autowired
    private KhoaService khoaService;

    @Autowired
    private ChuyenNganhService chuyenNganhService;

    public List<String> COLUMNS_DKCN = new ArrayList<>(Arrays.asList(
            "ID chuyên ngành", "Mã Khoa", "Mã Chuyên ngành", "Tên chuyên ngành", "Mô tả"
    ));
    public List<String> COLUMNS_TTDK = new ArrayList<>(Arrays.asList(
            "Mã thông tin đăng kí", "Mã sinh viên", "Thứ tự mã chuyên ngành", "Thời gian đăng kí"
    ));

    @GetMapping("/thongtincanhan")
    public ModelAndView thongtincanhan(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        SinhVien sinhVien = sinhVienService.findByMaTK(taiKhoan.getMaTK());
        Lop lop = lopService.findByMaLop(sinhVien.getMaLop());
        Khoa khoa = khoaService.findByMaKhoa(lop.getMaKhoa());
        modelAndView.addObject("title_web","Thông tin cá nhân");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("sinhVien", sinhVien);
        modelAndView.addObject("khoa", khoa);
        modelAndView.addObject("lop", lop);
        modelAndView.addObject("url", "thongtincanhan");
        modelAndView.setViewName("home");
        return modelAndView;
    }

    @GetMapping("/doimatkhau")
    public ModelAndView doimatkhau(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        modelAndView.addObject("title_web","Đổi mật khẩu");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("url", "doimatkhau");
        modelAndView.setViewName("home");
        return modelAndView;
    }

    @GetMapping("/dangkichuyennganh")
    public ModelAndView dangkichuyennganh(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        SinhVien sinhVien = sinhVienService.findByMaTK(taiKhoan.getMaTK());
        Lop lop = lopService.findByMaLop(sinhVien.getMaLop());
        Khoa khoa = khoaService.findByMaKhoa(lop.getMaKhoa());
        modelAndView.addObject("title_web","Đăng kí chuyên ngành");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("maSVInit", sinhVien.getMaSV());
        modelAndView.addObject("columns", COLUMNS_DKCN);
        modelAndView.addObject("columns_ttdk", COLUMNS_TTDK);
        modelAndView.addObject("maKhoa", khoa.getMaKhoa());
        modelAndView.addObject("url", "dangkichuyennganh");
        modelAndView.setViewName("home");
        return modelAndView;
    }

    @GetMapping("/sinhvien/findByMaSV")
    public ResponseEntity<SinhVien> findByMaSV(@RequestParam Long maSV){
        SinhVien sinhVien = sinhVienService.findByMaSV(maSV);
        return new ResponseEntity<>(sinhVien, HttpStatus.OK);
    }

    @PutMapping("/sinhvien/edit")
    public ResponseEntity<SinhVien> editSinhVien(@RequestBody SinhVien sinhVien){
        SinhVien sinhVien1 = sinhVienService.findByMaSV(sinhVien.getMaSV());
        sinhVien1.setTenSV(sinhVien.getTenSV());
        sinhVien1.setNienKhoa(sinhVien.getNienKhoa());
        sinhVien1.setNgaySinh(sinhVien.getNgaySinh());
        return new ResponseEntity<>(sinhVienService.save(sinhVien1), HttpStatus.OK);
    }

    @GetMapping("/sinhvien/validateMaTK")
    public ResponseEntity<Boolean> validateMaTK(@RequestParam Long maTK){
        boolean validateMaSV = sinhVienService.validateMaTK(maTK);
        return validateMaSV ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.OK);
    }

    @GetMapping("/sinhvien/validateMaSV")
    public ResponseEntity<Boolean> validateMaSV(@RequestParam Long maSV){
        boolean validateMaSV = sinhVienService.validateMaSV(maSV);
        return validateMaSV ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.OK);
    }

    @PostMapping("/sinhvien/add")
    public ResponseEntity<SinhVien> createSinhVien(@RequestBody SinhVien sinhVien){
        return new ResponseEntity<>(sinhVienService.save(sinhVien), HttpStatus.OK);
    }

    @GetMapping("/sinhvien/findByMaTK")
    public ResponseEntity<SinhVien> findByMaTK(@RequestParam Long maTK){
        SinhVien sinhVien = sinhVienService.findByMaTK(maTK);
        return new ResponseEntity<>(sinhVien, HttpStatus.OK);
    }

}
