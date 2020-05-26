<template>
    <el-container class="page-container">
        <el-header>这部分是上面的一个条，显示系统名字、用户名及注销等操作位置</el-header>
        <el-container>
            <el-aside>
                <div class="aside">
                    <img src="~assets/img/userPhoto.jpg" alt="头像">
                    <h5>不充钱不给看嗷！</h5>
                    <MainNavMenu></MainNavMenu>
                </div>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import MainNavMenu from "../../components/navMenu/MainNavMenu";
    export default {
        components:{
            MainNavMenu,
        },
        data() {
            return {
                curHeight:0
            }
        },

        mounted: function () {

        },
        methods: {}
    }
</script>

<style scoped>
    img{
        width: 100px;
        height: 100px;
    }
    h5{
        margin: 2px;
    }
    .aside {
        flex:2;
        position: fixed;
        z-index: 999;
    }
    .main{
        flex:5;
        overflow-y: auto;
        height: 800px;
        padding: 0;
        background-color: #FFFFFF;
    }
    .page-container{
        background-color: #f5f5fa;
        z-index: 999;
    }
</style>
