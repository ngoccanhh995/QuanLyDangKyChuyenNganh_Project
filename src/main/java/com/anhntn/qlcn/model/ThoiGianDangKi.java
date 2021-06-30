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
@Table(name = "thoigiandangki")
public class ThoiGianDangKi {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mathoigiandk")
    private Long maThoiGianDK;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoigianbd")
    private Date thoiGianBD;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "thoigiankt")
    private Date thoiGianKT;

}
