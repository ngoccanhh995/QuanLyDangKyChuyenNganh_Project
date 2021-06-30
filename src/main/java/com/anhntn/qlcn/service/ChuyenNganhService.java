package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.ChuyenNganh;
import com.anhntn.qlcn.repository.ChuyenNganhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChuyenNganhService {

    @Autowired
    private ChuyenNganhRepository chuyenNganhRepository;

    public List<ChuyenNganh> findAll() {
        return chuyenNganhRepository.findAll();
    }

    public List<ChuyenNganh> findByMaKhoa(Long maKhoa) {
        return chuyenNganhRepository.findByMaKhoa(maKhoa);
    }

    public boolean validateChuyennganh(String chuyenNganh) {
        return chuyenNganhRepository.findByChuyenNganh(chuyenNganh) != null ? true : false;
    }

    public boolean validateMaCN(String maCN) {
        return chuyenNganhRepository.findByMaCN(maCN) != null ? true : false;
    }

    public ChuyenNganh findByIdCN(Long maCN) {
        return chuyenNganhRepository.findByIdCN(maCN);
    }

    public ChuyenNganh save(ChuyenNganh chuyenNganh) {
        return chuyenNganhRepository.save(chuyenNganh);
    }

    public void deleteTaiKhoan(ChuyenNganh chuyenNganh) {
        chuyenNganhRepository.delete(chuyenNganh);
    }
}
