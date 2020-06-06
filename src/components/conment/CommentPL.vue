<template>
    <div class="comment-list-container">
        <div class="comment-container">
            <div class="mentions">
                <textarea name="notedata" id=""  rows="4" v-model="notedata" class="comment-input"></textarea>
            </div>
        </div>
        <el-button type="success" style="margin-bottom: 10px" @click="putComment">回复</el-button>
        <div  v-infinite-scroll="load"
              :infinite-scroll-disabled="disabled"
              :infinite-scroll-distance="10"
              :infinite-scroll-immediate="true"
                v-if="commentList">
           <div class="comment-item" v-for="(item,index) in commentList" :key="index">
               <div style="display:flex;flex-wrap: wrap">
                   <user-photo :userPhoto="'http://120.27.241.26/'+item.icon" >
                       <a class="user-name" href="#" slot="user-name">{{item.username}}</a>
                   </user-photo>
                   <span style="margin: 0 auto;">{{item.comment_time}}</span>
               </div>
               <div >
                   <div class="reply-text"><span style=" padding: 5px 10px;">{{item.content}}</span></div>
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
                count: 0,
                loading: false,
                commentList:[],
                num:0,
            }
        },
        created() {
            this.getComment();
        },
        props:{
          pic_id:Number,
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
                console.log(++this.num);
                this.loading = true
                setTimeout(() => {
                    this.count += 6
                    this.loading = false
                    this.getComment();
                }, 200)
            },
            putComment(){
                this.postRequest('/addAlbumComment',{pa_id:this.pic_id,content:this.notedata}).then(res=>{
                    if(res.data.code==200){
                        const h = this.$createElement;
                        this.$notify({
                            title: '提示信息',
                            message: h('i', {style: 'color: teal'}, '回复成功')
                        });
                        this.$emit('foreupdate');
                    }
                    else {
                        const h = this.$createElement;
                        this.$notify({
                            title: '提示信息',
                            message: h('i', {style: 'color: teal'}, '回复失败')
                        });
                    }
                })
            },
            getComment(){
                console.log(this.count);
                this.getRequest(`/getAllAlbumComment/${this.pic_id}/${this.count}`).then(res=>{
                  this.commentList.push(...res.data);
              })
            },
            getCommentFlash(){
                this.getRequest(`/getAllAlbumComment/${this.pic_id}/${this.count}`).then(res=>{
                    this.commentList=res.data;
                    console.log(res.data);
                })
            }
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