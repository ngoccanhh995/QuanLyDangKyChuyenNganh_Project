package com.anhntn.qlcn.repository;

import com.anhntn.qlcn.model.ChuyenNganh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChuyenNganhRepository extends JpaRepository<ChuyenNganh, Long> {

    List<ChuyenNganh> findByMaKhoa(Long maKhoa);

    ChuyenNganh findByChuyenNganh(String chuyenNganh);

    ChuyenNganh findByMaCN(String maCN);

    ChuyenNganh findByIdCN(Long maCN);
}
