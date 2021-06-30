package com.anhntn.qlcn.repository;


import com.anhntn.qlcn.model.Lop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LopRepository extends JpaRepository<Lop, Long> {

    Lop findByMaLop(Long maLop);
}
