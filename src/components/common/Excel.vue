<template>
  <div
    class="index"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中..."
  >
    <!-- 操作按钮 -->
    <input
      type="file"
      @change="importExcel(this)"
      id="importExcel"
      style="display: none"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <a id="exportExcel"></a>
    <el-button class="button" @click="btnImportClick">导入数据</el-button>
    <el-button class="button" @click="btnExportClick(excelData)"
      >导出模板</el-button
    >
    <slot name="import"></slot>
    <slot name="export"></slot>
    <!-- 错误提示 -->
    <el-dialog title="提示" :visible.sync="errorDialog">
      <span>{{ errorMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="errorDialog = false">确认</el-button>
      </span>
    </el-dialog>
    <!-- 展示数据 -->
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  name: "Excel",
  data() {
    return {
      elImport: "", //导入el
      elExport: "", //导出el
      errorDialog: false, //错误信息弹窗
      errorMsg: "错误信息", //错误信息内容
      fullscreenLoading: false,
      excelDatas: [],
      deleteData: [], //保持重复的内容
      exprotError: [],
    };
  },
  props: {
    excelData: {
      type: Array,
      default: [],
    },
    dataName: {
      type: Array,
      default: [],
    },
    dataName1: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    this.elImport = document.getElementById("importExcel");
    this.elExport = document.getElementById("exportExcel");
    this.excelDatas = this.excelData;
  },
  methods: {
    //点击导入按钮
    btnImportClick() {
      this.elImport.click();
    },
    //点击导出按钮
    btnExportClick(rs) {
      //生成列名
      let data = this.dataName;
      for (var i = 0; i < rs.length; i++) {
        var obj = rs[i];
        for (var key in obj) {
          var newKey = data[key];
          if (newKey) {
            obj[newKey] = obj[key];
            delete obj[key];
          }
        }
      }
      console.log(rs);
      data = data.concat(rs);
      this.exportExcel(data, "导出数据");
    },
    //导入 Excel
    importExcel() {
      this.fullscreenLoading = true;
      if (!this.elImport.files) {
        this.fullscreenLoading = false;
        return;
      }
      var f = this.elImport.files[0];
      var reader = new FileReader();
      let vm = this;
      reader.onload = function(e) {
        var data = e.target.result;

        if (vm.rABS) {
          //手动转化
          vm.wb = XLSX.read(btoa(this.fixdata(data)), {
            type: "base64",
          });
        } else {
          vm.wb = XLSX.read(data, {
            type: "binary",
          });
        }
        let json = XLSX.utils.sheet_to_json(vm.wb.Sheets[vm.wb.SheetNames[0]]);
        vm.handleImportData(json);
      };

      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    //处理导入的数据
    handleImportData(data) {
      this.fullscreenLoading = true;
      console.log(data);
      let dataName1 = this.dataName1;
      for (var i = 0; i < data.length; i++) {
        var obj = data[i]; //每行数据
        for (var key in obj) {
          console.log(key);
          var newKey = dataName1[key];
          console.log(newKey);
          if (newKey) {
            obj[newKey] = obj[key];
            delete obj[key];
          }
        }
      }
      if (data.length <= 0) {
        this.errorDialog = true;
        this.errorMsg = "导入信息为空";
      } else {
        data.forEach((item1) => {
          var result = this.excelDatas.some((item2) => {  //判断name是否存在
           if (item2.name == item1.name) {
              return true;
            }else {
              return false
            }
          });
          if (result) {
            this.exprotError.push(item1.name);
            this.errorDialog = true;
            this.errorMsg = `${this.exprotError}  重复导入`;
          } else {
            this.excelDatas.push(item1);
          }
        });
      }
      this.elImport.value = "";
      this.fullscreenLoading = false;
      this.$emit("data", data);
    },
    //导出 Excel
    exportExcel(json, downName, type) {
      //获取列名
      let keyMap = [];
      for (let k in json[0]) {
        console.log(k);
        keyMap.push(k);
      }

      //用来保存转换好的json
      let tmpdata = [];
      json
        .map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign(
              {},
              {
                v: v[k],
                position:
                  (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +
                  (i + 1),
              }
            )
          )
        )
        .reduce((prev, next) => prev.concat(next))
        .forEach(function(v) {
          tmpdata[v.position] = {
            v: v.v,
          };
        });

      let outputPos = Object.keys(tmpdata); //设置区域，比如表格从A1到D10
      let tmpWB = {
        SheetNames: ["mySheet"], // 保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, //内容
            {
              "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1], //设置填充区域
            }
          ),
        },
      };

      //创建二进制对象写入转换好的字节流
      let tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type === undefined ? "xlsx" : type,
                bookSST: false,
                type: "binary",
              } //这里的数据是用来定义导出的格式类型
            )
          ),
        ],
        {
          type: "",
        }
      );

      this.elExport.download = downName + ".xlsx"; //下载名称
      this.elExport.href = URL.createObjectURL(tmpDown); //绑定a标签到新创建对象超链接
      this.elExport.click(); //模拟点击实现下载

      //释放，用 URL.revokeObjectURL() 释放
      setTimeout(() => URL.revokeObjectURL(tmpDown), 100);
    },
    //字符串转字符流
    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    },
    //将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    getCharCol(n) {
      let s = "";
      let m = 0;
      while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
    },
    // 文件流转 BinaryString
    fixdata(data) {
      var o = "";
      var l = 0;
      var w = 10240;
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
  },
};
</script>

<style>
.el-table .cell {
  text-align: center;
}
.button {
  margin-bottom: 20px;
}
</style>
