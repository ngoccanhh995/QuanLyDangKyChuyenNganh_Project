package com.anhntn.qlcn.repository;

import com.anhntn.qlcn.model.ThoiGianDangKi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThoiGianDangKiRepository extends JpaRepository<ThoiGianDangKi, Long> {

}
