<template>
  <!-- card-detail >> table -->
  <div class="detail-table">
    <div class="row detail-table-row">
      <div :class="colClass" v-for="(entry, i) in table" :key="i">
        <div class="row">
          <div :class="colKeyClass">{{ entry.key }} </div>
          <div :class="colValClass" > {{ entry.value }}</div>
        </div>
      </div>
    </div>            
  </div>
</template>

<script>

export default {
    data() {
      return {
      
      }
    },
    props: {
        colNum: Number,
        table: Array,
        
    },
    computed: {
        colClass() {
            let style = 'table-col'
            if (this.colNum == 3) {
                style = style.concat(' col-6 col-md-4');
            } else if (this.colNum == 1) {
                style = style.concat(' col-12');
            } else if (this.colNum == 4) {
                style = style.concat(' col-6 col-md-3')
            } else {
               style = style.concat(' col-12 col-md-6')
            }
            return style;
        },
        colKeyClass() {
            let style = 'table-col-title'
            if (this.colNum == 3 || this.colNum == 4 || this.colNum == 2) {
                style = style.concat(' col-4');
            } else {
                style = style.concat(' col-1')
            }
            return style;
        },
        colValClass() {
            let style = 'table-col-detail'
            if (this.colNum == 3 || this.colNum == 4 || this.colNum == 2) {
                style = style.concat(' col-8');
            } else {
                style = style.concat(' col-11')
            }
            return style;
        }
    }
}
</script>

<style scoped>

/* .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding-left: 0px;
    padding-right: 0px;
} */

/* .table-col-title {
    padding-left: 5px;
}

.table-col-detail {
    padding-left: 5px;
} */


</style>