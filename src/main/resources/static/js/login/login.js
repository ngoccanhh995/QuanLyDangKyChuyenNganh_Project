$("#dangnhap").click(function(e) {
    e.preventDefault();
    clearValidate();
    var tendn = $("#tendn").val().trim();
    var matkhau = $("#matkhau").val().trim();
    var taikhoan = {
        "tendn": tendn,
        "matkhau": matkhau,
    };

    if (tendn.trim() === "") {
        $("#errorTendn").css('display', 'block');
        $("#errorTendn").html('* Tên đăng nhập không được để trống');
    }
    if (matkhau.trim() === "") {
        $("#errorMatKhau").css('display', 'block');
        $("#errorMatKhau").html('* Mật khẩu không được để trống');
    }

    if (tendn != "" && matkhau != "") {
        $.ajax({
            type: "GET",
            url: "/login/validateAccount?tendn=" + tendn + "&matkhau=" + matkhau,
            success: function (data) {
                if (!data) {
                    $("#errorTaiKhoan").css('display', 'block');
                    $("#errorTaiKhoan").html('* Thông tin đăng nhập không hợp lệ');
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    if (checkValidInput()) {
        // $("#formLogin").submit();
    }
});

function checkValidInput() {
    var listTagValid = document.getElementsByClassName("invalid-taikhoan");
    for (var i = 0; i < listTagValid.length; i++) {
        if (listTagValid[i].style.display === 'block') return false;
    }
    return true;
}

function clearValidate() {
    $("#errorTaiKhoan").css('display','none');
    $("#errorTendn").css('display','none');
    $("#errorMatKhau").css('display','none');
    $("#errorTaiKhoan").html('');
    $("#errorTendn").html('');
    $("#errorMatKhau").html('');
}