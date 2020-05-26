<template>
    <div class="user-title">
       <slot name="user-photo"><img class="user-photo" src="~assets/img/userPhoto.jpg" alt="用户头像"></slot>
        <slot name="user-name"><a class="user-name" href="#">往左8°是魔法的角度 ℡</a></slot>
    </div>
</template>

<script>
    export default {
        name: "UserPhoto"
    }
</script>

<style scoped>
    .user-title{
        display: flex;
    }
    .user-photo{
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
    .user-name{
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4;
        margin: auto;
    }
</style>