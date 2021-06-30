package com.anhntn.qlcn.repository;

import com.anhntn.qlcn.model.Lop;
import com.anhntn.qlcn.model.ThongTinDangKi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@EnableJpaRepositories
public interface ThongTinDangKiRepository extends JpaRepository<ThongTinDangKi, Long> {
    ThongTinDangKi findByMaSV(Long maSV);

    @Query("select c.chuyenNganh as chuyenNganh, count(c.idCN) as countchuyennganh from ThongTinDangKi t, ChuyenNganh c where substring(t.thuTuCN, 1,1) = CONCAT(c.idCN, '') group by c.idCN")
    List<Map<String, Long>> thongKeDangKiTheoCN();

    @Query("select l.maLop as maLop, count(s.maSV) as siSo\n" +
            "from Lop l\n" +
            "       join SinhVien s on l.maLop = s.maLop\n" +
            "group by l.maLop")
    List<Map<Long, Long>> thongKeSiSoLop();

    @Query("select l.maLop as maLop, count(s.maSV) as dangKi\n" +
            "      from Lop l\n" +
            "             join SinhVien s on l.maLop = s.maLop\n" +
            "             left join ThongTinDangKi t on s.maSV = t.maSV\n" +
            "      where t.maSV is not null\n" +
            "      group by l.maLop")
    List<Map<Long, Long>> thongKeLuotDangKi();

    @Query("select s.maSV as maSV, s.tenSV as tenSV, l.tenLop as tenLop, k.tenKhoa as tenKhoa, tt.thoiGianDK as thoiGianDK, tt.thuTuCN as thuTuCN\n" +
            "from SinhVien s\n" +
            "  join ThongTinDangKi tt on tt.maSV = s.maSV\n" +
            "  join Lop l on l.maLop = s.maLop\n" +
            "  join Khoa k on k.maKhoa = l.maKhoa")
    List<Map<String, String>> thongTinDangKiAdmin();

}
