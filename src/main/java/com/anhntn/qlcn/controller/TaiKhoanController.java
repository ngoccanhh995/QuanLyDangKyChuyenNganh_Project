package com.anhntn.qlcn.controller;

import com.anhntn.qlcn.model.SinhVien;
import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.service.LopService;
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
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;
    @Autowired
    private LopService lopService;

    public static final String URL_TK = "taikhoan";
    public List<String> COLUMNS_TK = new ArrayList<>(Arrays.asList(
            "Mã tài khoản", "Tên đăng nhập", "Trạng thái", "Admin"
    ));
    public static final String URL_CQ = "capquyenadmin";
    public List<String> COLUMNS_CQ = new ArrayList<>(Arrays.asList(
            "Mã tài khoản", "Tên đăng nhập", "Trạng thái", "Admin"
    ));

    @GetMapping("/taikhoan/findByMaTK")
    public ResponseEntity<TaiKhoan> findByMaTK(@RequestParam Long maTK){
        TaiKhoan taiKhoan = taiKhoanService.findByMaTK(maTK);
        return new ResponseEntity<>(taiKhoan, HttpStatus.OK);
    }

    @PutMapping("/taikhoan/editMatKhau")
    public ResponseEntity<TaiKhoan> editSinhVien(@RequestBody TaiKhoan taiKhoan){
        TaiKhoan taiKhoan1 = taiKhoanService.findByMaTK(taiKhoan.getMaTK());
        taiKhoan1.setMatKhau(taiKhoan.getMatKhau());
        return new ResponseEntity<>(taiKhoanService.save(taiKhoan1), HttpStatus.OK);
    }

    @GetMapping("/taikhoan")
    public ModelAndView taikhoan() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        modelAndView.addObject("title_web","Quản lý tài khoản");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("columns", COLUMNS_TK);
        modelAndView.addObject("url", URL_TK);
        modelAndView.addObject("listLop", lopService.findAll());
        modelAndView.setViewName("home");
        return modelAndView;
    }

    @GetMapping("/listTaiKhoan")
    public ResponseEntity<List<TaiKhoan>> listTaiKhoan(){
        List<TaiKhoan> taiKhoans = taiKhoanService.findAll();
        if (taiKhoans.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(taiKhoans, HttpStatus.OK);
    }

    @GetMapping("/taikhoan/validateTendn")
    public ResponseEntity<Boolean> validateTendn(@RequestParam String tenDN){
        boolean validTendn = taiKhoanService.validateTenDN(tenDN);
        return validTendn ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.OK);
    }

    @PostMapping("/taikhoan/add")
    public ResponseEntity<TaiKhoan> createTaiKhoan(@RequestBody TaiKhoan taiKhoan){
        return new ResponseEntity<>(taiKhoanService.save(taiKhoan), HttpStatus.OK);
    }

    @PutMapping("/taikhoan/edit")
    public ResponseEntity<TaiKhoan> editTaiKhoan(@RequestBody TaiKhoan taiKhoan){
        return new ResponseEntity<>(taiKhoanService.save(taiKhoan), HttpStatus.OK);
    }

    @PutMapping("/taikhoan/edit/{maTK}")
    public ResponseEntity<HttpStatus> restoreTrangThaiTaiKhoan(@PathVariable Long maTK){
        TaiKhoan taiKhoan = taiKhoanService.findByMaTK(maTK);
        if (taiKhoan != null) {
            taiKhoan.setTrangThai("ACTIVE");
            taiKhoanService.save(taiKhoan);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/taikhoan/delete/{maTK}")
    public ResponseEntity<String> deleteTaiKhoan(@PathVariable Long maTK){
        TaiKhoan taiKhoan = taiKhoanService.findByMaTK(maTK);
        if (taiKhoan != null) {
            try {
                taiKhoan.setTrangThai("INACTIVE");
                taiKhoanService.save(taiKhoan);
                return new ResponseEntity<>("success", HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>("error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>("not_exists", HttpStatus.OK);
    }

    @GetMapping("/capquyenadmin")
    public ModelAndView capquyenadmin() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        modelAndView.addObject("title_web","Cấp quyền admin");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("columns", COLUMNS_CQ);
        modelAndView.addObject("url", URL_CQ);
        modelAndView.setViewName("home");
        return modelAndView;
    }

    @GetMapping("/capquyenadmin/listTaiKhoan")
    public ResponseEntity<List<TaiKhoan>> listAllAccount(){
        List<TaiKhoan> taiKhoans = taiKhoanService.findByTrangThai("ACTIVE");
        if (taiKhoans.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(taiKhoans, HttpStatus.OK);
    }

    @PutMapping("/capquyenadmin/editAssign/{maTK}")
    public ResponseEntity<HttpStatus> assignAdmin(@PathVariable Long maTK){
        TaiKhoan taiKhoan = taiKhoanService.findByMaTK(maTK);
        if (taiKhoan != null) {
            taiKhoan.setAdmin("ADMIN");
            taiKhoanService.save(taiKhoan);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/capquyenadmin/editCancelAssign/{maTK}")
    public ResponseEntity<HttpStatus> cancelAdmin(@PathVariable Long maTK){
        TaiKhoan taiKhoan = taiKhoanService.findByMaTK(maTK);
        if (taiKhoan != null) {
            taiKhoan.setAdmin("SINHVIEN");
            taiKhoanService.save(taiKhoan);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }



}
