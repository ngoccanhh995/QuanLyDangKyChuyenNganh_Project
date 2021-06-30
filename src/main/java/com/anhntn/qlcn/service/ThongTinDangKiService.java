package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.Lop;
import com.anhntn.qlcn.model.ThongTinDangKi;
import com.anhntn.qlcn.repository.ThongTinDangKiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ThongTinDangKiService {

    @Autowired
    private ThongTinDangKiRepository thongTinDangKiRepository;

    public ThongTinDangKi findByMaSV(Long maSV) {
        return thongTinDangKiRepository.findByMaSV(maSV);
    }

    public ThongTinDangKi save(ThongTinDangKi thongTinDangKi) {
        return thongTinDangKiRepository.save(thongTinDangKi);
    }

    public List<Map<String, Long>> thongKeDangKiTheoCN() {
        return thongTinDangKiRepository.thongKeDangKiTheoCN();
    }

    public List<Map<Long, Long>> thongKeSiSoLop() {
        return thongTinDangKiRepository.thongKeSiSoLop();
    }

    public List<Map<Long, Long>> thongKeLuotDangKi() {
        return thongTinDangKiRepository.thongKeLuotDangKi();
    }

    public List<Map<String, String>> thongTinDangKiAdmin() {
        return thongTinDangKiRepository.thongTinDangKiAdmin();
    }

}
