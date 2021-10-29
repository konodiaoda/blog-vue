<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登陆</div>
      <!--登陆表单-->
      <el-form
          status-icon
          :model="loginForm"
          :rules="rules"
          ref="ruleForm"
          class="login-form">
        <!--用户名输入框-->
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user-solid"
              placeholder="用户名"
              @keyup.enter.native="login">
          </el-input>
        </el-form-item>
        <!--          密码输入框-->
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              prefix-icon="iconfont el-icon-mymima"
              show-password
              placeholder="密码"
              @keyup.enter.native="login"
          />
        </el-form-item>
      </el-form>

      <!-- 登录按钮 -->
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>


</template>

<script>

import {generaMenu} from "@/assets/js/menu";
import TencentCaptcha from 'TencentCaptcha';
export default {
  data: function () {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{required: true, message: "用户名不能为空", trigger: "blur"}],
        password: [{required: true, message: "密码不能为空", trigger: "blur"}]
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const that = this;
          let tencentCaptcha = new TencentCaptcha(
              this.config.TENCENT_CAPTCHA,
              function (res) {
                if (res.ret === 0) {
                  //登陆
                  let params = new URLSearchParams();
                  params.append("username", that.loginForm.username);
                  params.append("password", that.loginForm.password);
                  that.axios.post("/api/login", params).then(({data}) => {
                    if (data.flag) {
                      // 登录后保存用户信息
                      that.$store.commit("login", data.data);
                      // 加载用户菜单
                      generaMenu();
                      that.$message.success("登录成功");
                      that.$router.push({path: "/"});
                    } else {
                      that.$message.error(data.message);
                    }
                  });
                }
              }
          );
          //显示验证码
          tencentCaptcha.show();
        } else {
          return false;
        }
      })
    }
  }
}

</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url(https://wjh-myblog.oss-cn-chengdu.aliyuncs.com/img/雪树.jpg) center center /
    cover no-repeat;
}

.login-card {
  display: flex;
  position: relative;
  margin: 250px auto;
  width: 300px;
  height: 250px;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  z-index: 1;
  background: inherit;
  border-radius: 18px;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  /* + 两边各有一个空格  否则 无效*/
  height: calc(100% + 20px);
  background: inherit;
  box-shadow: 0 0 0 200px rgba(255, 255, 255, .2) inset;
  z-index: -1;
  filter: blur(6px);
  overflow: hidden;
}

.login-title {
  font-size: 18px;
  font-weight: 400;
  color: #3d5245;
}

.login-form {
  margin-top: 1.2rem;
}

.login-card button {
  margin: 6px 0;
  height: 36px;
  background-color: rgba(255, 255, 255, .3);
  border: none;
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
}

.login-form input::placeholder {
  color: #3d5245;
}

.login-card button {
  position: relative;
  margin-top: 24px;
  background-color: rgba(57, 88, 69, .4);
  color: #ffffff;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s;
}

.login-card button:hover {
  background-color: rgba(12, 88, 38, 0.67);
}

.login-card button::before,
.login-card button::after {
  content: '';
  display: block;
  width: 80px;
  height: 100%;
  background-color: rgba(179, 255, 210, .5);
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-card button::after {
  width: 40px;
  background-color: rgba(179, 255, 210, .3);
  left: 60px;
  filter: blur(5px);
  opacity: 0;
}

.login-card button:hover::before {
  transition: all 1s;
  transform: translateX(320px);
  opacity: 0.7;
}

.login-card button:hover::after {
  transition: all 1s;
  transform: translateX(320px);
  opacity: 1;
}
</style>
