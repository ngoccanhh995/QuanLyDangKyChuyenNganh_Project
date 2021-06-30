package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.ThoiGianDangKi;
import com.anhntn.qlcn.repository.ThoiGianDangKiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThoiGianDangKiService {

    @Autowired
    private ThoiGianDangKiRepository thoiGianDangKiRepository;

    public ThoiGianDangKi save(ThoiGianDangKi thoiGianDangKi) {
        return thoiGianDangKiRepository.save(thoiGianDangKi);
    }

    public List<ThoiGianDangKi> findAll() {
        return thoiGianDangKiRepository.findAll();
    }
}
