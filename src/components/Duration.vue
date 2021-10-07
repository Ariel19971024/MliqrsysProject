<template :dateEntry="dateEntry">
    <div class="date-picker">
        <div class="date-picker-item date-picker-input">
            <input 
                type="text" 
                placeholder="查詢日期" 
                v-model="dateEntry.from"
                :id="fromId"
            >
        </div>

        <div class="date-picker-item"> ~ </div>

        <div class="date-picker-item date-picker-input">
            <input 
                type="text" 
                placeholder="查詢日期" 
                v-model="dateEntry.to"
                :id="toId"
            >
        </div>
    </div>

</template>

<script>
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";

export default {
  name: "Datepicker",
  // props: ['fromDate', 'toDate'],
  props: {
    dateEntry: Object,
  },
  mounted: function() {
    var self = this;
    var i = this.dateEntry.index;
    // var j = $('div.fromDate').index();
    // console.log(j);

    // console.log($('.fromDate')[i]);
    // $.datepicker.setDefaults( $.datepicker.regional[ "zh-TW" ] );

    // $( function() {
    //   // Reset language
    //   $.datepicker.setDefaults( $.datepicker.regional[ "zh-TW" ] );

    //   // Initialize
    //   // $('#datepicker').datepicker();

    // });

    $('#from_' + i).datepicker({
      dateFormat: 'yy/mm/dd',
      // changeMonth: true,
      // changeYear: true,
      onSelect: function(date1) {
        // console.log(date1);
        self.$emit("from", date1);
      },
      onChange: function(date1) {
        // console.log(date1);
        self.$emit("from", date1);
      },
    });

    $('#to_' + i).datepicker({
      dateFormat: 'yy/mm/dd',
      // changeMonth: true,
      // changeYear: true,
      onSelect: function(date2) {
        // console.log(date2);
        self.$emit("to", date2);
      },
      onChange: function(date2) {
        // console.log(date2);
        self.$emit("to", date2);
      },
    });

    $(function() {
      console.log("FUNCTION");
      //先設定預設西元年的datepicker必要功能
      var old_generateMonthYearHeader = $.datepicker._generateMonthYearHeader;
      var old_formatDate = $.datepicker.formatDate;
      var old_parseDate = $.datepicker.parseDate;

      $.extend($.datepicker, {
        //選擇日期之後的value
        formatDate: function(format, date, settings) {
          var oformatDate = old_formatDate(format, date, settings);
          if (format == "yy/mm/dd") {
            // console.log('IF 1');
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            var fm = function(v) {
              return (v < 10 ? "0" : "") + v;
            };

            if (y - 1911 >= 100) {
              y = y - 1911;
            } else {
              y = "0" + String(y - 1911);
            }
            // console.log('IF 2');
            return y + "" + fm(m) + "" + fm(d);
          }
          return oformatDate;
        },

        //點取已存在日期的parse
        parseDate: function(format, value, settings) {
          var v = new String(value);
          var Y, M, D;
          if (format == "yy/mm/dd") {
            if (v.length == 7) {
              /*1001215*/
              Y = v.substring(0, 3) - 0 + 1911;
              M = v.substring(3, 5) - 0 - 1;
              D = v.substring(5, 7) - 0;
              return new Date(Y, M, D);
            } else if (v.length == 6) {
              /*0981215*/
              Y = "0" + String(v.substring(0, 2) - 0 + 1911);
              M = v.substring(2, 4) - 0 - 1;
              D = v.substring(4, 6) - 0;
              return new Date(Y, M, D);
            }
            return new Date();
          } else {
            var oparseDate = old_parseDate.apply(this, [
              format,
              value,
              settings,
            ]);
            return oparseDate;
          }
        },
        //改變小工具的年
        _generateMonthYearHeader: function(
          inst,
          drawMonth,
          drawYear,
          minDate,
          maxDate,
          secondary,
          monthNames,
          monthNamesShort
        ) {
          var dateFormat = this._get(inst, "dateFormat");
          var htmlYearMonth = old_generateMonthYearHeader.apply(this, [
            inst,
            drawMonth,
            drawYear,
            minDate,
            maxDate,
            secondary,
            monthNames,
            monthNamesShort,
          ]);
          if (dateFormat == "yy/mm/dd") {
            if ($(htmlYearMonth).find(".ui-datepicker-year").length > 0) {
              htmlYearMonth = $(htmlYearMonth)
                .find(".ui-datepicker-year")
                .find("option")
                .each(function(i, e) {
                  console.log(e.textContent);
                  if (Number(e.value) - 1911 > 0) {
                    $(e).text(Number(e.textContent) - 1911);
                  }
                })
                .end()
                .end()
                .get(0).outerHTML;
            }
          }
          return htmlYearMonth;
        },
      });
    });
  },

  beforeDestroy: function() {
    var i = this.dateEntry.index;
    $("#from_" + i)
      .datepicker("hide")
      .datepicker("destroy");

    $("#to_" + i)
      .datepicker("hide")
      .datepicker("destroy");
  },

  computed: {
    fromId() {
      var id = "from_";
      return id.concat(this.dateEntry.index);
    },
    toId() {
      var id = "to_";
      return id.concat(this.dateEntry.index);
    },
  },

  watch: {
    fromDate(value) {
      var i = this.dateEntry.index;
      $("#from_" + i).val(value);
    },
    toDate(value) {
      var i = this.dateEntry.index;
      $("#to_" + i).val(value);
    },
  },

  methods: {
    addDate(num) {
      var i = this.dateEntry.index;
      var from = $("#from_" + i).datepicker("getDate");
      if (!from) {
        alert("Insert a start date!");
      } else {
        try{
          var month = from.getMonth();
          var year = from.getFullYear();
          console.log(month + "," + year)
          if (typeof month !== "number" || typeof year !== "number" ){
            alert("Enter a valid date!")
            return 
          }
          // add month or year depending on the button clicked
          num === 9 ? (month += num) : (year += num);

          // set day to the last day of the month
          var to = new Date(year, month + 1, 0);
          $("#to_" + i).datepicker("setDate", to);
          // $($(".demo")[0])
        }catch(e){
          console.log(e);
          alert("Enter a valid date!")
        }
        
      }
    },
  },
};
</script>

<style></style>
