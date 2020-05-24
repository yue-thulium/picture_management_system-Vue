<template>
    <el-col :span="12">
        <el-menu
                :router="true"
                default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :unique-opened="istrue"
                background-color="#545c64"
                text-color="#EEB422"
                active-text-color="#FFFF00">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>我的</span>
                </template>
                    <el-menu-item index="/mine-fans">粉丝</el-menu-item>
                    <el-menu-item index="/mine-concern">关注</el-menu-item>
                    <el-menu-item index="/mine-collection">收藏</el-menu-item>
                    <el-menu-item index="/mine-personalMessage">私信</el-menu-item>
                    <el-menu-item index="/mine-history">历史</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                    <i class="el-icon-menu" slot="title"></i>
                    <span slot="title">随便看看</span>
                <el-menu-item index="/showSquare">图册</el-menu-item>
            </el-submenu>
            <el-submenu index="3" >
                <i class="el-icon-edit-outline" slot="title"></i>
                <span slot="title">发表</span>
                <el-menu-item index="/publish-topic">话题</el-menu-item>
                <el-menu-item index="/publish-picture">图片</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <i class="el-icon-setting" slot="title"></i>
                <span slot="title">设置</span>
                <el-menu-item index="4-1">设置一些东西</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
    export default {
        name: "MainNavMenu",
        data(){
          return{
              istrue:true,
          }
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
    .el-menu {
        height:700px;
        min-width: 180px;
    }
    .el-submenu .el-menu-item{
        min-width: auto;
    }

    .el-menu-item:hover{
        outline: 0 !important;
        color: 	#F5F5DC !important;
    }
</style>