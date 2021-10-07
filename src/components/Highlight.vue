<template>
  <!-- highlight -->
  <div class="content-highlight">
    <div class="highlight-inner">
      <div class="highlight-item insurance-info">
        <ul>
          <li class="highlight-insurance-no">
            <button @click="showMsgBtnClick">訊息提示</button>
          </li>
          <li class="highlight-insurance-no">
            <span class="highlight-li">保單查詢</span>
            <span>{{ num }}</span>
          </li>
          <li class="highlight-insurance-applicant">
            <span class="highlight-li">要保人ID</span>
            <span>{{ applicant }}</span>
          </li>
          <li class="highlight-insurance-assured">
            <span class="highlight-li">被保人ID</span>
            <span>{{ assured }}</span>
          </li>
        </ul>
      </div>
      <div class="highlight-item insurance-type">
        <ul>
          <li>TWD新台幣</li>
          <li>電子保單</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    num() {
      return this.$store.state.insPolicyNumber;
    },
    applicant() {
      return this.$store.state.applicant;
    },
    assured() {
      return this.$store.state.assured;
    },
  },
  methods: {
    showMsgBtnClick() {
      this.$router.push({ name: "HomePage"})
    },
  },
  // props: {
  //     num: String,
  //     applicant: String,
  //     assured: String
  // }
};
</script>
