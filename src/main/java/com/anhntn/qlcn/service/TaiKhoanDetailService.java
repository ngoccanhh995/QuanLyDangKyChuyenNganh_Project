package com.anhntn.qlcn.service;

import com.anhntn.qlcn.model.TaiKhoan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TaiKhoanDetailService implements UserDetailsService {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String tenDN) {
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(tenDN);
        List<GrantedAuthority> authorities = getUserAuthority();
        return buildUserForAuthentication(taiKhoan, authorities);
    }
// Hàm xác định vai trò trong hệ thống
    private List<GrantedAuthority> getUserAuthority() {
        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority("ADMIN"));
        roles.add(new SimpleGrantedAuthority("SINHVIEN"));
        return new ArrayList<>(roles);
    }

// Hàm lấy ra thông tin tài khoản trng DB (Nếu k có trả ra rỗng)
    private UserDetails buildUserForAuthentication(TaiKhoan taiKhoan, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(taiKhoan.getTenDN(), taiKhoan.getMatKhau(),
                getTrangThaiConvert(taiKhoan.getTrangThai()), true, true, true, authorities);
   // Truyền vào thông tin tài khoản theo định dạng của hệ thống
    }
    //Hàm xác định lại trạng thái hoạt động, nếu hoạt động chuyển thành TRUE
    private boolean getTrangThaiConvert(String trangthai) {
        return "ACTIVE".equals(trangthai) ? true : false;
    }
}