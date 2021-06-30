package com.anhntn.qlcn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sinhvien")
public class SinhVien {

    @Id
    @Column(name = "masv")
    private Long maSV;

    @Column(name = "tensv")
    private String tenSV;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngaysinh")
    private Date ngaySinh;

    @Column(name = "nienkhoa")
    private String nienKhoa;

    @Column(name = "matk")
    private Long maTK;

    @Column(name = "malop")
    private Long maLop;
}
