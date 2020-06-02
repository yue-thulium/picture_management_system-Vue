<template>
    <div class="comment-list-container">
        <div class="comment-container">
            <div class="mentions">
                <textarea name="notedata" id=""  rows="4" v-model="notedata" class="comment-input"></textarea>
            </div>
        </div>
        <el-button type="success" style="margin-bottom: 10px">回复</el-button>
        <div  v-infinite-scroll="load"
              :infinite-scroll-disabled="disabled"
              :infinite-scroll-distance="1"
              :infinite-scroll-immediate="false">
           <div class="comment-item" v-for="i in count" :key="i">
               <user-photo :userPhoto="userPhoto" >
                   <a class="user-name" href="#" slot="user-name">往左8°是魔法的角度 ℡</a>
               </user-photo>
               <div >
                   <div class="reply-text"><span style=" padding: 5px 10px;">123456789123456789123456789</span></div>
               </div>
           </div>
        </div>
        <div>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>

<script>
    import UserPhoto from "../userIcon/UserPhoto";
    export default {
        name: "CommentPL",
        components:{
          UserPhoto
        },
        data(){
            return {
                notedata:'',
                userPhoto:require("assets/img/userPhoto.jpg"),
                userName: '往左8°是魔法的角度',
                count: 6,
                loading: false,
            }
        },
        computed: {
            noMore () {
                return this.count >= 18
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods:{
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 6
                    this.loading = false
                }, 200)
            },
        }
    }
</script>

<style scoped>
    .comment-list-container{
        margin-top: 10px;
        padding: 20px 20px 0;
    }
    .comment-container{
       margin-bottom: 15px;
    }
    .mentions{
        position: relative;
    }
    textarea{
        width: 100%;
        height: 90px;
        background-color: white;
        border: 1px solid red;
        font-size: 14px;
        line-height: 24px;
        vertical-align: top;
        border-radius: 6px;
        padding: 5px 10px;
        resize: none;
        word-wrap: break-word;
        color: #333;
        overflow: hidden;
        cursor: text;
        outline: none;
    }
    .el-button{
        width: 120px;
    }
    .reply-text{
        font-size: 18px;
        line-height: 18px;
        color: #666;
        background-color: white;
        height: 120px;
        width: 560px;
        margin: 15px 0px 10px  40px;
        overflow: hidden;
        word-wrap: break-word;
    }
    .reply-name span{
        color: #06F;
    }
    .comment-item{

    }
    .user-name{
        font-size: 14px;
        display: inline-block;
        max-width: 250px;
        text-decoration: none;
        color: black;
        vertical-align: middle;
    }
</style>