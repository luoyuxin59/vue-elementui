<template>
  <div id="">
    <table-c :tableData="tableData"></table-c>
  </div>
</template>
<script>
import TableC from '@/components/content/table/TableC'
export default {
  name:'Table',
  components: {
    TableC,
  },
  data() {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
 },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    
  },
};
</script>

<style scoped lang="scss">

</style>
