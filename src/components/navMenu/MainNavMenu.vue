<template>
    <div class="sideBar">
        <img src="~assets/img/userPhoto.jpg" alt="头像">
        <h5>不充钱不给看嗷！</h5>
        <el-col :span="16">
            <el-menu
                    :router="true"
                    default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :unique-opened="istrue"
                    :collapse="$store.state.controlSidebar.collapse"
                    background-color="#545c64"
                    text-color="#EEB422"
                    active-text-color="#FFFF00">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>我的</span>
                    </template>
                        <el-menu-item index="mine-fans">粉丝</el-menu-item>
                        <el-menu-item index="mine-concern">关注</el-menu-item>
                        <el-menu-item index="mine-collection">收藏</el-menu-item>
                        <el-menu-item index="mine-personalMessage">私信</el-menu-item>
                        <el-menu-item index="mine-history">历史</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                        <i class="el-icon-menu" slot="title"></i>
                        <span slot="title">随便看看</span>
                    <el-menu-item index="showSquare">图册</el-menu-item>
                </el-submenu>
                <el-submenu index="3" >
                    <i class="el-icon-edit-outline" slot="title"></i>
                    <span slot="title">发表</span>
                    <el-menu-item index="publish-topic">话题</el-menu-item>
                    <el-menu-item index="publish-picture">图片</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <i class="el-icon-setting" slot="title"></i>
                    <span slot="title">设置</span>
                    <el-menu-item index="4-1">设置一些东西</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "MainNavMenu",
        data(){
          return{
              istrue:true,
          }
        },
        created() {
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .sideBar{
        height: 100%;
    }
    img{
        width: 100px;
        height: 100px;
    }
    h5{
        margin: 2px;
    }
    .el-menu {
        height:100%;
    }
    .el-submenu .el-menu-item{
        min-width: auto;
    }
    .el-col {
        height: 100%;
    }
    .el-menu-item:hover{
        outline: 0 !important;
        color: 	#F5F5DC !important;
    }
</style>