var table;
var tableModal;
var actionDangKi;
$(document).ready(function () {
    reloadButton();
    initButton();
    var chuyenNganh = "";
    $.ajax({
        type: "GET",
        url: "/chuyennganh/findByMaKhoa?maKhoa=" + maKhoa,
        async: false,
        success: function (data) {
            if (data != null) {
                chuyenNganh = data;
            }
        },
        error: function (msg) {
            // return false;
        }
    });
    table = $('#dataTable').DataTable({
        "ajax": {
            url: "/thongtindangki/findByMaSV?maSV=" + maSV,
            dataSrc: ''
        },
        "columns": [
            {"data": "maThongTinDK", "width": "10%"},
            {"data": "maSV"},
            {"data": "thuTuCN"},
            {
                "data": "thoiGianDK",
                "render": function (data, type, row) {
                    return data != null ? convertDate(data): "";
                }
            },
        ]
    });

    tableModal = $('#dataTableModal').DataTable({
        "ajax": {
            url: "/chuyennganh/findByMaKhoa?maKhoa=" + maKhoa,
            dataSrc: ''
        },
        "columns": [
            {"data": "idCN", "width": "10%"},
            {"data": "maKhoa"},
            {"data": "maCN"},
            {"data": "chuyenNganh"},
            {"data": "moTa"},
            {
                data: null,
                defaultContent: '<button class="move-to-below-btn"><i class="fa fa-arrow-down"/></button>',
                width: "10px",
            },
            {
                data: null,
                defaultContent: '<button class="move-to-top-btn"><i class="fa fa-arrow-up"/></button>',
                width: "10px"
            }
        ],
        rowReorder: {
            selector: 'td:nth-child(odd)',
            snapX: 10
        }
    });

    $("#btn_create_dkcn").click(function () {
        $('#dataTableModal').DataTable().ajax.reload();
        addOrUpdate("ADD");
    });

    $("#btn_update_dkcn").click(function () {
        $('#dataTableModal').DataTable().ajax.reload();
        addOrUpdate("UPDATE");
    });

    $('#dataTableModal').find('tbody').on('click', '.move-to-top-btn', function () {
        var $row = $(this).closest('tr');
        var index = $row.index();
        if (index === 0) {
            return;
        }
        var rowTop = tableModal.row(index).data();
        var rowBelow = tableModal.row(index - 1).data();
        tableModal.row(index).data(rowBelow);
        tableModal.row(index - 1).data(rowTop);
        // table.draw(false);
    });
    $('#dataTableModal').find('tbody').on('click', '.move-to-below-btn', function () {
        var $row = $(this).closest('tr');
        var index = $row.index();
        if (index === tableModal.data().length) {
            return;
        }
        var rowTop = tableModal.row(index).data();
        var rowBelow = tableModal.row(index + 1).data();
        tableModal.row(index).data(rowBelow);
        tableModal.row(index + 1).data(rowTop);
        // table.draw(false);
    });

    $("#btn_update_table_modal").click(function () {
        var data = tableModal.data();
        var thuTuCN = "";
        for (var i = 0; i < data.length; i++) {
            thuTuCN += data[i].idCN;
            if (i != (data.length - 1)) {
                thuTuCN += "/"
            }
        }
        var thongtindangki = {
            "maSV": maSV,
            "thuTuCN": thuTuCN
        };
        var notify = "";
        if (actionDangKi === "ADD") {
            notify = "Đăng kí chuyên ngành ";
        } else if (actionDangKi === "UPDATE") {
            notify = "Cập nhật đăng kí chuyên ngành ";
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/thongtindangki/addOrUpdate",
            dataType: "json",
            data: JSON.stringify(thongtindangki),
            success: function (data) {
                console.log(data);
                $("#dangkichuyennganhModal").modal('hide');
                reloadButton();
                var notification = alertify.notify(notify + 'thành công', 'success', 5, function () {
                    // console.log('dismissed');
                });
            },
            error: function (msg) {
                console.log(msg);
                $("#dangkichuyennganhModal").modal('hide');
                var notification = alertify.notify(notify + 'thất bại', 'error', 5, function () {
                    // console.log('dismissed');
                });
            }
        }).done(function (result) {
            $('#dataTable').DataTable().ajax.reload();
        });
    });
});

function addOrUpdate(thaotac) {
    if (thaotac === "ADD") {
        $("#btn_update_table_modal").html("Đăng kí")
    } else {
        $("#btn_update_table_modal").html("Cập nhật")
    }
    $("#dangkichuyennganhModal").modal('show');
}

function reloadButton() {
    var thongtindangki = "";
    $.ajax({
        type: "GET",
        url: "/thongtindangki/checkByMaSV?maSV=" + maSV,
        async: false,
        success: function (data) {
            if (data != null) {
                thongtindangki = data;
            }
        },
        error: function (msg) {
            // return false;
        }
    });
    if (thongtindangki == "") {
        actionDangKi = "ADD";
        $("#btn_create_dkcn").css("display", "block");
        $("#btn_update_dkcn").css("display", "none");
    } else {
        actionDangKi = "UPDATE";
        $("#btn_create_dkcn").css("display", "none");
        $("#btn_update_dkcn").css("display", "block");
    }
}

function initButton() {
    var thoigiandangki = "";
    $.ajax({
        type: "GET",
        url: "/thoigiandangki/entity",
        async: false,
        success: function (data) {
            if (data != null) {
                thoigiandangki = data;
            }
        },
        error: function (msg) {
            // return false;
        }
    });
    /*if (thongtindangki != "") {
        actionDangKi = "ADD";
        $("#btn_create_dkcn").css("display", "block");
        $("#btn_update_dkcn").css("display", "none");
    } else {
        actionDangKi = "UPDATE";
        $("#btn_create_dkcn").css("display", "none");
        $("#btn_update_dkcn").css("display", "block");
    }*/
    if (thoigiandangki != "") {
        if ((new Date() < new Date(thoigiandangki.thoiGianBD)) || (new Date() > new Date(thoigiandangki.thoiGianKT))) {
            $("#btn_create_dkcn").css("display", "none");
            $("#btn_update_dkcn").css("display", "none");
        }
    }
}


function convertDate(date) {
    return date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4);
}
