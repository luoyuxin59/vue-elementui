<template>
  <div id="header">
    <div class="left">
      <img class="logo" src="@/assets/img/logo.png" alt="">
      <h2>abcdefg</h2>
    </div>
    <div class="right">
      <i class="icon el-icon-switch-button"></i>
      <span class="exit" @click="exit">退出</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'Header',
  components: {},
  data() {
    return {}
 },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    exit() {

    }
  },
};
</script>

<style scoped lang="scss">
#header {
  .left {
    float: left;
    line-height: 60px;
    display: flex;
    .logo {
      height: 60px;
      line-height: 60px;
    }
  }
  .right {
    float: right;
    line-height: 60px; 
    cursor: pointer;
    .icon {
      vertical-align: middle;
      font-size: 20px;
    }
    .exit {
      margin-left: 5px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
</style>
