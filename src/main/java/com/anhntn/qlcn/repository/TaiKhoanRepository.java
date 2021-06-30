package com.anhntn.qlcn.repository;

import com.anhntn.qlcn.model.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
    TaiKhoan findByTenDN(String tenDN);
    TaiKhoan findByMaTK(Long maTK);
    List<TaiKhoan> findByTrangThai(String trangThai);
}
