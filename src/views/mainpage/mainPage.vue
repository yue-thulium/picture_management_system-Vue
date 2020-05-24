<template>
    <el-container>
        <el-header>这部分是上面的一个条，显示系统名字、用户名及注销等操作位置</el-header>
        <el-container>
            <el-aside width="200px">
                <div class="aside">
                    <img src="~assets/img/userPhoto.jpg" alt="头像">
                    <h5>不充钱不给看嗷！</h5>
                    <MainNavMenu><router-view></router-view></MainNavMenu>
                </div>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import MainNavMenu from "../../components/NavMenu/MainNavMenu";
    export default {
        components:{
            MainNavMenu,
        },
        data() {
            return {}
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
        width: 200px;
        position: fixed;
    }
</style>
