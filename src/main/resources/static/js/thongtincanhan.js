$(document).ready(function () {
    $("#editNgaySinh").datetimepicker({
        maxDate: new Date(),
        format: 'DD-MM-YYYY',
        useCurrent: false,
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText'
        }
    });
    var maSV = $("#editMaSV").val();
    var sinhVien = "";
    $.ajax({
        type: "GET",
        url: "/sinhvien/findByMaSV?maSV=" + maSV,
        async: false,
        success: function (data) {
            if (data != null) {
                sinhVien = data;
            }
        },
        error: function (msg) {
            // return false;
        }
    });
    $("#btn_update_thongtincanhan").click(function () {
        clearDataModal();
        clearValidTag();
        setDataModal(sinhVien)
        $("#thongtinsinhvienModal").modal('show');
    });
    $("#btn_edit_thongtinsinhvien").click(function () {
        clearValidTag();
        var maSV = $("#editMaSV").val();
        var tenSV = $("#editTenSV").val();
        var nienKhoa = $("#editNienKhoa").val();
        var ngaysinhValue = $('#editNgaySinhV').val();
        var ngaySinh = ngaysinhValue.substring(6, 10) + "-" + ngaysinhValue.substring(3, 5) + "-" + ngaysinhValue.substring(0, 2) + "T" + "00:00:00";

        var sinhVienEdit = {
            "maSV": maSV,
            "tenSV": tenSV,
            "nienKhoa": nienKhoa,
            "ngaySinh": ngaySinh,
        };

        if (tenSV.trim() === "") {
            $("#errorEditTenSV").css('display', 'block');
            $("#errorEditTenSV").html('* Tên sinh viên không được để trống');
        }

        if (ngaysinhValue === "") {
            $("#errorEditNgaySinh").css('display', 'block');
            $("#errorEditNgaySinh").html('* Ngày sinh không được để trống');
        }
        if (checkValidInput()) {
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "/sinhvien/edit",
                dataType: "json",
                data: JSON.stringify(sinhVienEdit),
                success: function (data) {
                    console.log(data);
                    $("#thongtinsinhvienModal").modal('hide');
                    var notification = alertify.notify('Cập nhật thông tin sinh viên thành công', 'success', 5, function () {
                        // console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#thongtinsinhvienModal").modal('hide');
                    var notification = alertify.notify('Cập nhật thông tin sinh viên thất bại', 'error', 5, function () {
                        // console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $("body").load("/thongtincanhan");
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
    $("#editTenSV").val("");
    $("#editNienKhoa").val("");
    $("#editNgaySinh").data("DateTimePicker").date(null);
}

function clearValidTag() {
    $("#errorEditTenSV").css('display', 'none');
    $("#errorEditTenSV").html('');
    $("#errorEditNgaySinh").css('display', 'none');
    $("#errorEditNgaySinh").html('');
}

function setDataModal(sinhVien) {
    $("#editTenSV").val(sinhVien.tenSV);
    $("#editNienKhoa").val(sinhVien.nienKhoa);
    var ngaySinhvValue = sinhVien.ngaySinh.substring(8,10)+ "-" + sinhVien.ngaySinh.substring(5,7) + "-" + sinhVien.ngaySinh.substring(0,4);
    $("#editNgaySinh").data("DateTimePicker").date(ngaySinhvValue);
}