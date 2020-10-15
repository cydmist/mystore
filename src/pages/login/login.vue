<template>
  <div class="loginto">
    <div class="box">
      <h3 class="center">登录</h3>
      <div class="far">
        账号：<el-input
          v-model="form.username"
          placeholder="请输入账号"
        ></el-input>
      </div>
      <div class="far">
        密码：<el-input
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </div>
      <div class="far center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
   computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    }),
    login() {
      reqLogin(this.form).then((res) => {
        
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //存起来res.data.list的信息
          this.changeUserInfoAction(res.data.list)
          console.log(res.data.list);
          this.$router.push("/");
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.loginto {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.box {
  width: 400px;
  padding: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.center {
  text-align: center;
}
.far {
  margin-bottom: 20px;
}
</style>