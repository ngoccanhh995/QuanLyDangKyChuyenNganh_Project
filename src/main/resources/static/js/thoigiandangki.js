$(document).ready(function () {
    $("#datepickerBatDau").datetimepicker({
        // defaultDate: new Date(),
        minDate: new Date(),
        format: 'DD-MM-YYYY',
        useCurrent: false,
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    }).on('dp.change',function(event){
        //Performing functionality
        var dateBatdau = $('#datepickerBatDauV').val();
        $('#datepickerKetThuc').data("DateTimePicker").minDate(dateBatdau);
    });
    $("#datepickerKetThuc").datetimepicker({
        // defaultDate: new Date(),
        // minDate: new Date(),
        minDate: new Date(),
        format: 'DD-MM-YYYY',
        useCurrent: false,
        showTodayButton: true,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    }).on('dp.change',function(event){
        //Performing functionality

    });
    $("#timepickerBatDau").datetimepicker({
        format: "HH:mm:ss",
        icons: {
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
        }
    });
    $("#timepickerKetThuc").datetimepicker({
        format: "HH:mm:ss",
        icons: {
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
        }
    });
    initDatetime();
    defaultDateTime();
    not_thaotac();
    /*$("#bt").click(function () {
        clickDateTime();
    });*/
});

$("#btn_create_tgdk").click(function () {
    clickDateTime();
});
$("#btn_update_tgdk").click(function () {
    clickDateTime();
});
$("#btn_luu_tgdk").click(function (e) {
    clearValidTag();
    getValueDateTime(e);
    dieukienTaoMoi();
});

$("#btn_huy_tgdk").click(function (e) {
    setNull();
    clearValidTag();
    initDatetime();
    defaultDateTime();
});

function initDatetime() {
    $.ajax({
        type: "GET",
        async: true,
        url: "/thoigiandangki/entity",
        success: function (data) {
            if (data != "") {
                var dateBD = data.thoiGianBD.substring(8,10) + "-" + data.thoiGianBD.substring(5,7) + "-" + data.thoiGianBD.substring(0,4);
                var dateKT = data.thoiGianKT.substring(8,10) + "-" + data.thoiGianKT.substring(5,7) + "-" + data.thoiGianKT.substring(0,4);
                var timeBD = data.thoiGianBD.substring(11,19);
                var timeKT = data.thoiGianKT.substring(11,19);
                $('#datepickerBatDau').data("DateTimePicker").date(dateBD);
                $('#datepickerKetThuc').data("DateTimePicker").date(dateKT);
                $('#timepickerBatDau').data("DateTimePicker").date(timeBD);
                $('#timepickerKetThuc').data("DateTimePicker").date(timeKT);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    }).done(function () {
        dieukienTaoMoi();
    });
}

function defaultDateTime() {
    $("#datepickerBatDau > .form-control").prop("disabled", true);
    $("#datepickerKetThuc > .form-control").prop("disabled", true);
    $("#timepickerBatDau > .form-control").prop("disabled", true);
    $("#timepickerKetThuc > .form-control").prop("disabled", true);
    not_thaotac();
}

function clickDateTime() {
    $("#datepickerBatDau > .form-control").prop("disabled", false);
    $("#datepickerKetThuc > .form-control").prop("disabled", false);
    $("#timepickerBatDau > .form-control").prop("disabled", false);
    $("#timepickerKetThuc > .form-control").prop("disabled", false);
    thaotac();
}

function not_thaotac() {
    $("#btn_luu_tgdk").addClass("disabled");
    $("#btn_huy_tgdk").addClass("disabled");
}

function thaotac() {
    $("#btn_luu_tgdk").removeClass("disabled");
    $("#btn_huy_tgdk").removeClass("disabled");
}

function dieukienTaoMoi() {
    var dateBatdau = $('#datepickerBatDauV').val();
    var dateKethuc = $('#datepickerKetThucV').val();
    var timeBatdau = $('#timepickerBatDauV').val();
    var timeKethuc = $('#timepickerKetThucV').val();
    if (dateBatdau === "" || dateKethuc === "" || timeBatdau === "" | timeKethuc === "") {
        // $('#datepickerBatDau').data("DateTimePicker").minDate(new Date());
        $("#btn_create_tgdk").removeClass("disabled");
        $("#btn_update_tgdk").addClass("disabled");
    } else {
        $("#btn_create_tgdk").addClass("disabled");
        $("#btn_update_tgdk").removeClass("disabled");
    }
}

function taomoiTGDK() {
    $("#datepickerBatDau > .form-control").prop("disabled", false);
    $("#datepickerKetThuc > .form-control").prop("disabled", false);
    $("#timepickerBatDau > .form-control").prop("disabled", false);
    $("#timepickerKetThuc > .form-control").prop("disabled", false);
}

function getValueDateTime(e) {
    var dateBatdau = $('#datepickerBatDauV').val();
    var dateKethuc = $('#datepickerKetThucV').val();
    var timeBatdau = $('#timepickerBatDauV').val();
    var timeKethuc = $('#timepickerKetThucV').val();

    if (dateBatdau === ""){
        $("#errorDateBatDau").css('display', 'block');
        $("#errorDateBatDau").html('* Trường này không được bỏ trống');
    }if (dateKethuc === ""){
        $("#errorDateKetThuc").css('display', 'block');
        $("#errorDateKetThuc").html('* Trường này không được bỏ trống');
    }
    var thoigian_bdkt = dateBatdau.substring(6,10)+ "-" + dateBatdau.substring(3,5) + "-" + dateBatdau.substring(0,2) + " " + timeBatdau;
    var thoigian_ktkt = dateKethuc.substring(6,10)+ "-" + dateKethuc.substring(3,5) + "-" + dateKethuc.substring(0,2) + " " + timeKethuc;
    if (dateBatdau != "" && dateKethuc != "" && (new Date(thoigian_bdkt) >= new Date(thoigian_ktkt))) {
        $("#errorDateKetThuc").css('display', 'block');
        $("#errorDateKetThuc").html('* Ngày kết thúc phải lớn hơn ngày bắt đầu');
    }
    if (timeBatdau === ""){
        $("#errorTimeBatDau").css('display', 'block');
        $("#errorTimeBatDau").html('* Trường này không được bỏ trống');
    }
    if (timeKethuc === ""){
        $("#errorTimeKetThuc").css('display', 'block');
        $("#errorTimeKetThuc").html('* Trường này không được bỏ trống');
    }
    var thoigian_bd = dateBatdau.substring(6,10)+ "-" + dateBatdau.substring(3,5) + "-" + dateBatdau.substring(0,2) + "T" + timeBatdau;
    var thoigian_kt = dateKethuc.substring(6,10)+ "-" + dateKethuc.substring(3,5) + "-" + dateKethuc.substring(0,2) + "T" + timeKethuc;
    var thoiGianDangKi = {
        "maThoiGianDK": null,
        "thoiGianBD": thoigian_bd,
        "thoiGianKT": thoigian_kt
    };
    if (checkValidInput()) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/thoigiandangki/addOrEdit",
            dataType: "json",
            data: JSON.stringify(thoiGianDangKi),
            success: function (data) {
                var notification = alertify.notify('Cập nhật thời gian đăng kí thành công', 'success', 5, function () {
                    console.log('dismissed');
                });
                defaultDateTime();
            },
            error: function (msg) {
                var notification = alertify.notify('Cập nhật thời gian đăng kí thất bại', 'error', 5, function () {
                    console.log('dismissed');
                });
            }
        })
        e.stopImmediatePropagation();
    }
}

function checkValidInput() {
    var listTagValid = document.getElementsByClassName("invalid-taikhoan");
    for (var i = 0; i < listTagValid.length; i++) {
        if (listTagValid[i].style.display === 'block') return false;
    }
    return true;
}

function clearValidTag() {
    $("#errorDateBatDau").css('display', 'none');
    $("#errorDateBatDau").html('');
    $("#errorDateKetThuc").css('display', 'none');
    $("#errorDateKetThuc").html('');
    $("#errorTimeBatDau").css('display', 'none');
    $("#errorTimeBatDau").html('');
    $("#errorTimeKetThuc").css('display', 'none');
    $("#errorTimeKetThuc").html('');
}

function setNull() {
    $('#datepickerBatDau').data("DateTimePicker").date(null);
    $('#datepickerKetThuc').data("DateTimePicker").date(null);
    $('#timepickerBatDau').data("DateTimePicker").date(null);
    $('#timepickerKetThuc').data("DateTimePicker").date(null);
}

//getValue: $('#datepickerBatDau').val();
//setValue: $('#datepicker').data("DateTimePicker").date("30/06/2021");
//setValue: $('#datepicker').data("DateTimePicker").minDate("30/06/2021");
//disable: $("#datepickerBatDau > .form-control").prop("disabled", true)
//startDate: '01/01/2010',
//endDate: '12/30/2020',