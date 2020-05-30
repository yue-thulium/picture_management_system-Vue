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
        </div>
        <div class="row-small">
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
                <button id="tag0"  >{{tabItems[0]}}</button>
                <button id="tag1" :class="{tag1:isActive}" >{{tabItems[1]}}</button>
                <button id="tag2" href="" target="_blank">{{tabItems[2]}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    import TabBarItem from "../../components/tabbar/TabBarItem";
    import UserPhoto from "../../components/userIcon/UserPhoto";
    export default {
        name: "ImgItemDetail",
        components:{
            UserPhoto,
            TabBarItem
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
        }
    }
</script>

<style scoped>
    .containner{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left:15%;
        width: 1200px;
    }
    .row-big{
        flex:4;
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
    .row-small{
        flex: 1;
        position: fixed;
        right: 250px;
        top: 192px;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    button{

    }
    button{
        padding: 0;
        margin: 0;
        height: 35px;
        border: 1px solid #dadae0;
        border-radius: 6px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
    }
    #tag1{
        padding: 0 20px;
        background-color:#83cf53;
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 2px;
        height: 26px;
        transition: all .2s ease;
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