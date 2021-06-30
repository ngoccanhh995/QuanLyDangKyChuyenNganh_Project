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
@Table(name = "thongtindangki")
public class ThongTinDangKi {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mathongtindk")
    private Long maThongTinDK;

    @Column(name = "masv")
    private Long maSV;

    @Column(name = "thutucn")
    private String thuTuCN;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoigiandk")
    private Date thoiGianDK;
}
