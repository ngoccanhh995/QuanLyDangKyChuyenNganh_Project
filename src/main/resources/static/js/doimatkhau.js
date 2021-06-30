$(document).ready(function () {
    var maTK = $("#editMaTK").val();
    var taiKhoan = "";
    $.ajax({
        type: "GET",
        url: "/taikhoan/findByMaTK?maTK=" + maTK,
        async: false,
        success: function (data) {
            if (data != null) {
                taiKhoan = data;
            }
        },
        error: function (msg) {
            // return false;
        }
    });
    $("#btn_update_matkhau").click(function () {
        clearDataModal();
        clearValidTag();
        $("#doimatkhauModal").modal('show');
    });
    $("#btn_edit_matkhau").click(function () {
        clearValidTag();
        var maTK = $("#maTK").val();
        var matKhau = $("#editMatKhau").val();
        var matKhauRepeat = $("#editMatKhauRepeat").val();

        if (matKhau.trim() === "") {
            $("#errorEditMatKhau").css('display', 'block');
            $("#errorEditMatKhau").html('* Mật khẩu không được để trống');
        } else if (matKhauRepeat.trim() === "") {
            $("#errorEditMatKhauRepeat").css('display', 'block');
            $("#errorEditMatKhauRepeat").html('* Mật khẩu nhập lại không được để trống');
        } else if (matKhauRepeat.localeCompare(matKhau) != 0) {
            // Mật khẩu nhập lại không khớp
            $("#errorEditMatKhauRepeat").css('display', 'block');
            $("#errorEditMatKhauRepeat").html('* Mật khẩu nhập lại không khớp');
        }

        var taiKhoanEdit = {
            "maTK": maTK,
            "matKhau": matKhau
        };
        if (checkValidInput()) {
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "/taikhoan/editMatKhau",
                dataType: "json",
                data: JSON.stringify(taiKhoanEdit),
                success: function (data) {
                    console.log(data);
                    $("#doimatkhauModal").modal('hide');
                    var notification = alertify.notify('Đổi mật khẩu thành công', 'success', 5, function () {
                        // console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#doimatkhauModal").modal('hide');
                    var notification = alertify.notify('Đổi mật khẩu thất bại', 'error', 5, function () {
                        // console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $("body").load("/doimatkhau");
            });
        }
    });
});

function checkValidInput() {
    var listTagValid = document.getElementsByClassName("invalid-taikhoan");
    for (var i = 0; i < listTagValid.length; i++) {
        if (listTagValid[i].style.display === 'block') return false;
    }
    return true;
}

function clearDataModal() {
    $("#editMaTK").val("");
    $("#editMatKhau").val("");
    $("#editMatKhauRepeat").val("");
}

function clearValidTag() {
    $("#errorEditMatKhau").css('display', 'none');
    $("#errorEditMatKhau").html('');
    $("#errorEditMatKhauRepeat").css('display', 'none');
    $("#errorEditMatKhauRepeat").html('');
}
