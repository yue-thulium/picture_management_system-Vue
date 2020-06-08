<template>
    <div class="containner" v-if="pictureList">
        <div class="row-big">
            <header>
                <div class="meta-info">
                    <span>{{picdate}}</span>
                    <span>{{comment+"条评论"}}</span>
                </div>
                <tab-bar-item :tabItems="pictureList.tagList"/>
            </header>
            <div class="img-content">
                <div id="title">{{pictureList.tittle}}</div>
                <el-image
                        style="max-width: 960px; "
                        :src="'http://120.27.241.26/'+pictureList.picture"
                        :preview-src-list="UrlList"
                        @error="error">
                    <div slot="placeholder" class="image-slot">
                        <i class="el-icon-loading"></i>加载中
                    </div>
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
            <comment-p-l :pic_id="pictureList.id" @foreupdate="foreupdate" ref="cpl" ></comment-p-l>
        </div>
        <div class="row-small">
            <div class="fixed-right">
                <user-photo style="display: flex;flex-direction: column;align-items: center">
                    <el-image slot="user-photo"
                            style="width: 80px; height: 80px"
                            :src="'http://120.27.241.26/'+pictureList.icon"
                            @error="error">
                        <div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>加载中
                        </div>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                    <div class="user" slot="user-name"><a href="#" class="user-name">{{pictureList.nick_name}}</a></div>
                </user-photo>

                <div class="tab-usr">
                    <button :class="{tag0:isActive0}"  @click="collect_pic">{{tabItems[0]}}</button>
                    <button  :class="{tag1:isActive1}" @click="concern_author">{{tabItems[1]}}</button>
                    <button id="tag2" href="" target="_blank" @click="sendMessage">{{tabItems[2]}}</button>
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
                comment:"648",
                username:"kotori",
                tabItems:['收藏',' + 关注','私信'],
                isActive0:false,
                isActive1:false,
                pic_id:0,
                pictureList:{},
            }
        },
        created() {
            this.pic_id=this.$route.query.pic_id;
            this.getpic(this.pic_id);
            this.iscollect_pic();
        },
        computed:{
            picdate() {
                return this.pictureList.create_time.replace(/\s[\x00-\xff]*/g, '');
            },
            UrlList(){
                let url=[];
                url.push('http://120.27.241.26/'+this.pictureList.picture);
                return  url
            }
        },
        methods:{
            getpic(pic_id){
                this.getRequest(`/getAlbumById/${pic_id}`).then(res=>{
                    this.pictureList = res.data;
                    this.isFollow(this.pictureList.username);
                })
            },
            isFollow(username){
              this.getRequest(`/ifFollows/${username}`).then(res=>{
                  this.isActive1 = !this.isActive1;
              })
            },
            error(Error){
                console.log(Error);
            },
            iscollect_pic(){
              this.getRequest(`/ifCollectionAlbum/${this.pic_id}`).then(res=>{
                  if(res.data.code==20011){
                      this.isActive0=true;
                  }
                  else if(res.data.code==200){
                      this.isActive0=false;
                  }
              })
            },
            collect_pic(){
              this.isActive0=!this.isActive0;
              if(this.isActive0) {
                  this.getRequest(`/collectionAlbum/${this.pic_id}`).then(res => {
                      if(res.data.code==200){
                          this.$message({
                              type: 'success',
                              message: '收藏成功 '
                          });
                      }
                      else{
                          this.$message({
                              type: 'error',
                              message: '网络有波动 ，稍微再试试吧'
                          });
                      }
                  });
              }
              else {
                  this.getRequest(`/enCollectionAlbum/${this.pic_id}`).then(res => {
                      if(res.data.code==200){
                          this.$message({
                              type: 'success',
                              message: '取消收藏 '
                          });
                      }
                      else{
                          this.$message({
                              type: 'error',
                              message: '网络有波动 ，稍微再试试吧'
                          });
                      }
                  });
              }
            },
            concern_author() {
                this.isActive1 = !this.isActive1;
                if (this.isActive1) {
                    this.getRequest(`/setFollows/${this.pictureList.username}`).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '关注成功 '
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '网络有波动 ，稍微再试试吧'
                            });
                        }
                    });
                }
                else {
                    this.getRequest(`/dropFollows/${this.pictureList.username}`).then(res => {
                        if(res.data.code==200){
                            this.$message({
                                type: 'success',
                                message: '取消关注   '
                            });
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: '网络有波动 ，稍微再试试吧'
                            });
                        }
                    });
                }
            },
            sendMessage(){
                this.$prompt('在这里输入你想对ta说的话', '私信❤', {
                    confirmButtonText: '发送~',
                    cancelButtonText: '还是算了吧~',
                    inputType:'textarea',
                }).then(({ value }) => {
                    this.postRequest('/sendMess',{message:value,message_to:this.pictureList.pm_id}).then(res=>{
                        console.log(res);
                        if(res.data.code==200){
                            this.$message({
                                type: 'success',
                                message: '私信成功 '
                            });
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: '发送失败成功 ，稍微再试试吧'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            foreupdate(){
                this.$refs.cpl.getCommentFlash();
                this.$refs.cpl.$forceUpdate();
            }
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