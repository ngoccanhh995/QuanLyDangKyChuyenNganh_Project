package com.anhntn.qlcn.controller;

import com.anhntn.qlcn.model.Lop;
import com.anhntn.qlcn.model.TaiKhoan;
import com.anhntn.qlcn.service.LopService;
import com.anhntn.qlcn.service.TaiKhoanService;
import com.anhntn.qlcn.service.ThongTinDangKiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@Controller
public class LoginController {

    @Autowired
    private TaiKhoanService taiKhoanService;
    @Autowired
    private ThongTinDangKiService thongTinDangKiService;
    @Autowired
    private LopService lopService;

    public List<String> COLUMNS = new ArrayList<>(Arrays.asList(
            "Mã lớp", "Tên lớp", "Sĩ số", "Lượt đăng kí"
    ));

    @GetMapping(value={"/", "/login"})
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }


    /*@GetMapping(value="/registration")
    public ModelAndView registration(){
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        modelAndView.addObject("user", user);
        modelAndView.setViewName("registration");
        return modelAndView;
    }

    @PostMapping(value = "/registration")
    public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        User userExists = userService.findUserByUserName(user.getUserName());
        if (userExists != null) {
            bindingResult
                    .rejectValue("userName", "error.user",
                            "There is already a user registered with the user name provided");
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("registration");
        } else {
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User has been registered successfully");
            modelAndView.addObject("user", new User());
            modelAndView.setViewName("registration");

        }
        return modelAndView;
    }
*/
    @GetMapping(value="/home")
    public ModelAndView home(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication(); // Lấy ra thông tin tài khoản hệ thống đã lưu
        TaiKhoan taiKhoan = taiKhoanService.findByTenDN(auth.getName());
        List<Map<String, Long>> thongkeDangKiTheoCN = thongTinDangKiService.thongKeDangKiTheoCN();
        List<Map<String, String>> thongkeDangKiTheoLop = thongkeDangKiTheoLop();
        modelAndView.addObject("title_web","Trang chủ");
        modelAndView.addObject("authTaiKhoan", taiKhoan);
        modelAndView.addObject("url", "home");
        modelAndView.addObject("columns", COLUMNS);
        modelAndView.addObject("thongkeDangKiTheoLop", thongkeDangKiTheoLop);
        modelAndView.addObject("thongkeDangKiTheoCN", thongkeDangKiTheoCN);
        modelAndView.setViewName("home");
        return modelAndView;
    }

    public List<Map<String, String>> thongkeDangKiTheoLop() {
        List<Map<String, String>> listResult = new ArrayList<>();
        List<Map<Long, Long>> thongKeSiSoLop = thongTinDangKiService.thongKeSiSoLop();
        List<Map<Long, Long>> thongKeLuotDangKi = thongTinDangKiService.thongKeLuotDangKi();
        for (int i=0; i < thongKeSiSoLop.size(); i++) {
            Map<String, String> mapOut = new HashMap<>();
            Map<Long, Long> siSoMap = thongKeSiSoLop.get(i);
            if (i < thongKeLuotDangKi.size()) {
                Map<Long, Long> dangkiMap = thongKeLuotDangKi.get(i);
                mapOut.put("dangKi", dangkiMap.get("dangKi").toString());
            } else {
                mapOut.put("dangKi", "0");
            }
            Lop lop = lopService.findByMaLop(siSoMap.get("maLop"));
            mapOut.put("maLop", lop.getMaLop().toString());
            mapOut.put("maKhoa", lop.getMaKhoa().toString());
            mapOut.put("tenLop", lop.getTenLop());
            mapOut.put("siSo", siSoMap.get("siSo").toString());
            listResult.add(mapOut);
        }
        return listResult;
    }

}
