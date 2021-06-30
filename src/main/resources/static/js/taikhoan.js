// Call the dataTables jQuery plugin
$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            url: "/listTaiKhoan",
            dataSrc: ''
        },
        "columns": [
            {"data": "maTK", "width": "10%"},
            {"data": "tenDN"},
            {
                "data": "trangThai",
                "render": function (data, type, row) {
                    return data === "ACTIVE" ? "Hoạt động" : "Không hoạt động";
                }
            },
            {
                "data": "admin", "width": "10%",
                "render": function (data, type, row) {
                    return data === "ADMIN" ? "Admin" : "Sinh viên";
                }
            }
        ],
        createdRow: function (row, data, index) {
            console.log(data);
            if (data.trangThai === "INACTIVE" && data.admin === "SINHVIEN") {
                $(row).addClass('context-menu-restore');
                $('td', row).addClass('context-menu-restore');
            }
            if (data.trangThai === "ACTIVE" && data.admin === "SINHVIEN") {
                if (checkExistSVWithTaiKhoan(data.maTK)) {
                    $(row).addClass('context-menu-two');
                    $('td', row).addClass('context-menu-two');
                    console.log("two");
                } else {
                    $(row).addClass('context-menu-one');
                    $('td', row).addClass('context-menu-one');
                    console.log("one");
                }
            }
        }
    });

    $("#datepickerNgaySinh").datetimepicker({
        // defaultDate: new Date(),
        maxDate: new Date(),
        format: 'DD-MM-YYYY',
        useCurrent: false,
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    })

    $("#datepickerEditNgaySinh").datetimepicker({
        // defaultDate: new Date(),
        maxDate: new Date(),
        format: 'DD-MM-YYYY',
        useCurrent: false,
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    })

    $.contextMenu({
        selector: '.context-menu-one',
        callback: function (key, options) {
            if (key == "edit") {
                clearDataModal();
                clearValidTag();
                var data = table.row(this).data();
                setDataModal(data);
                $("#editModal").modal('show');
            }
            if (key == "delete") {
                var data = table.row(this).data();
                $("#matkDelete").html(data.maTK);
                $("#tendnDelete").html(data.tenDN);
                $("#deleteModal").modal('show');
            }
            if (key == "addSV") {
                clearDataModalSV();
                clearValidTagOfSV();
                var data = table.row(this).data();
                console.log(data);
                $("#inputMaTKSV").val(data.maTK);
                $("#addSVModal").modal('show');
            }
        },
        items: {
            "edit": {name: "Chỉnh sửa", icon: "edit"},
            "delete": {name: "Xóa", icon: "delete"},
            "addSV": {name: "Nhập thông tin sinh viên", icon: "add"},
        }
    });

    $.contextMenu({
        selector: '.context-menu-two',
        callback: function (key, options) {
            if (key == "edit") {
                clearDataModal();
                clearValidTag();
                var data = table.row(this).data();
                setDataModal(data);
                $("#editModal").modal('show');
            }
            if (key == "delete") {
                var data = table.row(this).data();
                $("#matkDelete").html(data.maTK);
                $("#tendnDelete").html(data.tenDN);
                $("#deleteModal").modal('show');
            }
            if (key == "editSV") {
                clearDataModalSV();
                clearValidTagOfSV()
                var data = table.row(this).data();
                console.log(data);
                setDataSVModal(data.maTK);
                $("#editSVModal").modal('show');
            }
        },
        items: {
            "edit": {name: "Chỉnh sửa", icon: "edit"},
            "delete": {name: "Xóa", icon: "delete"},
            "editSV": {name: "Thông tin sinh viên", icon: "edit"},
        }
    });

    $.contextMenu({
        selector: '.context-menu-restore',
        callback: function (key, options) {
            if (key == "restore") {
                var data = table.row(this).data();
                $("#matkRestore").html(data.maTK);
                $("#tendnRestore").html(data.TenDN);
                $("#restoreModal").modal('show');
            }
        },
        items: {
            "restore": {name: "Khôi phục trạng thái", icon: "edit"}
        }
    });

    $("#btn_create").click(function () {
        clearDataModal();
        clearValidTag();
        $("#addModal").modal('show');
    })

    $("#btn_add_taikhoan").click(function () {
        clearValidTag();

        var matk = null;
        var tendn = $("#inputTendn").val();
        var matkhau = $("#inputMatkhau").val();
        var matkhauRepeat = $("#inputMatkhauRepeat").val();
        var trangthai = "ACTIVE";
        var admin = $("#selectAdmin").val();

        var taikhoan = {
            "maTK": matk,
            "tenDN": tendn,
            "matKhau": matkhau,
            "trangThai": trangthai,
            "admin": admin,
        };
        console.log(taikhoan);
        if (tendn.trim() === "") {
            $("#errorTendn").css('display', 'block');
            $("#errorTendn").html('* Tên đăng nhập không được để trống');
        } else {
            $.ajax({
                type: "GET",
                url: "/taikhoan/validateTendn?tenDN=" + tendn,
                success: function (data) {
                    if (data) {
                        $("#errorTendn").css('display', 'block');
                        $("#errorTendn").html('* Tên đăng nhập đã tồn tại');
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        }
        if (matkhau.trim() === "") {
            $("#errorMatkhau").css('display', 'block');
            $("#errorMatkhau").html('* Mật khẩu không được để trống');
        } else if (matkhauRepeat.trim() === "") {
            $("#errorMatkhauRepeat").css('display', 'block');
            $("#errorMatkhauRepeat").html('* Mật khẩu nhập lại không được để trống');
        } else if (matkhauRepeat.localeCompare(matkhau) != 0) {
            // Mật khẩu nhập lại không khớp
            $("#errorMatkhauRepeat").css('display', 'block');
            $("#errorMatkhauRepeat").html('* Mật khẩu nhập lại không khớp');
        }
        if (checkValidInput()) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/taikhoan/add",
                dataType: "json",
                data: JSON.stringify(taikhoan),
                success: function (data) {
                    console.log(data);
                    $("#addModal").modal('hide');
                    var notification = alertify.notify('Thêm mới tài khoản thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#addModal").modal('hide');
                    var notification = alertify.notify('Thêm mới tài khoản thất bại', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $('#dataTable').DataTable().ajax.reload();
            });
        }
    })

    $("#btn_edit_taikhoan").click(function () {
        clearValidTag();
        var matk = $("#editMatk").val();
        ;
        var tendn = $("#editTendn").val();
        var matkhau = $("#editMatkhau").val();
        var matkhauRepeat = $("#editMatkhauRepeat").val();
        var trangthai = $("#selectEditTrangThai").val();
        var admin = $("#selectAdmin").val();

        var taikhoan = {
            "maTK": matk,
            "tenDN": tendn,
            "matKhau": matkhau,
            "trangThai": trangthai,
            "admin": admin,
        };

        if (matkhau.trim() === "") {
            $("#errorEditMatkhau").css('display', 'block');
            $("#errorEditMatkhau").html('* Mật khẩu không được để trống');
        } else if (matkhauRepeat.trim() === "") {
            $("#errorEditMatkhauRepeat").css('display', 'block');
            $("#errorEditMatkhauRepeat").html('* Mật khẩu nhập lại không được để trống');
        } else if (matkhauRepeat.localeCompare(matkhau) != 0) {
            // Mật khẩu nhập lại không khớp
            $("#errorEditMatkhauRepeat").css('display', 'block');
            $("#errorEditMatkhauRepeat").html('* Mật khẩu nhập lại không khớp');
        }
        if (checkValidInput()) {
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "/taikhoan/edit",
                dataType: "json",
                data: JSON.stringify(taikhoan),
                success: function (data) {
                    console.log(data);
                    $("#editModal").modal('hide');
                    var notification = alertify.notify('Cập nhật tài khoản thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#editModal").modal('hide');
                    var notification = alertify.notify('Cập nhật tài khoản thất bại', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $('#dataTable').DataTable().ajax.reload();
            });
        }
    });

    $("#btn_delete_taikhoan").click(function () {
        var matk = $("#matkDelete").html();
        $.ajax({
            type: "DELETE",
            url: "/taikhoan/delete/" + matk,
            success: function (data) {
                if (data === "success") {
                    var notification = alertify.notify('Xóa tài khoản thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                }
                if (data === "not_exists") {
                    var notification = alertify.notify('Xóa tài khoản thất bại. Không tìm thấy tài khoản cần xóa', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
                $("#deleteModal").modal('hide');
            },
            error: function (msg) {
                $("#deleteModal").modal('hide');
                var notification = alertify.notify('Xóa tài khoản thất bại', 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })

    $("#btn_restore_taikhoan").click(function () {
        var matk = $("#matkRestore").html();
        $.ajax({
            type: "PUT",
            url: "/taikhoan/edit/" + matk,
            success: function (data) {
                var notification = alertify.notify('Khôi phục trạng thái thành công', 'success', 5, function () {
                    console.log('dismissed');
                });
                $("#restoreModal").modal('hide');
            },
            error: function (msg) {
                $("#restoreModal").modal('hide');
                var notification = alertify.notify('Khôi phục trạng thái thất bại', 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })

    function checkValidInput() {
        var listTagValid = document.getElementsByClassName("invalid-taikhoan");
        for (var i = 0; i < listTagValid.length; i++) {
            if (listTagValid[i].style.display === 'block') return false;
        }
        return true;
    }

    function clearValidTag() {
        $("#errorTendn").css('display', 'none');
        $("#errorMatkhau").css('display', 'none');
        $("#errorEditMatkhau").css('display', 'none');
        $("#errorMatkhauRepeat").css('display', 'none');
        $("#errorEditMatkhauRepeat").css('display', 'none');
        $("#errorTendn").html('');
        $("#errorMatkhau").html('');
        $("#errorMatkhauRepeat").html('');
        $("#errorEditMatkhau").html('');
        $("#errorEditMatkhauRepeat").html('');
    }

    function clearValidTagOfSV() {
        $("#errorMaSV").css('display', 'none');
        $("#errorTenSV").css('display', 'none');
        $("#errorNgaySinh").css('display', 'none');
        $("#errorEditMaSV").css('display', 'none');
        $("#errorEditTenSV").css('display', 'none');
        $("#errorEditNgaySinh").css('display', 'none');
        $("#errorMaSV").html('');
        $("#errorTenSV").html('');
        $("#errorNgaySinh").html('');
        $("#errorEditMaSV").html('');
        $("#errorEditTenSV").html('');
        $("#errorEditNgaySinh").html('');
    }

    function setDataModal(data) {
        console.log(data);
        $("#editMatk").val(data.maTK);
        $("#editTendn").val(data.tenDN);
        $("#editMatkhau").val(data.matKhau);
        $("#editMatkhauRepeat").val(data.matKhau);
        $("#selectEditTrangThai").val(data.trangThai);
        $("#selectEditAdmin").val(data.admin);
    }

    function setDataSVModal(matk) {
        var data= getSVByMatk(matk);
        console.log(data);
        $("#editMaTKSV").val(data.maTK);
        $("#editMaSV").val(data.maSV);
        $("#editTenSV").val(data.tenSV);
        var dateNgaySinh = data.ngaySinh.substring(8,10) + "-" + data.ngaySinh.substring(5,7) + "-" + data.ngaySinh.substring(0,4);
        $("#datepickerEditNgaySinh").data("DateTimePicker").date(dateNgaySinh);
        $("#selectEditMaLop").val(data.maLop);
        $("#editNienKhoa").val(data.nienKhoa);
    }

    function clearDataModal() {
        $("#inputMatk").val("");
        $("#inputTendn").val("");
        $("#inputMatkhau").val("");
        $("#inputMatkhauRepeat").val("");
        $("#selectTrangThai").val("ACTIVE");
        $("#selectAdmin").val("ADMIN");
    }

    function clearDataModalSV() {
        $("#inputMaTKSV").val("");
        $("#inputMaSV").val("");
        $("#inputTenSV").val("");
        $("#inputNienKhoa").val("");
        $("#datepickerNgaySinh").data("DateTimePicker").date(null);
        $("#selectMaLop").prop('selectedIndex',0);
    }

    $("#btn_addsv_taikhoan").click(function () {
        clearValidTagOfSV();

        var matk = $("#inputMaTKSV").val();
        var masv = $("#inputMaSV").val();
        var tensv = $("#inputTenSV").val();
        var nienkhoa = $("#inputNienKhoa").val();
        var ngaysinhValue = $('#datepickerNgaySinhV').val();
        var malop = $("#selectMaLop").val();
        var ngaysinh = ngaysinhValue.substring(6,10)+ "-" + ngaysinhValue.substring(3,5) + "-" + ngaysinhValue.substring(0,2) + "T" + "00:00:00";


        var sinhvien = {
            "maTK": matk,
            "maSV": masv,
            "tenSV": tensv,
            "nienKhoa": nienkhoa,
            "ngaySinh": ngaysinh,
            "maLop": malop
        };
        console.log(sinhvien);
        if (masv.trim() === "") {
            $("#errorMaSV").css('display', 'block');
            $("#errorMaSV").html('* Mã sinh viên không được để trống');
        } else {
            $.ajax({
                type: "GET",
                url: "/sinhvien/validateMaSV?maSV=" + masv,
                success: function (data) {
                    if (data) {
                        $("#errorMaSV").css('display', 'block');
                        $("#errorMaSV").html('* Mã sinh viên đã tồn tại');
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        }
        if (tensv.trim() === "") {
            $("#errorTenSV").css('display', 'block');
            $("#errorTenSV").html('* Tên sinh viên không được để trống');
        }

        if (ngaysinhValue === "") {
            $("#errorNgaySinh").css('display', 'block');
            $("#errorNgaySinh").html('* Ngày sinh không được để trống');
        }

        if (checkValidInput()) {
            console.log("ajax ok");
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/sinhvien/add",
                dataType: "json",
                data: JSON.stringify(sinhvien),
                success: function (data) {
                    console.log(data);
                    $("#addSVModal").modal('hide');
                    var notification = alertify.notify('Thêm mới thông tin sinh viên thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#addSVModal").modal('hide');
                    var notification = alertify.notify('Thêm mới thông tin sinh viên thất bại', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $('#dataTable').DataTable().ajax.reload();
            });
        }
    })

    function checkExistSVWithTaiKhoan(matk) {
        var dataReturn = false;
        $.ajax({
            type: "GET",
            url: "/sinhvien/validateMaTK?maTK=" + matk,
            async: false,
            success: function (data) {
                if(data) {
                    dataReturn = data;
                }
            },
            error: function (msg) {
                // return false;
            }
        })
        return dataReturn;
    }

    function getSVByMatk(matk) {
        var sinhvien = "";
        $.ajax({
            type: "GET",
            url: "/sinhvien/findByMaTK?maTK=" + matk,
            async: false,
            success: function (data) {
                if(data != null) {
                    sinhvien = data;
                }
            },
            error: function (msg) {
                // return false;
            }
        })
        return sinhvien;
    }


    $("#btn_editsv_taikhoan").click(function () {
        clearValidTagOfSV();
        var matk = $("#editMaTKSV").val();
        var masv = $("#editMaSV").val();
        var tensv = $("#editTenSV").val();
        var nienkhoa = $("#editNienKhoa").val();
        var ngaysinhValue = $('#datepickerEditNgaySinhV').val();
        var malop = $("#selectEditMaLop").val();
        var ngaysinh = ngaysinhValue.substring(6,10)+ "-" + ngaysinhValue.substring(3,5) + "-" + ngaysinhValue.substring(0,2) + "T" + "00:00:00";

        var sinhvien = {
            "maTK": matk,
            "maSV": masv,
            "tenSV": tensv,
            "nienKhoa": nienkhoa,
            "ngaySinh": ngaysinh,
            "maLop": malop
        };

        if (tensv.trim() === "") {
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
                data: JSON.stringify(sinhvien),
                success: function (data) {
                    console.log(data);
                    $("#editSVModal").modal('hide');
                    var notification = alertify.notify('Cập nhật thông tin sinh viên thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#editSVModal").modal('hide');
                    var notification = alertify.notify('Cập nhật thông tin sinh viên thất bại', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $('#dataTable').DataTable().ajax.reload();
            });
        }
    });
})
;
