<template>
  <el-container class="home_container">

    <el-aside :width=" collapsea ? '64px' : '200px'">
      <el-row :gutter="24">
          <el-col :span="24" class="head_left">
            <img src="@/assets/images/logo.png" alt="" width="40">
            <span v-show="!collapsea">后台管理系统</span>
          </el-col>
      </el-row>
       <el-menu
      background-color="#333744"
      text-color="#fff"
      :unique-opened="true"
      :collapse="collapsea"
      :collapse-transition="false"
      active-text-color="#ffd04b"
      router
      >
          <el-submenu v-for="item in meunList" :key="item.id" :index="item.id.toString()">
              <template slot="title">
                <i :class="icons[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/'+ subItem.path">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
          </el-submenu>
      </el-menu>
    </el-aside>

  <el-container>
    <el-header>
      <el-row :gutter="20">
         <el-col :span="2" class="btn_zd">
            <i class="el-icon-s-fold" @click="toggle"></i>
          </el-col>
          <el-col :span="2" :offset="20">
              <el-button type="inof" @click="loginout">退出</el-button>
          </el-col>
      </el-row>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>

</el-container>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      meunList:[],
      icons:{
        "125": "el-icon-s-goods",
        "103": "el-icon-eleme",
        "101": "el-icon-s-tools",
        "102": "el-icon-question",
        "145": "el-icon-picture-outline",
      },
      collapsea:false
    }
  },
  created(){
    this.getMeunList();
  },
  methods: {
    loginout() {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
    async getMeunList(){
      const {data:res} = await this.$http.get("menus");
      if(res.meta.status !== 200) return $message.error(res.meta.msg);
      this.meunList = res.data
      console.log(res);
    },
    toggle(){
      this.collapsea = ! this.collapsea;
    }
  },
}
</script>
<style lang="less" scoped>
  .home_container{
    height: 100vh;
  }
  .el-header{
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    button{
      margin-top: 10px;
    }
    .btn_zd{
      i{
        font-size: 30px;
        margin-top: 12px;
        cursor: pointer;
      }
    }
  }
  .el-aside{
    background-color: #333744;
    .el-menu{
      border:none;
    }
    .head_left{
      color: #fff;
      img{
        margin-top:10px;
        margin-left:10px;
      }
      span{
       vertical-align: 10px;
       margin-left: 20px;
      }
    }
  }
  .el-main{
    background: #fff;
  }
</style>