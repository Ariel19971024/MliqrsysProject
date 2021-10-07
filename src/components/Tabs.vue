<template>
  <!-- card -->
  <div class="content-card">
    <div class="card-inner">
      <b-tabs class="card-tab" lazy>
        <div v-for="(tab, i) in 10" :key="i">
          <b-tab
            v-if="i < tabLen"
            :title="titles[i]"
            class="tab"
            :value="titles[i]"
            v-model="titles[i]"
            @click="handler(i)"
          >
            <!-- <Tooltip id="a" :name="titles[i]" /> -->
            <slot :name="i + 1"></slot>
          </b-tab>
        </div>
        <div id="tooltip" class="tabs-tooltip" role="tooltip">
          {{ tooltipText }}
          <div id="arrow" data-popper-arrow></div>
        </div>
      </b-tabs>
    </div>
  </div>
</template>

<script>
//import * as $ from "jquery";
import { createPopper } from "@popperjs/core";

export default {
  props: {
    titles: Array,
    tabLen: Number,
  },
  data() {
    return {
      
      tooltip: null,
      tooltipText: "",
      popperInstance: null,
      // showEvents: ["mouseenter", "focus"],
      // hideEvents: ["mouseleave", "blur"],
    };
  },
  methods: {
    handler(i){
      // console.log(this.titles[i])
      this.$emit('tab-call-api',this.titles[i])
    },
    show() {
      this.tooltip.setAttribute("data-show", "");
      // We need to tell Popper to update the tooltip position
      // after we show the tooltip, otherwise it will be incorrect
      this.popperInstance.update();
    },
    hide() {
      this.tooltip.removeAttribute("data-show");
    },
  },
  mounted() {
    //create tooltips for tabs and asideBtn(瀏覽紀錄)
    function show(tooltip, popperInstance) {
      tooltip.setAttribute("data-show", "");
      popperInstance.update();
    }

    function hide(tooltip, popperInstance) {
      tooltip.removeAttribute("data-show");
    }

    setTimeout(() => {
      const tabDiv = document.querySelector(".nav-tabs");
      const tabs = tabDiv.querySelectorAll("li");
      const asideBtn = document.querySelector(".aside-btn");
      //const asideBtn = $(".aside-btn")[0];
      const tooltipItems = [...tabs, asideBtn];
      let tooltip = document.getElementById("tooltip");
      //let tooltip = $("#tooltip")[0];
      for (let i = 0; i < tooltipItems.length; i++) {
        let popperInstance = createPopper(tooltipItems[i], tooltip, {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ],
        });

        tooltipItems[i].addEventListener("mouseenter", (e) => {
          if (e.target.title) {
            this.tooltipText = e.target.title;
          } else if (e.target.text) {
            this.tooltipText = e.target.text;
          } else {
            this.tooltipText = e.target.children[0].text;
          }
          show(tooltip, popperInstance);
        });
        tooltipItems[i].addEventListener("mouseleave", () => {
          hide(tooltip, popperInstance);
        });

        // $(tooltipItems[i]).on("mouseenter", (e) => {
        //   if(e.target.title){
        //     this.tooltipText = e.target.title;
        //   }else if (e.target.text) {
        //     this.tooltipText = e.target.text;
        //   } else {
        //     this.tooltipText = e.target.children[0].text;
        //   }
        //   show(tooltip,popperInstance);
        // });
        // $(tooltipItems[i]).on("mouseleave", () => {
        //   hide(tooltip, popperInstance);
        // });
      }
    }, 100);
  },
  // mounted() {
  //   setTimeout(() => {
  //     const tabs = $(".nav-tabs").find("li");
  //     this.tooltip = $("#tooltip")[0];
  //     for (let i = 0; i < tabs.length; i++){
  //       let popperInstance = createPopper(tabs[i], this.tooltip, {
  //       modifiers: [
  //         {
  //           name: "offset",
  //           options: {
  //             offset: [0, 8],
  //           },
  //         },
  //       ],
  //     });
  //     }
  //     this.popperInstance = createPopper(tabs[0], this.tooltip, {
  //       modifiers: [
  //         {
  //           name: "offset",
  //           options: {
  //             offset: [0, 8],
  //           },
  //         },
  //       ],
  //     });
  //     $(tabs[0]).on("mouseenter", (e) => {
  //       if(e.target.text){
  //         this.tooltipText = e.target.text;
  //       }else{
  //         this.tooltipText = e.target.children[0].text
  //       }
  //       this.show();
  //     });
  //     $(tabs[0]).on("mouseleave", () => {
  //       this.hide();
  //     });
  //   }, 100);
  // },
  computed: {
    tabs() {
      return this.titles.length;
    },
    emptyTabs() {
      return 10 - this.titles.length;
    },
  },
};
</script>

<style>
.tabs-tooltip {
  background-color: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  z-index: 10;
}

#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^="top"] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^="bottom"] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^="left"] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^="right"] > #arrow {
  left: -4px;
}

#tooltip {
  /* ... */
  display: none;
}

#tooltip[data-show] {
  display: block;
}

.here {
  font-size: 20px;
}

.nav-tabs .nav-link {
  border: none !important;
  border-top-left-radius: 0rem !important;
  border-top-right-radius: 0rem !important;
}

.nav-tabs {
  margin-bottom: 12px !important;
}
</style>
