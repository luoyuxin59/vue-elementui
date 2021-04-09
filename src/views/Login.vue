<template>
  <div id="login">
    <div class="bgImg">
      <!-- <img src="../assets/img/bg.png" alt="logo" /> -->
    </div>
    <div class="box">
      <h2 class="logintext">用户登录</h2>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginRules"
        label-width=""
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" class="text" prop="userName">
          <el-input class="ipt" v-model.trim="loginForm.userName"  :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="text" prop="passWord">
          <el-input
            class="ipt"
            v-model.trim="loginForm.passWord"
            type="password"
            :clearable="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="ckb">
             <div class="remember">
                <input
                class="checkbox"
                v-model="loginForm.remember"
                type="checkbox"
              />
              <span class="ckbText">记住密码</span>
             </div>
             <div class="forget">忘记密码</div>
            </div> -->
      <el-button class="loginBtn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
// import {login} from '@/netwrok/index.js'
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginForm: {
        userName: "",
        passWord: "",
      },
      loginRules: {
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login() {
       this.$refs.loginRules.validate((valid) => {
                if (valid) {
      login(this.loginForm).then( res => {
        console.log(res);
        if(res.Code == undefined) {
          this.$message.error(`登录失败,请检查服务`);
        } else if(res.Code == 200) {
          this.$message.success('登录成功')
          sessionStorage.setItem('token',res.Producer.sessionId)
          sessionStorage.setItem('username',res.Producer.username)
          sessionStorage.setItem('role',res.Producer.role)
           this.$router.push('/')
        }else {
          return  this.$message.error(`${res.Message},用户名或者密码错误`);
        }
      }).catch(err => {
         this.$message.error(`登录失败,请检查服务`);
      })
       }
      })
    }
  }
  }
</script>

<style scoped>
#login {
  height: 100vh;
}
#login .bgImg {
  width: 100%;
  height: 100%;
}
#login .bgImg img {
  width: 100%;
  height: 100%;
}
#login .box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  padding: 50px 80px;
}
.el-form .el-form-item {
  margin-bottom: 20px;
}
.el-form .el-form-item .el-input__inner {
  height: 40px;
  line-height: 40px;
}
/deep/ .el-form-item.is-error .el-input__inner {
  border-color: #fff;
  height: 40px;
}
/deep/ .el-form-item.is-error .el-input__validateIcon {
  color: #fff;
}
/deep/ .el-form-item__error {
  color: #087d44;
}

.logintext {
  color: #087d44;
  padding-bottom: 40px;
}
#login .box .loginBtn {
  margin-top: 25px;
  width: 440px;
  height: 60px;
  color: #fff;
  font-size: 24px;
  background-color: #087d44;
}
#login .box .ckb {
  display: flex;
  justify-content: space-between;
  color: #087d44;
  font-size: 16px;
}
#login .box .ckb .remember .checkbox {
  vertical-align: middle;
  margin-top: -4px;
  width: 16px;
  height: 16px;
  border: 1px solid red;
  border-radius: 3px;
  margin-right: 5px;
}
</style>
