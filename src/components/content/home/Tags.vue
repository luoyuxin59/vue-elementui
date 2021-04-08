<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :key="index"
        :class="{ active: isActive(item.path)}">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}</router-link>
          <span class="tags-li-icon" @click="closeTags(index)">
          <i class="icon el-icon-close"></i>
          </span>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
export default {
  name: "Tags",
  components: {},
  data() {
    return {
      tagsList: [],
    };
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
  },
  created() {
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on("close_current_tags", () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push("/");
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    });
  },
  mounted() {},
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    closeTags(index) {
      // 关闭单个标签
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/");
    },
    setTags(route) {
      //设置标签
      console.log(route);
      console.log(this.tagsList);
      const isExist = this.tagsList.some((item) => {
        console.log(item);
        console.log(item.path);
        console.log(route.fullPath);
        return item.path === route.fullPath;
      });
      console.log(isExist);
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          // 最多保留8个标签
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          // name: route.matched[1].components.default.name
        });
        console.log(this.tagsList);
      }
      bus.$emit("tags", this.tagsList);
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    },
  },
};
</script>

<style scoped lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title, .icon {
  color: #409EFF
;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
