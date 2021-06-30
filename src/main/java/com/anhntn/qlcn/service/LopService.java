package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.Lop;
import com.anhntn.qlcn.repository.LopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LopService {

    @Autowired
    private LopRepository lopRepository;

    public Lop findByMaLop(Long maLop) {
        return lopRepository.findByMaLop(maLop);
    }

    public List<Lop> findAll() {
        return lopRepository.findAll();
    }

}
