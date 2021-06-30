package com.anhntn.qlcn.repository;

import com.anhntn.qlcn.model.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhoaRepository extends JpaRepository<Khoa, Long> {
    Khoa findByMaKhoa(Long maKhoa);
}
