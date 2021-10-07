//import * as $ from 'jquery';
import Tabulator from "tabulator-tables";
import { createPopper } from "@popperjs/core";

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//* refactor jquery to vanilla javascript
export function createTable(id, cols, data, vm) {
  // initialize table
  
  let table = new Tabulator(`#${id}`, {
    data: data,
    //autoColumns: true,
    layout: "fitColumns",
    height: "255px",
    pagination: "local",
    paginationSize: 5,
    paginationSizeSelector: [5, 10, 30, 50, true],
    paginationButtonCount: 0,
    movableColumns: true,
    resizableRows: true,
    columns: cols,
    tableBuilt() {
      filterTable();
      createTooltips();
    },
    ajaxLoader: true,
    ajaxLoaderLoading:"loading", 
    ajaxProgressiveLoadDelay: 200,
    rowClick: function(e, row) {
      
      if (id === "search-table") {
        let data = row.getData();
        let id = row.getData().id;
        vm.$store.commit("setInsPolicyNumber", data["policy_no"]);
        vm.$store.commit("setApplicant", `${id}_${data["o1_id"]}`);
        vm.$store.commit("setAssured", `${id}_${data["i1_id"]}`);
        vm.$store.commit("setSingleInsPolicyData", data);
        
      } else {
        let rowData =row.getData()
        row.select();
        // vm.$store.commit("setInsPolicyNumber2",{rowData,id});
        vm.$emit('transmit-tabulator-data',rowData);
        
      }
    },

    dataLoaded: function(data) {
      setTimeout(() => {
        let tableEl = document.querySelector(`#${id}`);
        let lenDiv = tableEl.querySelector(".tabulator-len");
        lenDiv.textContent = `， 總共 ${data.length} 筆，第 `;
        let pagination = tableEl.querySelector(".tabulator-page-size");
        let pageSelect = tableEl.querySelector(".tabulator-page-num");
        pageSelect.innerHTML = "";
        let selected = pagination.value;
        let numPages = Math.ceil(data.length / selected);
        //* create options in select
        for (let i = 0; i < numPages; i++) {
          let option = document.createElement("option");
          option.setAttribute("value", i + 1);
          option.textContent = i + 1;
          pageSelect.appendChild(option);
        }
        //let lenDiv1 = $(`#${id}`).find(".tabulator-len");
        //$(lenDiv).text(`， 總共 ${data.length} 筆，第 `);
        //let pagination = $(`#${id}`).find(".tabulator-page-size");
        //let pageSelect = $(`#${id}`).find(".tabulator-page-num");
        //pageSelect.removeChild(pageSelect.firstChild);
        //$(pageSelect).empty(); //empty options in select
        //let selected = $(pagination).children("option:selected").val();
        // for (let i = 0; i < numPages; i++) {
        //     $(pageSelect).append($("<option>").attr('value', i + 1).text(i + 1));
        // }
      }, 10);
    },
    dataFiltered: function(filters, rows) {
      //filters - array of filters currently applied
      //rows - array of row components that pass the filters
      setTimeout(() => {
        let tableEl = document.querySelector(`#${id}`);
        let lenDiv = tableEl.querySelector(".tabulator-len");
        lenDiv.textContent = `， 總共 ${rows.length} 筆，第 `;
        let pagination = tableEl.querySelector(".tabulator-page-size");
        let pageSelect = tableEl.querySelector(".tabulator-page-num");
        pageSelect.innerHTML = "";
        let selected = pagination.value;
        let numPages = Math.ceil(rows.length / selected);
        //* create options in select
        for (let i = 0; i < numPages; i++) {
          let option = document.createElement("option");
          option.setAttribute("value", i + 1);
          option.textContent = i + 1;
          pageSelect.appendChild(option);
        }
      }, 10);
    },
    cellMouseEnter: function(e, cell) {
      //setup tooltips
      const cellEl = cell.getElement();
      let tooltip = document.getElementById(`${id}-tooltip`);
      let tooltipText = cell.getValue();
      let popperInstance = createPopper(cellEl, tooltip, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
      let tooltipTextContent = document.getElementById(
        `${id}-tooltipTextContent`
      );
      tooltipTextContent.textContent = tooltipText;
      tooltip.setAttribute("data-show", "");
      popperInstance.update();
      //let tooltip = $(`#${id}-tooltip`)[0];
      //let tooltipTextContent = $(`#${id}-tooltipTextContent`);
      //$(tooltipTextContent).text(`${tooltipText}`);
    },
    cellMouseLeave: function(e, cell) {
      let tooltip = document.getElementById(`${id}-tooltip`);
      //let tooltip = $(`#${id}-tooltip`)[0];
      tooltip.removeAttribute("data-show");
    },
  });

  //*Table Element
  let tableEl = document.querySelector(`#${id}`);

  //* create and display div element - total number of entries
  let pageLen = document.createElement("div");
  pageLen.classList.add("page-length");
  let tabulatorPageSize = tableEl.querySelector(".tabulator-page-size");
  insertAfter(pageLen, tabulatorPageSize);
  let len = document.createElement("p");
  len.classList.add("tabulator-len");
  len.textContent = `， 總共 ${table.getData().length} 筆，第 `;
  let pageLength = tableEl.querySelector(".page-length");
  pageLength.append(len);
  //$(pageLen).addClass("page-length");
  //let tabulatorPageSize = $(`#${id}`).find(".tabulator-page-size")[0];
  //$(pageLen).insertAfter(tabulatorPageSize);
  //$(len).addClass("tabulator-len")
  //let pageLength = $(`#${id}`).find(".page-length")[0];
  //$(len).appendTo(pageLength);

  //* create and display dropdown element - page selection
  let pagination = tableEl.querySelector(".tabulator-page-size");
  let pageSelect = document.createElement("select");
  pageSelect.classList.add("tabulator-page-num");
  insertAfter(pageSelect, pageLen);
  createNumPages(pagination, table, pageSelect);
  //let pagination = $(`#${id}`).find(".tabulator-page-size");
  //$(pageSelect).addClass("tabulator-page-num");
  //$(pageSelect).insertAfter(pageLen)

  //* create and display div element - 頁
  let page = document.createElement("div");
  page.classList.add("page-num");
  insertAfter(page, pageSelect);
  let num = document.createElement("p");
  num.textContent = ` 頁 `;
  page.append(num);
  //$(page).addClass("page-num");
  //$(page).insertAfter(pageSelect);
  //$(num).appendTo(page);

  //* change the total number of pages based on the number of rows displayed in a page
  pagination.addEventListener("change", function() {
    pageSelect.innerHTML = "";
    createNumPages(pagination, table, pageSelect);
  });
  // $(pagination).on('change', function () {
  //     $(pageSelect).find('option').remove();
  //     createNumPages(pagination, table, pageSelect);
  // });

  //* go to the selected page
  pageSelect.addEventListener("change", function() {
    let selected = pageSelect.value;
    table.setPage(selected);
  });
  // $(pageSelect).on('change', function () {
  //     let selected1 = $(pageSelect).children("option:selected").val();
  //     table.setPage(selected);
  // });

  //* change the selected page based on the button clicked
  let tabulatorPageButtons = document
    .getElementById(id)
    .querySelectorAll(".tabulator-page");
  tabulatorPageButtons.forEach((btn) => {
    btn.addEventListener("click", function() {
      let button = btn.getAttribute("data-page");
      let selected = pageSelect.value;
      if (button == "prev") {
        pageSelect.value = selected - 1;
      } else if (button == "next") {
        let next = parseInt(selected) + 1;
        pageSelect.value = next;
      } else if (button == "first") {
        pageSelect.value = 1;
      } else {
        let last = pageSelect.options[pageSelect.options.length - 1].value;
        pageSelect.value = last;
      }
    });
  });
  // let tabulatorPageButtons = $(`#${id}`).find(".tabulator-page");
  // tabulatorPageButtons.on('click', function () {
  //     let button = $(this).attr("data-page");
  //     let pages = $(`#${id}`).find(".tabulator-page-num");
  //     let selected = pages.children("option:selected").val();

  //     if (button == 'prev') {
  //         $(pageSelect).val(selected - 1);
  //     } else if (button == 'next') {
  //         let next = parseInt(selected) + 1;
  //         $(pageSelect).val(next);
  //     } else if (button == 'first') {
  //         $(pageSelect).val(1);
  //     } else {
  //         let last = $(`#${id}`).find('.tabulator-page-num option:last').val();
  //         $(pageSelect).val(last);
  //     }
  // });

  //* filter function for the table
  function filterTable() {
    function matchAny(data, filterParams) {
      var match = false;
      for (var key in data) {
        let newData = "";
        if (typeof data[key] === "number") {
          newData = data[key].toString();
        } else {
          newData = data[key];
        }

        if (newData && newData.includes(filterParams.value)) {
          // data[key] === filterParams.value
          match = true;
        }
      }
      return match;
    }

    const filterInput = document.getElementById(`${id}-tableFilter`);
    //const filterInput = $(`#${id}-tableFilter`)[0];
    filterInput.addEventListener("keyup", () => {
      table.setFilter(matchAny, {
        value: filterInput.value,
      });
      if (filterInput.value == "") {
        table.clearFilter();
      }
    });
  }

  function createTooltips() {
    let tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add("tabulator-tooltip");
    tooltipDiv.setAttribute("id", `${id}-tooltip`);
    tooltipDiv.setAttribute("role", "tooltip");
    const tooltipTextContent = document.createElement("span");
    tooltipTextContent.textContent = "";
    tooltipTextContent.setAttribute("id", `${id}-tooltipTextContent`);
    tooltipDiv.appendChild(tooltipTextContent);
    let arrowDiv = document.createElement("div");
    arrowDiv.classList.add("tabulator-arrow-tooltip");
    arrowDiv.setAttribute("id", `${id}-tooltipArrow`);
    tooltipDiv.appendChild(arrowDiv);
    let tableDiv = document.getElementById(id);
    insertAfter(tooltipDiv, tableDiv);
    //$(tooltipDiv).addClass("tabulator-tooltip");
    //$(tooltipDiv).attr("id", `${newId}-tooltip`);
    //$(tooltipDiv).attr("role", "tooltip");
    //$(tooltipTextContent).text("");
    //$(tooltipTextContent).attr("id", `${id}-tooltipTextContent`);
    //$(arrowDiv).addClass("tabulator-arrow-tooltip");
    //$(arrowDiv).attr("id", `${id}-tooltipArrow`);
    //let tableDiv = $(`#${id}`);
    //$(tooltipDiv).insertAfter(tableDiv);
  }

  return table;
}

//* calculate the total number of pages based on the number of rows displayed in a page
function createNumPages(pagination, table, pageSelect) {
  let selected = pagination.value;
  if (selected === "true") {
    selected = table.getData().length;
  }
  let numPages = Math.ceil(table.getData().length / selected);
  for (let i = 0; i < numPages; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", i + 1);
    option.textContent = i + 1;
    pageSelect.appendChild(option);
    //$(pageSelect).append($("<option>").attr('value', i + 1).text(i + 1));
  }
}

//* show and hide columns based on selection
export function showCols(showCols, totalCols, table) {
  //showCols => columns to show
  // loop through totalCols
  for (let i = 0; i < totalCols.length; i++) {
    if (showCols.includes(totalCols[i].value)) {
      table.showColumn(totalCols[i].value);
    } else {
      table.hideColumn(totalCols[i].value);
    }
  }
  table.redraw(true);
}
