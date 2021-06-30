package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaiKhoanService {
    private TaiKhoanRepository taiKhoanRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public TaiKhoanService(TaiKhoanRepository taiKhoanRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.taiKhoanRepository = taiKhoanRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public TaiKhoan findByTenDN(String tenDN) {
        return taiKhoanRepository.findByTenDN(tenDN);
    }

    public TaiKhoan findByMaTK(Long maTK) {
        return taiKhoanRepository.findByMaTK(maTK);
    }

    public TaiKhoan save(TaiKhoan taiKhoan) {
        taiKhoan.setMatKhau(bCryptPasswordEncoder.encode(taiKhoan.getMatKhau()));
        return taiKhoanRepository.save(taiKhoan);
    }

    public List<TaiKhoan> findByTrangThai(String trangThai) {
        return taiKhoanRepository.findByTrangThai(trangThai);
    }

    public List<TaiKhoan> findAll() {
        return taiKhoanRepository.findAll();
    }

    public boolean validateTenDN(String tenDN) {
        return taiKhoanRepository.findByTenDN(tenDN) != null ? true : false;
    }

}
