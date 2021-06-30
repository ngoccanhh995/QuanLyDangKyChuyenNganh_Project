$(document).ready(function () {
    console.log(thongkeDangKiTheoLop);
    var table = $('#dataTable').DataTable({
        "data": thongkeDangKiTheoLop,
        "columns": [
            {"data": "maLop", "width": "10%"},
            {"data": "tenLop"},
            {"data": "siSo"},
            {"data": "dangKi"},
        ]
    });
});