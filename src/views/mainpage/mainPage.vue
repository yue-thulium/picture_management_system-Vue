<template>
    <el-container>
        <el-header>这部分是上面的一个条，显示系统名字、用户名及注销等操作位置</el-header>
        <el-container>
            <el-aside width="200px">侧面的菜单栏</el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted: function () {
        },
        methods: {}
    }
</script>

<style scoped>

</style>
