import * as $ from 'jquery';
import qs from 'qs';
import Tabulator from 'tabulator-tables';
import {
    createPopper
} from '@popperjs/core';

//TODO
export function createRemoteTable(id, cols, data, vm) {
    // initialize table
    let table = new Tabulator(`${id}`, {
        data: data,
        //autoColumns: true,
        layout: "fitColumns",
        height: "255px",
        pagination: "remote", //enable remote pagination
        paginationSize: 10, //optional parameter to request a certain number of rows per page
        paginationButtonCount: 0,
        ajaxURL: "http://localhost:10202/commonController/tabulatorDatas", //set url for ajax request
        paginationDataSent: {
            "page": "pageNo", //change page parameter name to "pageNo"
        },
        ajaxContentType: {
            headers: {
                //'Content-Type': 'application/json; charset=utf-8',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: function (url, config, params) {
                //url - the url of the request
                //config - the fetch config object
                //params - the request parameters
                let data = new URLSearchParams(params);
                console.log(config, params);
                return data;
                //return JSON.stringify(params);
            },
        },
        ajaxConfig: {
            method: "POST",
            mode: "no-cors",
            //headers: {
            // "Accept": "application/json", //tell the server we need JSON back
            // "X-Requested-With": "XMLHttpRequest", //fix to help some frameworks respond correctly to request
            //"Content-type": "application/x-www-form-urlencoded",
            //"Content-type": 'application/json; charset=utf-8', //set the character encoding of the request
            //"Authorization": "bearer " + "123456"
            //"Access-Control-Allow-Origin": "http://localhost:8080/", //the URL origin of the site making the request
            //},
        },
        ajaxResponse: function (url, params, response) {
            //url - the URL of the request
            //params - the parameters passed with the request
            //response - the JSON object returned in the body of the response.
            console.log(response);
            //let dataSize = response["data_size"];
            //let pageSize = response["last_page"];
            //totalDataSize = dataSize;
            //let classPrefix = destination.slice(1);
            //let dataNum = document.querySelector(`.${classPrefix}-dataNum`);
            //let pageNum = document.querySelector(`.${classPrefix}-pageNum`);
            //dataNum.textContent = `總共${dataSize}筆`;
            //pageNum.textContent = `總共${pageSize}頁`;
            return response; //return response json object
        },
        ajaxLoader: false,

        // ajaxConfig: {
        //     method: "POST",
        //     //mode: "cors",
        //     mode: "no-cors", 
        //     body: qs.stringify({
        //         pageNo: "1",
        //         size: "1000",
        //     }),
        //     headers: {
        //         "Accept": "application/json", //tell the server we need JSON back
        //         "X-Requested-With": "XMLHttpRequest", //fix to help some frameworks respond correctly to request
        //         "Content-type": 'application/json; charset=utf-8', //set the character encoding of the request
        //         //"Access-Control-Allow-Origin": "http://localhost:8080/", //the URL origin of the site making the request
        //     },
        //     //credentials: "same-origin", //send cookies with the request from the matching origin
        // },
        // ajaxResponse:function(url, params, response){
        //     //url - the URL of the request
        //     //params - the parameters passed with the request
        //     //response - the JSON object returned in the body of the response.
        //     return response.tableData; //return the tableData property of a response json object
        // },
        //ajaxParams:{token:"ABC123"}, //set any standard parameters to pass with the request
        //paginationInitialPage:2, //optional parameter to set the initial page to load
        //paginationSizeSelector: [5, 10, 30, 50, true],
        movableColumns: true,
        resizableRows: true,
        columns: cols,
        tableBuilt() {
            //filterTable();
            createTooltips();
        },
        rowClick: function (e, row) {
            let data = row.getData();
            let id = row.getData().id;
            vm.$store.commit("setInsPolicyNumber", data["a"]);
            vm.$store.commit("setApplicant", `${id}_${data["f"]}`);
            vm.$store.commit("setAssured", `${id}_${data["g"]}`);
            vm.$store.commit("setSingleInsPolicyData", data);
        },
        dataLoaded: function (data) {
            let lenDiv = $(`${id}`).find(".tabulator-len");
            $(lenDiv).text(`， 總共 ${data.length} 筆，第 `);
            let pagination = $(`${id}`).find(".tabulator-page-size");
            let pageSelect = $(`${id}`).find(".tabulator-page-num");
            $(pageSelect).empty(); //empty options in select
            let selected = pagination.children("option:selected").val();
            let numPages = Math.ceil(data.length / selected);
            //create options in select
            for (let i = 0; i < numPages; i++) {
                $(pageSelect).append($("<option>").attr('value', i + 1).text(i + 1));
            }
        },
        dataFiltered: function (filters, rows) {
            //filters - array of filters currently applied
            //rows - array of row components that pass the filters
            let lenDiv = $(`${id}`).find(".tabulator-len");
            $(lenDiv).text(`， 總共 ${rows.length} 筆，第 `);
            let pagination = $(`${id}`).find(".tabulator-page-size");
            let pageSelect = $(`${id}`).find(".tabulator-page-num");
            $(pageSelect).empty(); //empty options in select
            let selected = pagination.children("option:selected").val();
            let numPages = Math.ceil(rows.length / selected);
            //create options in select
            for (let i = 0; i < numPages; i++) {
                $(pageSelect).append($("<option>").attr('value', i + 1).text(i + 1));
            }
        },
        cellMouseEnter: function (e, cell) {
            //setup tooltips
            const cellEl = cell.getElement();
            let tooltip = $(`${id}-tooltip`)[0];
            let tooltipText = cell.getValue();
            let popperInstance = createPopper(cellEl, tooltip, {
                modifiers: [{
                    name: "offset",
                    options: {
                        offset: [0, 8],
                    },
                }, ],
            });
            let tooltipTextContent = $(`${id}-tooltipTextContent`);
            $(tooltipTextContent).text(`${tooltipText}`);
            tooltip.setAttribute("data-show", "");
            popperInstance.update();
        },
        cellMouseLeave: function (e, cell) {
            let tooltip = $(`${id}-tooltip`)[0];
            tooltip.removeAttribute("data-show");
        }
    })


    // create and display div element - total number of entries
    let pageLen = document.createElement("div");
    $(pageLen).addClass("page-length");
    let tabulatorPageSize = $(`${id}`).find(".tabulator-page-size")[0];
    $(pageLen).insertAfter(tabulatorPageSize);
    let len = document.createElement("p");
    $(len).addClass("tabulator-len")
    len.innerText = `， 總共 ${table.getData().length} 筆，第 `;
    let pageLength = $(`${id}`).find(".page-length")[0];
    $(len).appendTo(pageLength);

    // create and display dropdown element - page selection
    let pagination = $(`${id}`).find(".tabulator-page-size");
    let pageSelect = document.createElement("select");
    $(pageSelect).addClass("tabulator-page-num");
    $(pageSelect).insertAfter(pageLen)
    createNumPages(pagination, table, pageSelect);

    // create and display div element - 頁
    let page = document.createElement("div");
    $(page).addClass("page-num");
    $(page).insertAfter(pageSelect)
    let num = document.createElement("p");
    num.innerText = ` 頁 `;
    $(num).appendTo(page);

    // change the total number of pages based on the number of rows displayed in a page
    $(pagination).on('change', function () {
        $(pageSelect).find('option').remove();
        createNumPages(pagination, table, pageSelect);
    });

    // go to the selected page
    $(pageSelect).on('change', function () {
        let selected = $(pageSelect).children("option:selected").val();
        table.setPage(selected);
    });

    // change the selected page based on the button clicked
    let tabulatorPageButtons = $(`${id}`).find(".tabulator-page");
    tabulatorPageButtons.on('click', function () {
        let button = $(this).attr("data-page");
        let pages = $(`${id}`).find(".tabulator-page-num");
        let selected = pages.children("option:selected").val();

        if (button == 'prev') {
            $(pageSelect).val(selected - 1);
        } else if (button == 'next') {
            let next = parseInt(selected) + 1;
            $(pageSelect).val(next);
        } else if (button == 'first') {
            $(pageSelect).val(1);
        } else {
            let last = $(`${id}`).find('.tabulator-page-num option:last').val();
            $(pageSelect).val(last);
        }
    });

    // filter function for the table
    function filterTable() {
        function matchAny(data, filterParams) {
            var match = false;
            for (var key in data) {
                let newData = "";
                if (typeof data[key] === "number") {
                    newData = data[key].toString();
                } else {
                    newData = data[key]
                }

                if (newData && newData.includes(filterParams.value)) { // data[key] === filterParams.value
                    match = true;
                }
            }
            return match;
        }

        const filterInput = $(`${id}-tableFilter`)[0];
        filterInput.addEventListener("keyup", () => {
            table.setFilter(matchAny, {
                value: filterInput.value
            });
            if (filterInput.value == "") {
                table.clearFilter();
            }
        });
    }

    function createTooltips() {
        let newId = id.slice(1);
        let tooltipDiv = document.createElement("div");
        $(tooltipDiv).addClass("tabulator-tooltip");
        $(tooltipDiv).attr("id", `${newId}-tooltip`);
        $(tooltipDiv).attr("role", "tooltip");
        const tooltipTextContent = document.createElement("span");
        $(tooltipTextContent).text("");
        $(tooltipTextContent).attr("id", `${newId}-tooltipTextContent`)
        tooltipDiv.appendChild(tooltipTextContent);
        let arrowDiv = document.createElement("div");
        $(arrowDiv).addClass("tabulator-arrow-tooltip");
        $(arrowDiv).attr("id", `${newId}-tooltipArrow`)
        tooltipDiv.appendChild(arrowDiv);
        let tableDiv = $(`${id}`);
        $(tooltipDiv).insertAfter(tableDiv);
    }

    return table;
}

// calculate the total number of pages based on the number of rows displayed in a page
function createNumPages(pagination, table, pageSelect) {
    let selected = pagination.children("option:selected").val();
    let numPages = Math.ceil(table.getData().length / selected);
    for (let i = 0; i < numPages; i++) {
        $(pageSelect).append($("<option>").attr('value', i + 1).text(i + 1));
    }
}



// show and hide columns based on selection
export function showCols(showCols, totalCols, table) {
    //showCols => columns to show
    // loop through totalCols
    for (let i = 0; i < totalCols.length; i++) {
        if (showCols.includes(totalCols[i].value)) {
            table.showColumn(totalCols[i].value)
        } else {
            table.hideColumn(totalCols[i].value)
        }
    }
    table.redraw(true);
}