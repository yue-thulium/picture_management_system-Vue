<template>
    <div class="li-item">
        <user-photo>
            <img class="user-photo" src="~assets/img/userPhoto.jpg" alt="用户头像" slot="user-photo">
            <a class="user-name" href="#" slot="user-name">往左8°是魔法的角度 ℡</a>
        </user-photo>
        <span class="picture-date">{{date}}</span>
        <picture-article>
            <router-link tag="a" slot="text" class="picture-text"
                         :to="{name:'imgItem-detail',params: { text: 123 },query: { plan: 'private' }}"
            >
             这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题
            </router-link>
        </picture-article>
<!--        <img src="~assets/img/testImg.jpg" style="max-height:600px; max-width:406px" alt="测试用图">-->
        <el-image
                style="max-width: 406px; max-height: 600px"
                :src="url"
                :preview-src-list="urlList"
                @error="error">
            <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading"></i>加载中
            </div>
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
            </div>

        </el-image>
        <tab-bar-item/>
    </div>
</template>

<script>
    import UserPhoto from "../userIcon/UserPhoto";
    import PictureArticle from "../article/PictureArticle";
    import TabBarItem from "../tabbar/TabBarItem";
    export default {
        name: "ImgItem",
        data(){
            return {
                url:"http://120.27.241.26/group1/M00/00/00/rBDDUl6RT6uAAmclAARd6OrYEI4579.jpg",
                urlList:['http://120.27.241.26/group1/M00/00/00/rBDDUl6RT6uAAmclAARd6OrYEI4579.jpg'],
                isShow:false,
                date:'2020-5-29',
                pictureID:"http://120.27.241.26/group1/M00/00/00/rBDDUl6RT6uAAmclAARd6OrYEI4579.jpg"
            }
        },
        components:{
            UserPhoto,
            PictureArticle,
            TabBarItem,
        },
        methods:{
            error(Error){
                console.log(Error);
            },
            showContent(){
              this.$router.push({ name: 'publish-picture', params: { pictureID: this.pictureID }})
            },
        }
    }
</script>

<style scoped>
    .li-item{
        display: flex;
        flex-wrap: wrap;
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
    .picture-date{
        position: relative;
        margin-left: 100px;
        margin-top: 5px;
    }
    .picture-text{
        color: #252526;
        text-decoration: none;
        font-size: 14px;
    }
</style>