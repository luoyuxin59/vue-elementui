<template>
  <div id="tableC">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" > </el-table-column>
     <el-table-column prop="address" label="操作" > 
       <template slot-scope="scope">
         <el-button class="remove" type="danger" @click="remove(scope.row)">删除</el-button>
         <el-button class="edit"  type="warning" @click="edit(scope.row)">修改</el-button>
         <el-button class="look" type="info" @click="look(scope.row)">查看</el-button>
         <el-button class="download" type="primary" @click="downLoad(scope.row)">下载</el-button>
       </template>
     </el-table-column>
    </el-table>
    <page :total="total" :query="query" 
      @prev="changePageNum" 
      @next="changePageNum" 
      @currentChange="changePageNum"
      @handleSizeChange="changePageNum"></page>
  </div>
</template>
<script>
import Page from "./Page"
export default {
  name: "",
  components: {
    Page,
  },
  props: ["tableData"],
  data() {
    return {
      total: 30, //总页数
      query: {  //查询参数
        pageSize: 1,
        pageNum: 14
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    remove(row) {  //删除

    },
    edit(row) {  //修改

    },
    look(row) {  //查看

    },
    downLoad(row) {  //下载

    },
    changePageNum(val) { // 点击翻页
      console.log(val);
      this.query.pageNum = val;

    }
  },
};
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 10px;
  .el-button {
    width: 40px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    font-size: 12px !important;
  }
}


</style>
