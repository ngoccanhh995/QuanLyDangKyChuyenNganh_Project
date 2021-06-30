package com.anhntn.qlcn.controller;

import com.anhntn.qlcn.model.ChuyenNganh;
import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.model.ThongTinDangKi;
import com.anhntn.qlcn.service.ChuyenNganhService;
import com.anhntn.qlcn.service.TaiKhoanService;
import com.anhntn.qlcn.service.ThongTinDangKiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Timestamp;
import java.util.*;


@Controller
public class ThongTinDangKiController {

    @Autowired
    private ThongTinDangKiService thongTinDangKiService;

    @Autowired
    private ChuyenNganhService chuyenNganhService;

    @Autowired
    private TaiKhoanService taiKhoanService;

    public List<String> COLUMNS= new ArrayList<>(Arrays.asList(
            "Mã sinh viên", "Tên sinh viên", "Tên lớp", "Tên khoa", "Thời gian đăng kí", "Chuyên ngành ưu tiên 1", "Chuyên ngành ưu tiên 2", "Chuyên ngành ưu tiên 3"
    ));

    @GetMapping("/thongtindangki/findByMaSV")
    public ResponseEntity<List<ThongTinDangKi>> findByMaSV(@RequestParam Long maSV){
        List<ThongTinDangKi> list = new ArrayList<>();
        ThongTinDangKi thongTinDangKi = thongTinDangKiService.findByMaSV(maSV);
        if (thongTinDangKi != null) {
            String[] thuTus = thongTinDangKi.getThuTuCN().split("/");
            String chuyenNganhConcat = "";
            for (String thutu : thuTus) {
                ChuyenNganh chuyenNganh = chuyenNganhService.findByIdCN(Long.valueOf(thutu));
                chuyenNganhConcat +=  "" + chuyenNganh.getMaCN() + ",";
            }
            thongTinDangKi.setThuTuCN(chuyenNganhConcat);
            list.add(thongTinDangKi);
        } else {
            list.add(new ThongTinDangKi());
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/thongtindangki/checkByMaSV")
    public ResponseEntity<ThongTinDangKi> checkByMaTK(@RequestParam Long maSV){
        ThongTinDangKi thongTinDangKi = thongTinDangKiService.findByMaSV(maSV);
        return new ResponseEntity<>(thongTinDangKi, HttpStatus.OK);
    }

    @PostMapping("/thongtindangki/addOrUpdate")
    public ResponseEntity<ThongTinDangKi> update(@RequestBody ThongTinDangKi thongTinDangKi){
        ThongTinDangKi thongTinDangKi1 = thongTinDangKiService.findByMaSV(thongTinDangKi.getMaSV());
        if (thongTinDangKi1 != null) {
            thongTinDangKi1.setThuTuCN(thongTinDangKi.getThuTuCN());
            thongTinDangKi1.setThoiGianDK(new Date());
            return new ResponseEntity<>(thongTinDangKiService.save(thongTinDangKi1), HttpStatus.OK);
        }
        thongTinDangKi.setThoiGianDK(new Date());
        return new ResponseEntity<>(thongTinDangKiService.save(thongTinDangKi), HttpStatus.OK);
    }

    @GetMapping("/thongtindangki/listThongTinDangKi")
    public ResponseEntity<List<Map<String, Object>>> listThongTinDangKiAdmin(){
        List<Map<String, String>> listMap = thongTinDangKiService.thongTinDangKiAdmin();
        List<Map<String, Object>> listResult =new ArrayList<>();
        for (int i = 0; i< listMap.size(); i++ ) {
            Map<String, String> map = listMap.get(i);
            Map<String, Object> mapNew = new HashMap<>();
            mapNew.putAll(map);
            String thuTuCN = map.get("thuTuCN");
            String[] thuTus = thuTuCN.split("/");
            ChuyenNganh chuyenNganh1 = chuyenNganhService.findByIdCN(Long.valueOf(thuTus[0]));
            ChuyenNganh chuyenNganh2 = chuyenNganhService.findByIdCN(Long.valueOf(thuTus[1]));
            ChuyenNganh chuyenNganh3 = chuyenNganhService.findByIdCN(Long.valueOf(thuTus[2]));
            mapNew.put("chuyenNganh1", chuyenNganh1.getChuyenNganh());
            mapNew.put("chuyenNganh2", chuyenNganh2.getChuyenNganh());
            mapNew.put("chuyenNganh3", chuyenNganh3.getChuyenNganh());
            listResult.add(mapNew);
        }
        return new ResponseEntity<>(listResult, HttpStatus.OK);
    }


    @GetMapping("/thongtindangkiadmin")
    public ModelAndView hongTinDangKiAdmin() {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        modelAndView.addObject("title_web","Quản lý tài khoản");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("columns", COLUMNS);
        modelAndView.addObject("url", "thongtindangkiadmin");
        modelAndView.setViewName("home");
        return modelAndView;
    }
}
