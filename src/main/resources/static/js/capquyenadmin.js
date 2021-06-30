// Call the dataTables jQuery plugin
$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            url: "/capquyenadmin/listTaiKhoan",
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
            if (data.admin === "SINHVIEN") {
                $(row).addClass('context-menu-one');
                $('td', row).addClass('context-menu-one');
            }
            if (data.admin === "ADMIN") {
                $(row).addClass('context-menu-two');
                $('td', row).addClass('context-menu-two');
            }
        }
    });

    $.contextMenu({
        selector: '.context-menu-one',
        callback: function (key, options) {
            if (key == "restore") {
                var data = table.row(this).data();
                $("#matk").html(data.maTK);
                $("#tendn").html(data.tenDN);
                $("#assignAdminModal").modal('show');
            }
        },
        items: {
            "restore": {name: "Gán quyền ADMIN", icon: "edit"},
        }
    });

    $.contextMenu({
        selector: '.context-menu-two',
        callback: function (key, options) {
            if (key == "cancel") {
                var data = table.row(this).data();
                $("#matkDelete").html(data.maTK);
                $("#tendnDelete").html(data.tenDN);
                $("#cancelAssignAdminModal").modal('show');
            }
        },
        items: {
            "cancel": {name: "Hủy quyền ADMIN", icon: "delete"}
        }
    });

    $("#btn_assign_taikhoan").click(function () {
        var matk = $("#matk").html();
        $.ajax({
            type: "PUT",
            url: "/capquyenadmin/editAssign/" + matk,
            success: function (data) {
                var notification = alertify.notify('Gán quyền admin thành công', 'success', 5, function () {
                    console.log('dismissed');
                });
                $("#assignAdminModal").modal('hide');
            },
            error: function (msg) {
                $("#assignAdminModal").modal('hide');
                var notification = alertify.notify('Gán quyền admin thất bại', 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })

    $("#btn_cancel_assign_taikhoan").click(function () {
        var matk = $("#matkDelete").html();
        $.ajax({
            type: "PUT",
            url: "/capquyenadmin/editCancelAssign/" + matk,
            success: function (data) {
                var notification = alertify.notify('Hủy quyền admin thành công', 'success', 5, function () {
                    console.log('dismissed');
                });
                $("#cancelAssignAdminModal").modal('hide');
            },
            error: function (msg) {
                $("#cancelAssignAdminModal").modal('hide');
                var notification = alertify.notify('Hủy quyền admin thái thất bại', 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })
})
;
