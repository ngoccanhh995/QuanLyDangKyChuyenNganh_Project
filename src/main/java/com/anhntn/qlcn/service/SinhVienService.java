package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.SinhVien;
import com.anhntn.qlcn.repository.SinhVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SinhVienService {

    @Autowired
    private SinhVienRepository sinhVienRepository;

    public SinhVien findByMaTK(Long maTK){
        return sinhVienRepository.findByMaTK(maTK);
    }

    public SinhVien findByMaSV(Long maSV){
        return sinhVienRepository.findByMaSV(maSV);
    }

    public SinhVien save(SinhVien sinhVien) {
        return sinhVienRepository.save(sinhVien);
    }

    public boolean validateMaTK(Long maTK) {
        return sinhVienRepository.findByMaTK(maTK) != null ? true : false;
    }

    public boolean validateMaSV(Long maSV) {
        return sinhVienRepository.findByMaSV(maSV) != null ? true : false;
    }

}
