package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.Khoa;
import com.anhntn.qlcn.model.Lop;
import com.anhntn.qlcn.repository.KhoaRepository;
import com.anhntn.qlcn.repository.LopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhoaService {

    @Autowired
    private KhoaRepository khoaRepository;

    public Khoa findByMaKhoa(Long maKhoa) {
        return khoaRepository.findByMaKhoa(maKhoa);
    }

    public List<Khoa> findAll() {
        return khoaRepository.findAll();
    }
}
