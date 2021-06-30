package com.anhntn.qlcn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "khoa")
public class Khoa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "makhoa")
    private Long maKhoa;

    @Column(name = "tenkhoa")
    private String tenKhoa;
}
