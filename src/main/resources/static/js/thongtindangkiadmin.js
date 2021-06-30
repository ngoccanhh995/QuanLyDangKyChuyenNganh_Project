$(document).ready(function () {
    var table = $('#dataTable').DataTable({
        "ajax": {
            url: "/thongtindangki/listThongTinDangKi",
            dataSrc: ''
        },
        "columns": [
            {"data": "maSV", "width": "10%", "class": "context-menu-one"},
            {"data": "tenSV", "width": "10%", "class": "context-menu-one"},
            {"data": "tenLop", "class": "context-menu-one"},
            {"data": "tenKhoa", "class": "context-menu-one"},
            {
                "data": "thoiGianDK", "class": "context-menu-one",
                "render": function (data, type, row) {
                    return convertDate(data);
                }
            },
            {"data": "chuyenNganh1", "class": "context-menu-one"},
            {"data": "chuyenNganh2", "class": "context-menu-one"},
            {"data": "chuyenNganh3", "class": "context-menu-one"}
        ]
    });

})

function convertDate(date) {
    return date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4) + " " + date.substring(11,13) + ":" + date.substring(14,16) + ":"+ date.substring(17,19);
}

