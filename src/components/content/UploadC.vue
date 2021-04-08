<template>
  <div id=" upload">
    <el-upload
    class="upload-demo"
    ref="upload"
    :headers="headers"
    :action="action"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="success"
    :on-error="error">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
  </div>
</template>
<script>
import { Loading } from 'element-ui';

export default {
  name:'',
  components: {},
  data() {
    return {
      headers: {}, //上传携带的请求头
      action: '',  //上传的地址
      fileList: [],  //文件列表
      options: {
        lock:true,    //是否锁定
        text:"拼命上传中...",   //显示在加载图标下方的加载文案
        background:'rgba(0,0,0,.7)',   //遮罩背景色
      },
      loadingInstance: '',
    }
 },
  computed: {},
  created() {},
  mounted() {
  },
  methods: {
    submitUpload() { //上传
      this.loadingInstance = Loading.service(this.options);
      this.$refs.upload.submit();
    },
    success(response) { //上传成功
      console.log(response);
      this.loadingInstance.close();

    },
    error(err, file) {  //上传失败
      console.log(err);
      console.log(file);
      that.loadingInstance.close()

    },
    handlePreview(file) { //点击文件列表中已上传的文件时的钩子
      console.log(file);
    },
    handleRemove(file, fileList) { //文件列表移除文件时的钩子	
      console.log(file);
    }
  },
};
</script>

<style scoped lang="scss">

</style>
