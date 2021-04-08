<template>
  <div class="paging">
    <div class="paging">
      <el-pagination
        @prev-click="prev"
        @next-click="next"
        @current-change="currentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="query.pageSize"
        :total="total" >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "Paging",
  components: {},
  props: {
    total: {
      type: Number,
      default: 0
    },
    query: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    prev() {
      this.$emit('prev',this.query.pageNum --)
    },
    next() {
      this.$emit('next',this.query.pageNum ++)
    },
    currentChange(val) {
      this.$emit('currentChange',val)
    },
    handleSizeChange(val) {
      console.log(val);
      this.$emit('handleSizeChange',val)
    }
  },
};
</script>

<style scoped>
.paging {
  margin-left: 50%;
  transform: translate(-60%);
}
</style>
