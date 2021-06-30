package com.anhntn.qlcn.controller;

import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.model.ThoiGianDangKi;
import com.anhntn.qlcn.service.TaiKhoanService;
import com.anhntn.qlcn.service.ThoiGianDangKiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class ThoiGianDangKiController {

    @Autowired
    private ThoiGianDangKiService thoiGianDangKiService;

    @Autowired
    private TaiKhoanService taiKhoanService;

    public static final String URL = "thoigiandangki";

    @GetMapping("/thoigiandangki")
    public ModelAndView thoigiandangki() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        modelAndView.addObject("title_web","Thời gian đăng kí");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("url", "thoigiandangki");
        modelAndView.setViewName("home");
        return modelAndView;
    }

    @GetMapping("/thoigiandangki/entity")
    public ResponseEntity<ThoiGianDangKi> thoiGianDangKi(){
        List<ThoiGianDangKi> thoiGianDangKis = thoiGianDangKiService.findAll();
        if (thoiGianDangKis != null && thoiGianDangKis.size() > 0) {
            return new ResponseEntity<>(thoiGianDangKis.get(0), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/thoigiandangki/addOrEdit")
    public ResponseEntity<ThoiGianDangKi> createThoiGianDangKi(@RequestBody ThoiGianDangKi thoiGianDangKi){
        List<ThoiGianDangKi> thoiGianDangKis = thoiGianDangKiService.findAll();
        if (thoiGianDangKis != null && thoiGianDangKis.size() > 0) {
            ThoiGianDangKi thoiGianDangKi1 = thoiGianDangKis.get(0);
            thoiGianDangKi1.setThoiGianBD(thoiGianDangKi.getThoiGianBD());
            thoiGianDangKi1.setThoiGianKT(thoiGianDangKi.getThoiGianKT());
            return new ResponseEntity<>(thoiGianDangKiService.save(thoiGianDangKi1), HttpStatus.OK);
        }
        return new ResponseEntity<>(thoiGianDangKiService.save(thoiGianDangKi), HttpStatus.OK);
    }
}
