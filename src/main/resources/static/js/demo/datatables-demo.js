// Call the dataTables jQuery plugin
$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            url: "/listTaiKhoan",
            dataSrc: ''
        },
        "columns": [
            {"data": "matk", "width": "10%"},
            {"data": "tendn"},
            {"data": "matkhau"},
            {
                "data": "trangthai",
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
        ],/*"columns": [
            {"data": "matk", "width": "10%", "class": "context-menu-one"},
            {"data": "tendn", "class": "context-menu-one"},
            {"data": "matkhau", "class": "context-menu-one"},
            {
                "data": "trangthai", "class": "context-menu-one",
                "render": function (data, type, row) {
                    return data === "ACTIVE" ? "Hoạt động" : "Không hoạt động";
                }
            },
            {
                "data": "admin", "width": "10%", "class": "context-menu-one",
                "render": function (data, type, row) {
                    return data === "ADMIN" ? "Admin" : "Sinh viên";
                }
            }
        ],*/
        createdRow: function (row, data, index) {
            console.log(data);
            if (data.trangthai === "INACTIVE") {
                $(row).addClass('context-menu-restore');
                $('td', row).addClass('context-menu-restore');
            }
            if (data.trangthai === "ACTIVE") {
                $(row).addClass('context-menu-one');
                $('td', row).addClass('context-menu-one');
            }
        }
    });


    $.contextMenu({
        selector: '.context-menu-one',
        callback: function (key, options) {
            if (key == "edit") {
                clearDataModal();
                var data = table.row(this).data();
                setDataModal(data);
                $("#editModal").modal('show');
            }
            if (key == "delete") {
                var data = table.row(this).data();
                $("#matkDelete").html(data.matk);
                $("#tendnDelete").html(data.tendn);
                $("#deleteModal").modal('show');
            }
        },
        items: {
            "edit": {name: "Chỉnh sửa", icon: "edit"},
            "delete": {name: "Xóa", icon: "delete"},
        }
    });

    $.contextMenu({
        selector: '.context-menu-restore',
        callback: function (key, options) {
            if (key == "restore") {
                var data = table.row(this).data();
                $("#matkRestore").html(data.matk);
                $("#tendnRestore").html(data.tendn);
                $("#restoreModal").modal('show');
            }
        },
        items: {
            "restore": {name: "Cập nhật trạng thái", icon: "edit"}
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
            "matk": matk,
            "tendn": tendn,
            "matkhau": matkhau,
            "trangthai": trangthai,
            "admin": admin,
        };
        console.log(taikhoan);
        if (tendn.trim() === "") {
            $("#errorTendn").css('display', 'block');
            $("#errorTendn").html('* Tên đăng nhập không được để trống');
        } else {
            $.ajax({
                type: "GET",
                url: "/taikhoan/validateTendn?tendn=" + tendn,
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
        var admin = $("#selectEditAdmin").val();

        var taikhoan = {
            "matk": matk,
            "tendn": tendn,
            "matkhau": matkhau,
            "trangthai": trangthai,
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
        $("#errorMatkhau").css('display', 'none');
        $("#errorEditMatkhau").css('display', 'none');
        $("#errorEditMatkhauRepeat").css('display', 'none');
        $("#errorTendn").html('');
        $("#errorMatkhau").html('');
        $("#errorMatkhauRepeat").html('');
        $("#errorEditMatkhau").html('');
        $("#errorEditMatkhauRepeat").html('');
    }

    /*$("#btn_add_taikhoan").click(function () {
        var accountId = $("#inputAccountId").val();
        var email = $("#inputEmail").val();
        var userName = $("#inputUserName").val();
        var password = $("#inputPassword").val();
        var passwordRepeat = $("#inputPasswordRepeat").val();
        var role = $("#checkRole").is(":checked")? "1" : "0";
        var status = $("#selectStatus").val();

        if (passwordRepeat.localeCompare(password) != 0) {
            // Repeat pasword error
        }

        var account = {
            "accountId": accountId,
            "email": email,
            "userName": userName,
            "password": password,
            "role": role,
            "status": status
        };

        console.log(account);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/accounts/add",
            dataType: "json",
            data: JSON.stringify(account),
            success: function (data) {
                console.log(data);
                $("#addModal").modal('hide');
                var notification = alertify.notify('Thêm mới tài khoản thành công', 'success', 5, function(){  console.log('dismissed'); });
                //table.reload();
            },
            error: function (msg) {
                console.log(msg);
                $("#addModal").modal('hide');
                var notification = alertify.notify('Thêm mới tài khoản thất bại', 'error', 5, function(){  console.log('dismissed'); });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })

    $("#btn_delete_account").click(function () {
        var accountId = $("#accountIdDelete").html();
        $.ajax({
            type: "DELETE",
            url: "/accounts/delete/" + accountId,
            /!*dataType: "json",
            data: JSON.stringify(account),*!/
            success: function (msg) {
                $("#deleteModal").modal('hide');
                var notification = alertify.notify('Xóa tài khoản thành công', 'success', 5, function(){  console.log('dismissed'); });
            },
            error: function (msg) {
                $("#deleteModal").modal('hide');
                var notification = alertify.notify('Xóa tài khoản thất bại', 'error', 5, function(){  console.log('dismissed'); });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })

    function setDataModal(data){
        $("#inputAccountId").val(data.accountId);
        $("#inputEmail").val(data.email);
        $("#inputUserName").val(data.userName);
        $("#inputPassword").val(data.password);
        $("#checkRole").prop("checked", data.role == "1" ? true : false);
        $("#selectStatus").val(data.status);
    }*/

    function setDataModal(data) {
        console.log(data);
        $("#editMatk").val(data.matk);
        $("#editTendn").val(data.tendn);
        $("#editMatkhau").val(data.matkhau);
        $("#editMatkhauRepeat").val(data.matkhau);
        $("#selectEditTrangThai").val(data.trangthai);
        $("#selectEditAdmin").val(data.admin ? "true" : "false");
    }

    function clearDataModal() {
        $("#inputMatk").val("");
        $("#inputTendn").val("");
        $("#inputMatkhau").val("");
        $("#inputMatkhauRepeat").val("");
        $("#selectTrangThai").val("ACTIVE");
        $("#selectAdmin").val("true");
    }
})
;
