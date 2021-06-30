package com.anhntn.qlcn;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

public class Test {

    public static void main(String[] args) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String matkhau = bCryptPasswordEncoder.encode("123456");
        System.out.println(matkhau);
    }
}
