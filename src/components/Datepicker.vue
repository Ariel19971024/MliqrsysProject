<template>
    <div>
        <span id="date" class="header-info-date"></span>
    </div>
</template>

<script>
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";

export default {
  name: "Datepicker",
  data() {
      return {

      }
  },
  mounted: function() {
    $('#date').datepicker({
      dateFormat: 'yymmdd',
      // changeMonth: true,
      // changeYear: true,
    });
  },
  beforeDestroy: function() {
    $("#date")
      .datepicker("hide")
      .datepicker("destroy");
  },
}
</script>