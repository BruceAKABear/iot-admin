<template>
  <el-container>
    <!--侧边栏-->
    <el-aside :width="asideWidth">
      <div class="aside-header">
        <div>
          <img src="../../assets/personal-log.jpg" style="width: 60px" alt="">
        </div>
        <div>
          <span>客户品牌名</span>
        </div>
      </div>
      <el-menu
        :default-active="activePath"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened="true"
        :collapse="asideClose"
        router="true"
      >
        <el-menu-item index="/">
          <template slot="title" >
            <i class="el-icon-s-home"></i>
            <span>主页</span>
          </template>
        </el-menu-item>
        <!--一级菜单-->
        <el-submenu :index="menuitem.id" v-for="(menuitem,indexs) in menulist" :key="indexs">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{menuitem.menuName}}</span>
          </template>
          <!--二级菜单-->
          <el-menu-item :index="submenuitem.path" v-for="(submenuitem,index) in menuitem.children" :key="index" @click="saveNavState(submenuitem.path)">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{submenuitem.menuName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!--头部-->
      <el-header>
        <div class="header-close-open" @click="asideClose=!asideClose">
          <i :class="asideClose?asideCloseIcon:asideOpenIcon"></i>
        </div>
        <div class="header-user-info">
          <div class="header-user-info-userinfo">
            <el-avatar size="medium" src="../../assets/personal-log.jpg"></el-avatar>
            <span>大熊熊</span>
          </div>
          <i class="el-icon-bell"></i>
          <i class="el-icon-delete">退出</i>
        </div>
      </el-header>
      <!--主体-->
      <el-main style="background-color: antiquewhite">
        <!--留坑方便其他组件渲染-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data () {
    return {
      asideClose: false,
      asideOpenIcon: 'el-icon-caret-left',
      asideCloseIcon: 'el-icon-caret-right',
      menulist: [
        {
          id: '123456',
          menuName: '商品管理',
          path: 'goods',
          children: [
            {
              id: '23567',
              menuName: '商品列表',
              path: '/goodslist'
            }
          ]
        },
        {
          id: '12345666',
          menuName: '设备管理',
          children: [
            {
              id: '2356777',
              menuName: '设备列表'
            }
          ]
        }
      ],
      // 被激活的路径
      activePath: ''
    }
  },
  methods: {
    getMenuList () {},
    // 保存路由状态
    saveNavState (path) {
      this.activePath = path
      window.sessionStorage.setItem('activePath', path)
    },
    // 主要作用是二次登陆以后能返回到这级目录
    getActivePathFromStorage () {
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  },
  computed: {
    asideWidth () {
      return this.asideClose ? '64px' : '300px'
    }
  },
  created () {
    this.getMenuList()
    this.getActivePathFromStorage()
  }
}
</script>

<style lang="css" scoped>
  .el-container {
    height: 100%;
  }

  .el-aside {
    background-color: #2c3e50;
    color: white;
    overflow-x: hidden;
    transition: width 0.3s ease;
    -moz-transition: width 0.3s ease; /* Firefox 4 */
    -webkit-transition: width 0.3s ease; /* Safari 和 Chrome */
    -o-transition: width 0.3s ease; /* Opera */
  }

  .aside-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-bottom: solid 1px;
    overflow-x: hidden;
    transition: width 0.3s ease;
    -moz-transition: width 0.3s ease; /* Firefox 4 */
    -webkit-transition: width 0.3s ease; /* Safari 和 Chrome */
    -o-transition: width 0.3s ease; /* Opera */
  }
  .el-menu{
    border-right: 0;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding-left: 0;
  }

  .header-close-open {
    width: 56px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-close-open:hover {
    background-color: #42b983;
  }

  .header-user-info {
    display: flex;
    align-items: center;
  }

  .header-user-info-userinfo {
    display: flex;
    align-items: center;

  }

</style>
