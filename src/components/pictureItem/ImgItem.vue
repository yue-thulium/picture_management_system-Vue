<template>
    <div class="li-item">
        <user-photo>
            <img class="user-photo" src="~assets/img/userPhoto.jpg" alt="用户头像" slot="user-photo">
            <a class="user-name" href="#" slot="user-name">往左8°是魔法的角度 ℡</a>
        </user-photo>
        <picture-article>
            <a class="picture-text" href="#" slot="text">这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题</a>
        </picture-article>
        <img src="~assets/img/testImg.jpg" style="max-height:600px; max-width:406px" alt="测试用图">
        <tab-bar-item/>
    </div>
</template>

<script>
    import UserPhoto from "../userIcon/UserPhoto";
    import PictureArticle from "../article/PictureArticle";
    import TabBarItem from "../tabbar/TabBarItem";
    export default {
        name: "ImgItem",
        components:{
            UserPhoto,
            PictureArticle,
            TabBarItem,
        }
    }
</script>

<style scoped>
    .li-item{
        max-width: 450px;
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
        margin-top: 6px;
        margin-left: 4px;
        color: #252526;
        text-decoration: none;
    }
    .picture-text{
        color: #252526;
        text-decoration: none;
        font-size: 14px;
    }
</style>