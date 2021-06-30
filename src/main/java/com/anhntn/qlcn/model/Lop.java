package com.anhntn.qlcn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lop")
public class Lop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "malop")
    private Long maLop;

    @Column(name = "tenlop")
    private String tenLop;

    @Column(name = "makhoa")
    private Long maKhoa;
}
