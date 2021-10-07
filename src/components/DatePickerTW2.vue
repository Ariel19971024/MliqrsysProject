<template>

  <div>
    <label>
      <input
        type="text"
        :id="id"
        class="datepickerTW"
        autocomplete="off"
        placeholder="查詢日期"
        @keyup="ClearDate"
      />
    </label>
  </div>



</template>
<script>
import "jquery-ui/ui/widgets/datepicker";
import * as $ from "jquery";
export default {
  name: "DatePickerTW",
  props: {
    id: String,
    date: {
      type: Date,
      required: false,
    },
  },
  methods: {
    ClearDate() {
      //  console.log("hi")
      this.dateSaved = "";
      this.$emit("update:dateChange", this.dateSaved);
    },
  },
  data() {
    return {

      dateSaved: "",
      
    };
  },
  // watch: {
  //   date(value) {
  //     $(".datepickerTW").val(value);
  //     this.valueDate = $(".datepickerTW").val();
  //   },
  // },
  mounted() {
    const vm = this;
    // (function() {
    //let yearTextSelector = ".ui-datepicker-year";

    let dateNative = new Date();

    let dateTW = new Date(
      dateNative.getFullYear() - 1911,
      dateNative.getMonth(),
      dateNative.getDate()
    );
    console.log(dateTW);
    function leftPad(val, length) {
      let str = "" + val;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    }

    // 應該有更好的做法
    let funcColle = {
      onSelect: {
        basic: function(dateText, inst) {
          //* 選的西元年
          dateNative = new Date(
            inst.selectedYear,
            inst.selectedMonth,
            inst.selectedDay
          );
          console.log(dateNative);
          vm.dateSaved = dateNative;
          // 年分小於100會被補成19**, 要做例外處理
          let yearTW =
            inst.selectedYear > 1911
              ? leftPad(inst.selectedYear - 1911, 4)
              : inst.selectedYear;
          let monthTW = leftPad(inst.selectedMonth + 1, 2);
          let dayTW = leftPad(inst.selectedDay, 2);
          dateTW = new Date(
            yearTW + "-" + monthTW + "-" + dayTW + "T00:00:00.000Z"
          );
          //民國年

          // yearTW + "-" + monthTW + "-" + dayTW + "T00:00:00.000Z"

          // vm.date=yearTW + "/" + monthTW + "/" + dayTW
          vm.dateSaved = dateTW;
          // console.log(dateTW);

          return $.datepicker.formatDate(twSettings.dateFormat, vm.dateSaved);
          //return $.datepicker.formatDate(twSettings.dateFormat, dateTW)
        },
      },
    };

    let twSettings = {
      closeText: "關閉",
      prevText: "",
      nextText: "",
      currentText: "今天",
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      monthNamesShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      dayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "周",
      dateFormat: "yy/mm/dd",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      //changeYear: false,
      //yearSuffix: "",

      onSelect: function(dateText, inst) {
        let normalYear = funcColle.onSelect.basic(dateText, inst);
        $(this).val(funcColle.onSelect.basic(dateText, inst)); //* => now 民國date
        vm.$emit("update:date", new Date(normalYear)); //* set parent data
        // if (typeof funcColle.onSelect.newFunc === "function") {
        //   funcColle.onSelect.newFunc(dateText, inst);

        // }
        
        vm.$emit("update:dateChange", vm.dateSaved);
        // vm.date = dateText;
      },
    };

    // 把yearText換成民國
    const replaceYearText = function() {
      let yearText = $(".ui-datepicker-year");
      if (!twSettings.changeYear) {
        yearText.text("民國" + dateTW.getFullYear());
      } else {
        // 下拉選單
        if (yearText.prev("span.datepickerTW-yearPrefix").length === 0) {
          yearText.before("<span class='datepickerTW-yearPrefix'>民國</span>");
        }
        yearText.children().each(function() {
          if (parseInt($(this).text()) > 1911) {
            $(this).text(parseInt($(this).text()) - 1911);
          }
        });
      }
    };

    $.fn.datepickerTW = function(options) {
      // setting on init,
      if (typeof options === "object") {
        //onSelect例外處理, 避免覆蓋
        if (typeof options.onSelect === "function") {
          funcColle.onSelect.newFunc = options.onSelect;
          options.onSelect = twSettings.onSelect;
        }
        // year range正規化成西元, 小於1911的數字都會被當成民國年
        if (options.yearRange) {
          var temp = options.yearRange.split(":");
          for (var i = 0; i < temp.length; i += 1) {
            //民國前處理
            if (parseInt(temp[i]) < 1) {
              temp[i] = parseInt(temp[i]) + 1911;
            } else {
              temp[i] =
                parseInt(temp[i]) < 1911 ? parseInt(temp[i]) + 1911 : temp[i];
            }
          }
          options.yearRange = temp[0] + ":" + temp[1];
        }

        // if input val not empty
        if ($(`#${vm.id}`).val() !== "") {
          options.defaultDate = $(`#${vm.id}`).val();
        }
        // if ($(this).val() !== "") {
        //   options.defaultDate = $(this).val();
        // }
      }

      // setting after init
      if (arguments.length > 1) {
        // 目前還沒想到正常的解法, 先用轉換成init setting obj的形式
        if (arguments[0] === "option") {
          options = {};
          options[arguments[1]] = arguments[2];
        }
      }

      // override settings
      $.extend(twSettings, options);

      // init
      $(`#${vm.id}`).datepicker(twSettings);
      //$(this).datepicker(twSettings);

      // beforeRender
      $(`#${vm.id}`).click(function() {
        let isFirstTime = $(`#${vm.id}`).val() === "";
        // year range and default date
        if ((twSettings.defaultDate || twSettings.yearRange) && isFirstTime) {
          if (twSettings.defaultDate) {
            $(`#${vm.id}`).datepicker("setDate", twSettings.defaultDate);
          }

          // 當有year range時, select初始化設成range的最末年
          if (twSettings.yearRange) {
            var $yearSelect = $(".ui-datepicker-year");
            let nowYear = twSettings.defaultDate
              ? $(`#${vm.id}`)
                  .datepicker("getDate")
                  .getFullYear()
              : dateNative.getFullYear();

            $yearSelect.children(":selected").removeAttr("selected");
            if ($yearSelect.children("[value=" + nowYear + "]").length > 0) {
              $yearSelect
                .children("[value=" + nowYear + "]")
                .attr("selected", "selected");
            } else {
              $yearSelect
                .children()
                .last()
                .attr("selected", "selected");
            }
          }
        } else {
          console.log(dateNative);
          $(`#${vm.id}`).datepicker("setDate", dateNative);
        }

        // console.log(dateTW);
        $(`#${vm.id}`).val(
          $.datepicker.formatDate(twSettings.dateFormat, dateTW)
        );

        replaceYearText();

        if (isFirstTime) {
          $(`#${vm.id}`).val("");
        }
      });

      // afterRender
      $(`#${vm.id}`).focus(function() {
        replaceYearText();
      });

      $(`#${vm.id}`).focusout(function() {
        if (vm.dateDisplayed === "") {
          vm.dateSaved = null;
          vm.$emit("update:date", null);
        }
      });

      return this;
    };
    //})();

    $(".datepickerTW").datepickerTW({
      changeYear: true,
      changeMonth: true,
      dateFormat: "yy/mm/dd",
      // yearRange: '-10:2018',
      // defaultDate: '86-11-01',
    });
  },
};
</script>
<style>
.datepickerTW {
  outline: none;
}

.ui-datepicker-title select {
  border-radius: 5px;
  outline: none;
}

.ui-datepicker-header.ui-widget-header.ui-helper-clearfix.ui-corner-all {
  display: flex !important;
  background-color: #e9e9e9;
}

.ui-datepicker-prev.ui-corner-all {
  color: black !important;
  text-decoration: none !important;
}

.ui-datepicker-next.ui-corner-all {
  color: black !important;
  text-decoration: none !important;
}

.ui-datepicker {
  z-index: 15 !important;
}

.ui-datepicker table {
  width: 100%;
  font-size: 0.9em;
  border-collapse: collapse;
  margin: 0 0 0.4em;
}

.ui-datepicker td {
  background-color: #f6f6f6 !important;
  border: 1px solid #c5c5c5 !important;
}

.ui-datepicker th {
  background-color: #fff !important;
}

.ui-datepicker-title {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 8px;
  background-color: #e9e9e9;
}

.ui-state-default {
  color: black !important;
  text-decoration: none !important;
}

td.ui-datepicker-today {
  border: 1px solid #dad55e !important;
  background-color: #fffa90 !important;
}

td.ui-datepicker-today a {
  color: #777620 !important;
}

td.ui-datepicker-current-day {
  border: 1px solid #003eff !important;
  background-color: #007fff !important;
}

td.ui-datepicker-current-day a {
  color: white !important;
}
</style>
