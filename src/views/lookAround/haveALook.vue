<template>
    <div class="main-square" style='height:100%'>
        <div>
            <p v-for="(item, index) in 100  " :key="index">{{index}} 这里是一些文本。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "haveALook"
    }
</script>

<style scoped>
    .el-scrollbar__wrap.default-scrollbar__wrap {
        overflow-x: auto;
    }
    .main-square{
        overflow: hidden;
        height: 100%;
    }
</style>