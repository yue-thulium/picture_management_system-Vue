<template>
    <div class="user-title">
       <slot name="user-photo">
           <el-image
                   alt="用户头像"
                   class="user-photo"
                   :src="userPhoto"
                   @error="error">
               <div slot="placeholder" class="image-slot">
                   <i class="el-icon-loading"></i>加载中
               </div>
               <div slot="error" class="image-slot">
                   <i class="el-icon-picture-outline"></i>
               </div>
           </el-image>
       </slot>
        <slot name="user-name"><a class="user-name" href="#">{{userNmae}}</a></slot>
    </div>
</template>

<script>
    export default {
        name: "UserPhoto",
        props:{
            userPhoto: {
                type: String,
                default(){
                    return require("assets/img/userPhoto.jpg");
                }
            },
            userNmae:{
                type: String,
                default(){
                    return '往左8°是魔法的角度 ℡'
                }
            }
        },
        methods:{
            error(Error){
                console.log(Error);
            },
        }
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