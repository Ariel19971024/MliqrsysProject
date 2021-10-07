<template>
  <div class="content-component content-breadcrumb">
    <ul>
      <li v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" @click="routeTo(idx)">
        <router-link  :to="breadcrumb.link">{{ breadcrumb.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  data() {
    return {
      breadcrumbList: [],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(this.breadcrumbList[pRouteTo].link);
      }
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
  },
  created(){
    this.updateList();
  }
}
</script>