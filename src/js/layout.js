var win = $(window);
var winHeight = win.height();
var winWidth = win.width();
var $canvas = document.getElementById("canvas");
var $menu = document.getElementById("left_menu");
var $aside = document.getElementById("aside_func");
var $cont = document.getElementById("right_content");

// menu-include //
function includeMenu() {
    var menu_z, menu_i, menu_elmnt, menu_file, menu_xhttp;
    /* Loop through a collection of all HTML elements: */
    menu_z = document.getElementsByTagName("*");
    for (menu_i = 0; menu_i < menu_z.length; menu_i++) {
        menu_elmnt = menu_z[menu_i];
        /*search for elements with a certain atrribute:*/
        menu_file = menu_elmnt.getAttribute("menu-html");
        if (menu_file) {
            /* Make an HTTP request using the attribute value as the file name: */
            menu_xhttp = new XMLHttpRequest();
            menu_xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { menu_elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { menu_elmnt.innerHTML = "請確認連線是否正常"; }
                    /* Remove the attribute, and call this function once more: */
                    menu_elmnt.removeAttribute("menu-html");
                    includeMenu();
                }
            }
            menu_xhttp.open("GET", menu_file, true);
            menu_xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

// menu-show/hide //
function menuToggle() {
    if ($menu.classList) {
        $menu.classList.toggle("menu-close");
    }

    if ($cont.classList) {
        $cont.classList.toggle("right-fluid");
    }
}

function asideToggle() {
    if ($aside.classList) {
        $aside.classList.toggle("aside-open");
        $aside.style.display = 'block';
    }
}

$('.aside-btn').click(function() {
    $(this).toggleClass('aside-active');
});

$('.menu-btn a').click(function() {
    $(this).toggleClass('menu-active');
});

// function touchSreen() {
//     $(document).mouseup(function(e) {
//         if ($(e.target).closest('#left_menu').length === 0 && $(e.target).closest('#menuBtn').length === 0) {
//             $('#left_menu').removeClass('jsMenuWidth');
//             $("#right_content").removeClass('jsContMargin jsTranslate');
//             $('#menuBtn').addClass("menuBtnToggle");
//         }
//     });
// }

// menu-filter //
function mFilter() {
    var input, filter, div, li, a, i;
    input = document.getElementById("menu_filter");
    filter = input.value.toUpperCase();
    div = document.getElementById("menu_list");
    li = div.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// header-date-time //

// date
var date = document.getElementById("date");

function updateDate() {
    var newDate = new Date();
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var days = newDate.getDate();
    var dateJSRead = `${year}/${month}/${days}`;
    date.textContent = dateJSRead;
}
setInterval(updateDate, 1000);

// time
var currentTime = document.getElementById("time");

function zeropadder(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function updateTime() {
    var timeNow = new Date(),
    hh = timeNow.getHours(),
    mm = timeNow.getMinutes(),
    ss = timeNow.getSeconds(),
    formatAMPM = (hh >= 12 ? 'PM' : 'AM');
    hh = hh % 12 || 12;
    var clockJSRead = `${zeropadder(hh)}: ${zeropadder(mm)}: ${zeropadder(ss)}` + ' ' + formatAMPM;
    currentTime.textContent = clockJSRead;
}
setInterval(updateTime, 1000);

// bootstrap-tooltip //
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// card-detail-show/hide //
$('.detail-title').each(function() {
    $(this).click(function() {
        $(this).closest('.card-detail').find('.detail-board').stop(true, true).slideToggle();
        $(this).toggleClass('detail-title-close');
    });
});

// table-detail-col-focus //
$('.table-col-detail').each(function() {
    $(this).click(function() {
        $(this).css('background', '#F6EFE6');
        $(this).closest('.table-col').siblings().find('.table-col-detail').css('background', 'none');
    });
});

// tabulator-search //
var table = new Tabulator("#search-table", {
    data: searchData,
    autoColumns: true,
    layout: "fitColumns",
    height: "255px",
    pagination: "local",
    paginationSize: 3,
    paginationSizeSelector: [3, 6, 8, 10],
    movableColumns: true,
    resizableRows: true,
    tooltips: true,
    tooltipsHeader: true,
    tooltipGenerationMode: "hover",
    columns: [
        { title: "id", field: "id" },
        { title: "保單號碼", field: "保單號碼" },
        { title: "要保日", field: "要保日" },
        { title: "生效日", field: "生效日" },
        { title: "主約險種", field: "主約險種" },
        { title: "狀態", field: "狀態" },
        { title: "參考用每", field: "參考用每" },
        { title: "要保人", field: "要保人" },
        { title: "被保人", field: "被保人" },
        { title: "收費地區", field: "收費地區" },
        { title: "應繳費日", field: "應繳費日" },
        { title: "送金到期日", field: "送金到期日" },
        { title: "繳法", field: "繳法" },
        { title: "收費方式", field: "收費方式" },
        { title: "服務業務員", field: "服務業務員" },
        { title: "收費指示", field: "收費指示" },
        { title: "住所指示", field: "住所指示" },
        { title: "核定日期", field: "核定日期" },
        { title: "應付未付指示", field: "應付未付指示" },
    ],
});

// tabulator-filter //
// var input = document.getElementById("filter");

// input.addEventListener("keyup", function() {
//     var filters = [];
//     var columns = table.getColumns();
//     var search = input.value;

//     columns.forEach(function(column) {
//         filters.push({
//             field: column.getField(),
//             value: search,
//         });
//     });

//     table.setFilters([filters]);
// });

// table-dropdown-with-checkbox //
$('.table-switch-list').each(function() {
    $(this).click(function() {
        $(this).toggleClass('visible');
    });
});

// search-result-arrow //
$('.resultToggleBtn a').click(function() {
    $(this).stop(true, true).toggleClass('resultToggle-down');
    $('.content-search .content-table').stop(true, true).slideToggle();
});

// jquery-ui datepicker //
$(function() {
    $(".date-picker-item input").datepicker({
        dateFormat: "t/mm/dd",
        changeMonth: true,
        changeYear: true,
        yearRange: "1911:+100"
    });
});