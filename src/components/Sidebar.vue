<template>
  <!-- aside-group -->
  <div :class="sidebarClass" class="aside-group" id="aside_func">
    <!-- aside-group-item -->
    <div class="aside-group-item aside-group-history">
      <div class="aside-item-title">標籤紀錄</div>
      <div class="aside-item-detail">
        <ul v-if="history.length !== 0" class="aside-history-div">
          <history-tag
            v-for="route in history"
            :key="route.id"
            :id="route.id"
            :path="route.path"
            :name="route.cName"
          />
        </ul>
        <ul v-else>
          <li class="tag-null">無瀏覽紀錄</li>
        </ul>
        <div class="history-cancel">
          <div class="history-cancel-inner">
            <span class="history-cancel-inner-span" @click="removeAllHistory">全部移除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryTag from "./HistoryTag.vue";
export default {
  components: {
    HistoryTag,
  },
  data() {
    return {};
  },
  props: {
    toggle: Boolean,
  },
  computed: {
    sidebarClass() {
      // console.log(this.toggle);
      let style = "aside-group";
      if (this.toggle) {
        style = style.concat(" aside-open");
      }
      return style;
    },
    history() {
      return this.$store.state.history;
    },
  },
  methods: {
    removeAllHistory() {
      this.$store.dispatch("clearHistory");
    },
  },
};
</script>

<style>
.history-cancel .history-cancel-inner-span:hover {
  background: #ff6621;
  color: #fff;
  cursor: pointer;
}

.history-cancel .history-cancel-inner-span{
  display: block;
  border: #ff6621 solid 1px;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  padding: 5px;
  color: #ff6621;
  opacity: 1;
}
</style>
