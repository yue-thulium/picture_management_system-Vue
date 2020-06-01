<template>
    <div class="comment-list-container">
        <div class="comment-container">
            <div class="mentions">
                <textarea name="notedata" id=""  rows="4" v-model="notedata" class="comment-input"></textarea>
            </div>
        </div>
        <el-button type="success">成功按钮</el-button>
        <div  v-infinite-scroll="load"
              :infinite-scroll-disabled="disabled"
              :infinite-scroll-distance="1"
              :infinite-scroll-immediate="false">
           <div class="comment-item" v-for="i in count" :key="i">
               <user-photo :userPhoto="userPhoto" :userNmae="userName"></user-photo>
               <div>
                   <div class="reply-text">123456789</div>
                   <div class="reply-name"><span>往左8°是魔法的角度 ℡</span></div>
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
                userNmae: '往左8°是魔法的角度 ℡',
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
    }
    .reply-name{
        font-size: 18px;
        line-height: 18px;
        color: #666;
    }
    .reply-name span{
        color: #06F;
    }
</style>