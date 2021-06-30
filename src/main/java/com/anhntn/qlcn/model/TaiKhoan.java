package com.anhntn.qlcn.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "taikhoan")
public class TaiKhoan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "matk")
    private Long maTK;

    @Column(name = "tendn")
    private String tenDN;

    @Column(name = "matkhau")
    private String matKhau;

    @Column(name = "trangthai")
    private String trangThai;

    @Column(name = "admin")
    private String admin;
}
