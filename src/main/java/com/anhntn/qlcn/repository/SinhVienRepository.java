package com.anhntn.qlcn.repository;

import com.anhntn.qlcn.model.SinhVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVien, Long> {
    SinhVien findByMaTK(Long maTK);
    SinhVien findByMaSV(Long maSV);
}
