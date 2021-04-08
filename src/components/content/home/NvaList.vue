<template>
  <div id="navList">
    <i :class="`icon ${icon}`" @click="isShow"></i>
    <el-menu
      :default-active="onRoutes"
      unique-opened
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true">
      <template v-for="(nav, index) in navList">
        <el-menu-item :index="nav.index" :key="index" v-if="!nav.child">  
        <i :class="`iconfont ${nav.icon}`"></i>
       {{ nav.title }}
      </el-menu-item>
      <el-submenu :index="index + ''"  :key="index"   v-if="nav.child && nav.child.length >= 1">
        <template slot="title">
          <i :class="nav.icon"></i>
          <span slot="title">{{nav.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
          :index="navItem.index"
          v-for="(navItem, index) in nav.child"
          :key="index"
          >{{navItem.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      icon: 'el-icon-s-fold',
      isCollapse: false,
      navList: [
        {
          title: "导航一",
          icon: "el-icon-s-platform",
          child: [
            {
              title: "表单",
              index: "form",
            },
            {
              title: "表格",
              index: "table",
            },
            {
              title: "文件上传下载",
              index: "upload",
            },
            {
              title: "Excel导入导出",
              index: "excelImport",
            }
          ],
        },
        {
          title: "导航二",
          icon: "el-icon-s-opportunity",
          index: "two"
        },
     
      ],
    };
  },
  computed: {
      onRoutes() {
          let a = '';
          a = this.$route.path.replace('/', '');
          return a
        }
    },
  created() {},
  mounted() {},
  methods: {
    isShow() {
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse) {
        this.icon = 'el-icon-s-unfold'
      }else {
         this.icon = 'el-icon-s-fold'
      }
       this.$emit('collapse',this.isCollapse)
    },
  },
};
</script>

<style scoped lang="scss">
#navList {
  position: relative;
  .el-menu {
    width: 100%;
    border-right: none;
  }
  .icon {
    padding-left: 50%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
