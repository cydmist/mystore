<template>
  <div>
    <el-container class="index">
      <!-- 侧边栏 -->
      <el-aside class="left" width="200px">
        
       
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              router
              unique-opened
              active-text-color="#ffd04b"
            >
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>

            <div v-for="item in userInfo.menus" :key="item.id">
              <!-- 目录 -->
              <el-submenu :index="item.id+''" v-if="item.children">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for=" x in item.children" :key="x.id" :index="x.url">{{x.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <!-- 菜单 -->
              <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
            </div>
            </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">

          <div class="header-con">
              <h3>{{userInfo.username}}</h3>
              <el-button type="danger" @click="out()">退出登录</el-button>
          </div>

        </el-header>
        <el-main class="main">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
           
          </el-breadcrumb>

          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"


export default {
  
  methods: {
    out(){
      this.changeUserInfoAction({});
      this.$router.push("/login")
    },
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    })
  },
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  }
};
</script>

<style scoped>
.header-con,.el-button{
  float: right;
  margin: 0 20px;
}
.left {
  height: 100vh;
}
.el-header{
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.header {
  background: #b3c0d1;
}
.con {
  padding-top: 20px;
}
.header-con{
  float: right;
}
.header-con h3{
  float: left;
  line-height: 60px;
  font-weight: 400;
}
.header-con .el-button{
  float: left;
  margin-top: 10px;
}
</style>