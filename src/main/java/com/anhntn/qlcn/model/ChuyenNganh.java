package com.anhntn.qlcn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chuyennganh")
public class ChuyenNganh {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idcn")
    private Long idCN;

    @Column(name = "makhoa")
    private Long maKhoa;

    @Column(name = "macn")
    private String maCN;

    @Column(name = "chuyennganh")
    private String chuyenNganh;

    @Column(name = "mota")
    private String moTa;

    @Column(name = "ghichu")
    private String ghiChu;
}
