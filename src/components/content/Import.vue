<template>
  <div id="excel">
    <excel
      :excelData="excelData"
      :dataName="dataName"
      :dataName1="dataName1"
      @data="importExcel">
    </excel>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import Excel from "../common/Excel";
export default {
  name: "Import",
  components: {
    Excel,
  },
  data() {
    return {
      tableData: [],
      excelData: [
        {
          date: '1',
          name: '2',
          address: '3'
        },
      ],
      dataName:[{
        "date":"日期",
        "name":"名称",
        "address":"地址"
      }],
      dataName1:{
        "日期":"date",
        "名称":"name",
        "地址":"address"
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    importExcel(data) {
      console.log(data);
      this.tableData = data
    }
  },
};
</script>

<style scoped lang="scss"></style>
