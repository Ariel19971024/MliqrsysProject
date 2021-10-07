<template>
  <header class="frame-content headerModule">
    <div class="headerModule-inner">
      <div class="header-item header-title">
        <div class="menu-btn">
          <a :class="menu" @click="menuToggle($event)">
            <span class="menu-bar"></span>
          </a>
        </div>
        <div class="header-title-name">
          <h1 id="system-header">{{ name }}</h1>
        </div>
      </div>
      <DateTime />
    </div>
  </header>
</template>

<script>
import DateTime from '@/components/DateTime.vue';

export default {
  data() {
    return{
      expanded: true,
    }
  },
  props: {
    name: String,
  },
  components: {
    DateTime
  },
  computed: {
    menu: function () {
      return {
        'header-icon menu-active': this.expanded,
        // 'header-icon right-fluid': !this.expanded
      }
    }
  },
  methods: {
    menuToggle() {
      this.expanded = !this.expanded;
      this.$emit('ham-clicked', this.expanded);
    }
  }
}
</script>

<style scoped>

.header-icon {
  cursor: pointer;
}

</style>