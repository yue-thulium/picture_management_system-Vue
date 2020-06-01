<template>
    <div class="containner">
        <div class="row-big">
            <header>
                <div class="meta-info">
                    <span>{{date}}</span>
                    <span>{{comment+"条评论"}}</span>
                </div>
                <tab-bar-item :tabItems="tabs"/>
            </header>
            <div class="img-content">
                <el-image
                        style="max-width: 960px; max-height: 600px"
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
            </div>
            <comment-p-l></comment-p-l>
        </div>
        <div class="row-small">
            <div class="fixed-right">
                <user-photo style="display: flex;flex-direction: column;align-items: center">
                    <el-image slot="user-photo"
                            style="width: 80px; height: 80px"
                            :src="userPhoto"
                            @error="error">
                        <div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>加载中
                        </div>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                    <div class="user" slot="user-name"><a href="#" class="user-name">{{username}}</a></div>
                </user-photo>

                <div class="tab-usr">
                    <button :class="{tag0:isActive0}"  @click="changeClass0">{{tabItems[0]}}</button>
                    <button  :class="{tag1:isActive1}" @click="changeClass1">{{tabItems[1]}}</button>
                    <button id="tag2" href="" target="_blank">{{tabItems[2]}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TabBarItem from "../../components/tabbar/TabBarItem";
    import UserPhoto from "../../components/userIcon/UserPhoto";
    import CommentPL from "../../components/conment/CommentPL";
    export default {
        name: "ImgItemDetail",
        components:{
            UserPhoto,
            TabBarItem,
            CommentPL,
        },
        data(){
            return{
                url:"http://120.27.241.26/group1/M00/00/00/rBDDUl6RT6uAAmclAARd6OrYEI4579.jpg",
                urlList:['http://120.27.241.26/group1/M00/00/00/rBDDUl6RT6uAAmclAARd6OrYEI4579.jpg'],
                userPhoto:require("assets/img/userPhoto.jpg"),
                date:"2020-5-30",
                comment:"648",
                username:"kotori",
                tabItems:['收藏',' + 关注','私信'],
                tabs:['涩图1-1','涩图2-1','涩图3-1','涩图4-1'],
                isActive0:false,
                isActive1:false,
            }
        },
        created() {
            console.log(this.$route.params.text);
            console.log(this.$route.query.plan);
        },
        methods:{
            error(Error){
                console.log(Error);
            },
            changeClass0(){
              this.isActive0=!this.isActive0;
            },
            changeClass1(){
              this.isActive1=!this.isActive1;
            },
        }
    }
</script>

<style scoped>
    .containner{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left:15%;
        width: 1200px;
    }
    .row-big{
        flex:4;
        align-items: center;
    }
    .row-small{
        width: 300px;
        position: relative;

    }
    .fixed-right{
        position: fixed;
        top: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        margin-top: 70px;
        width: 300px;
    }
    header{
        margin: 0 0 20px;
        padding: 30px 0 10px;
        border-bottom: 1px solid #e0e0e0;
    }
    .meta-info{
        margin-bottom: 20px;
    }
    span{
        color: #a1a1a6;
        border-right: 1px solid #e0e0e0;
        padding-right: 10px;
        margin-right: 10px;
        font-size: 14px;
        line-height: 18px;
    }
    .user{
        padding: 0;
        display: inline-block;
        margin-bottom: 10px;
    }
    .user-name{
        font-size: 14px;
        display: inline-block;
        max-width: 250px;
        text-decoration: none;
        color: #366cd9;
        vertical-align: middle;
    }
    .tab-usr{
        width: 225px;
    }
    button{
        padding: 0 20px;
        background-color:#83cf53;
        color: white;
        text-align: center;
        text-decoration: none;
        border-color: white;
        border-radius: 5px;
        height: 26px;
        transition: all .2s ease;
        cursor: pointer;
        outline:none;
    }
    .tag0{
        background-color:#D9D9D9;
    }
    .tag1{

        background-color:#D9D9D9;
    }
    #tag2{
        padding: 0 20px;
        background-color:white;
        color: black;
        text-align: center;
        text-decoration: none;
        border-radius: 2px;
        height: 26px;
        transition: all .2s ease;
    }
</style>