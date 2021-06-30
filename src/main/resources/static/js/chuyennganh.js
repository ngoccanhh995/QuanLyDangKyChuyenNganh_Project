$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            url: "/chuyennganh/listChuyenNganh",
            dataSrc: ''
        },
        "columns": [
            {"data": "idCN", "width": "10%", "class": "context-menu-one"},
            {"data": "maCN", "width": "10%", "class": "context-menu-one"},
            {"data": "chuyenNganh", "class": "context-menu-one"},
            {"data": "maKhoa", "class": "context-menu-one"},
            {"data": "moTa", "class": "context-menu-one"},
            {"data": "ghiChu", "class": "context-menu-one"}
        ]
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
            /*if (key == "delete") {
                var data = table.row(this).data();
                $("#idCNDelete").html(data.idCN);
                $("#chuyennganhDelete").html(data.chuyennganh);
                $("#deleteModal").modal('show');
            }*/
        },
        items: {
            "edit": {name: "Chỉnh sửa", icon: "edit"},
            /*"delete": {name: "Xóa", icon: "delete"},*/
        }
    });

    $("#btn_create").click(function () {
        clearDataModal();
        clearValidTag();
        $("#addModal").modal('show');
    })

    $("#btn_add_chuyennganh").click(function () {
        clearValidTag();

        var idCN = null;
        var macn = $("#inputMacn").val();
        var chuyennganh = $("#inputChuyennganh").val();
        var maKhoa = $("#selectKhoa").val();
        var mota = $("#inputMota").val();
        var ghichu = $("#inputGhichu").val();

        var chuyennganhInput = {
            "idCN": idCN,
            "maCN": macn,
            "chuyenNganh": chuyennganh,
            "maKhoa": maKhoa,
            "moTa": mota,
            "ghiChu": ghichu
        };
        console.log(chuyennganh);
        if (macn.trim() === "") {
            $("#errorMaCN").css('display', 'block');
            $("#errorMaCN").html('* Mã chuyên ngành không được để trống');
        } else {
            $.ajax({
                type: "GET",
                url: "/chuyennganh/validateMaCN?maCN=" + macn,
                success: function (data) {
                    if (data) {
                        $("#errorMaCN").css('display', 'block');
                        $("#errorMaCN").html('* Mã chuyên ngành đã tồn tại');
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        }
        if (chuyennganh.trim() === "") {
            $("#errorChuyennganh").css('display', 'block');
            $("#errorChuyennganh").html('* Chuyên ngành không được để trống');
        } else {
            $.ajax({
                type: "GET",
                url: "/chuyennganh/validateChuyennganh?chuyenNganh=" + chuyennganh,
                success: function (data) {
                    if (data) {
                        $("#errorChuyennganh").css('display', 'block');
                        $("#errorChuyennganh").html('* Chuyên ngành đã tồn tại');
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        }
        if (mota.trim() === "") {
            $("#errorMota").css('display', 'block');
            $("#errorMota").html('* Mô tả không được để trống');
        }
        if (checkValidInput()) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/chuyennganh/add",
                dataType: "json",
                data: JSON.stringify(chuyennganhInput),
                success: function (data) {
                    console.log(data);
                    $("#addModal").modal('hide');
                    var notification = alertify.notify('Thêm mới chuyên ngành thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#addModal").modal('hide');
                    var notification = alertify.notify('Thêm mới chuyên ngành thất bại', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $('#dataTable').DataTable().ajax.reload();
            });
        }
    })

    $("#btn_edit_chuyennganh").click(function () {
        clearValidTag();
        var idCN = $("#editIdCN").val();
        var macn = $("#editMacn").val();
        var chuyennganh = $("#editChuyennganh").val();
        var maKhoa = $("#editSelectKhoa").val();
        var mota = $("#editMota").val();
        var ghichu = $("#editGhichu").val();

        var chuyennganhInput = {
            "idCN": idCN,
            "maCN": macn,
            "chuyenNganh": chuyennganh,
            "maKhoa": maKhoa,
            "moTa": mota,
            "ghiChu": ghichu
        };

        if (mota.trim() === "") {
            $("#errorEditMota").css('display', 'block');
            $("#errorEditMota").html('* Mô tả không được để trống');
        }
        if (checkValidInput()) {
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "/chuyennganh/edit",
                dataType: "json",
                data: JSON.stringify(chuyennganhInput),
                success: function (data) {
                    console.log(data);
                    $("#editModal").modal('hide');
                    var notification = alertify.notify('Cập nhật chuyên ngành thành công', 'success', 5, function () {
                        console.log('dismissed');
                    });
                },
                error: function (msg) {
                    console.log(msg);
                    $("#editModal").modal('hide');
                    var notification = alertify.notify('Cập nhật chuyên ngành thất bại', 'error', 5, function () {
                        console.log('dismissed');
                    });
                }
            }).done(function (result) {
                $('#dataTable').DataTable().ajax.reload();
            });
        }
    });

    /*$("#btn_delete_chuyennganh").click(function () {
        var idCN = $("#idCNDelete").html();
        $.ajax({
            type: "DELETE",
            url: "/chuyennganh/delete/" + idCN,
            success: function (data) {
                var notification = alertify.notify('Xóa chuyên ngành thành công', 'success', 5, function () {
                    console.log('dismissed');
                });
                $("#deleteModal").modal('hide');
            },
            error: function (msg) {
                $("#deleteModal").modal('hide');
                var notification = alertify.notify('Xóa chuyên ngành thất bại', 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    })*/

    function checkValidInput() {
        var listTagValid = document.getElementsByClassName("invalid-taikhoan");
        for (var i = 0; i < listTagValid.length; i++) {
            if (listTagValid[i].style.display === 'block') return false;
        }
        return true;
    }

    function clearValidTag() {
        $("#errorMaCN").css('display', 'none');
        $("#errorChuyennganh").css('display', 'none');
        $("#errorMota").css('display', 'none');
        $("#errorEditMota").css('display', 'none');
        $("#errorMaCN").html('');
        $("#errorChuyennganh").html('');
        $("#errorMota").html('');
        $("#errorEditMota").html('');
    }

    function setDataModal(data) {
        console.log(data);
        $("#editIdCN").val(data.idCN);
        $("#editMacn").val(data.maCN);
        $("#editChuyennganh").val(data.chuyenNganh);
        $("#editMota").val(data.moTa);
        $("#editSelectKhoa").val(data.maKhoa);
        $("#editGhichu").val(data.ghiChu);
    }

    function clearDataModal() {
        $("#inputIdCN").val("");
        $("#inputMacn").val("");
        $("#inputChuyennganh").val("");
        $("#inputMota").val("");
        $("#inputGhichu").val("");
        $("#selectKhoa").prop('selectedIndex',0);
    }
})

