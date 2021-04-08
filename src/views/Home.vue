<template>
  <div id="home">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="width">
          <nav-list @collapse="collapse"></nav-list>
        </el-aside>
        <el-main>
          <tags></tags>
          <div class="content">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/content/home/Header";
import NavList from "@/components/content/home/NvaList"; 
import Tags from "@/components/content/home/Tags";

import bus from "@/utils/bus"
export default {
  name: "Home",
  data(){
    return {
      width: '201px',
      tagsList: []
    }
  },
  components: {
    Header,
    NavList,
    Tags
    },
  created() {
    bus.$on('tags', msg =>{
      console.log(msg);
      let  arr = [];
      for(let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
      console.log(this.tagsList);
    })
  },
  mounted() {},
  methods: {
    collapse(val) { //监听导航栏展开和隐藏
        val ?  this.width = '50px' : this.width = '201px';
    }
  }
};
</script>

<style scoped lang="scss">
#home {
  height: 100vh;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #ccc;
  }
  .el-aside {
    height: 100%;
    border-right: 1px solid #ccc;
  }
  .content {
    padding: 10px;
  }
}
</style>
