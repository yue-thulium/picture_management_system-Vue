<template>
    <div class="mine-personalMessage">
       <el-tabs v-model="editableTabsValue[0]">
           <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
               <el-table :data="unread" :show-header="false" style="width: 100%">
                   <el-table-column>
                       <template slot-scope="scope">
                           <span class="message-title" @click="showContent(scope)">{{scope.row.message_content}}</span>
                       </template>
                   </el-table-column>
                   <el-table-column width="180">
                       <template slot-scope="scope">
                           <span class="message-who" @click="showPerson(scope)">{{scope.row.nick_name}}</span>
                       </template>
                   </el-table-column>
                   <el-table-column prop="message_time" width="180"></el-table-column>
                   <el-table-column width="120">
                       <template slot-scope="scope">
                           <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                       </template>
                   </el-table-column>
               </el-table>
               <div class="handle-row">
                   <el-button type="primary" @click="handleReadAll">全部标为已读</el-button>
               </div>
           </el-tab-pane>
           <el-tab-pane :label="`已读消息(${read.length})`" name="second">
               <template v-if="editableTabsValue[1] === 'second'">
                   <el-table :data="read" :show-header="false" style="width: 100%">
                       <el-table-column>
                           <template slot-scope="scope">
                               <span class="message-title"  @click="showContent(scope)">{{scope.row.message_content}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column width="180">
                           <template slot-scope="scope">
                               <span class="message-who" @click="showPerson(scope)">{{scope.row.nick_name}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column prop="message_time" width="150"></el-table-column>
                       <el-table-column width="120">
                           <template slot-scope="scope">
                               <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                           </template>
                       </el-table-column>
                   </el-table>
                   <div class="handle-row">
                       <el-button type="danger" @click="handleDelAll">删除全部</el-button>
                   </div>
               </template>
           </el-tab-pane>
           <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
               <template v-if="editableTabsValue[2] === 'third'">
                   <el-table :data="recycle" :show-header="false" style="width: 100%">
                       <el-table-column>
                           <template slot-scope="scope">
                               <span class="message-title" @click="showContent(scope)">{{scope.row.message_content}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column width="180">
                           <template slot-scope="scope">
                               <span class="message-who" @click="showPerson(scope)">{{scope.row.nick_name}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column prop="message_time" width="150"></el-table-column>
                   </el-table>
                   <div class="handle-row">
                       <el-button type="danger" @click="handlRestoreAll">清空回收站</el-button>
                   </div>
               </template>
           </el-tab-pane>
           <el-tab-pane :label="`我发送过的(${sent.length})`" name="forth">
               <template v-if="editableTabsValue[2] === 'third'">
                   <el-table :data="sent" :show-header="false" style="width: 100%">
                       <el-table-column>
                           <template slot-scope="scope">
                               <span class="message-title" @click="showContent(scope)">{{scope.row.message_content}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column width="180">
                           <template slot-scope="scope">
                               <span class="message-who" @click="showPerson(scope)">{{scope.row.nick_name}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column prop="message_time" width="150"></el-table-column>
                       <el-table-column width="120">
                           <template slot-scope="scope">
                               <el-button type="danger" @click="handleDelSent(scope.$index)">删除</el-button>
                           </template>
                       </el-table-column>
                   </el-table>
                   <div class="handle-row">
                       <el-button type="danger" @click="handlRestorSenteAll">删除全部</el-button>
                   </div>
               </template>
           </el-tab-pane>
       </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "personalMessage",
        data(){
            return{
                editableTabsValue:['first','second','third','forth'],
                personal:['未读私信','已读私信','回收站'],
                unread: [],
                read: [],
                recycle: [],
                sent:[],
            }
        },
        created() {
            this.getUnreadMessage();
            this.getReadMessage();
            this.getDelMessage();
            this.getSent();
        },
        methods:{
            getUnreadMessage(){
                this.getRequest('/getNoReadPriMess').then(res =>{

                    this.getRequest('/getNoReadAllMess').then(response=>{
                        this.unread=res.data;
                        this.unread.push(...response.data);
                    })
                })
            },
            getReadMessage(){
              this.getRequest('/getReadPriMess').then(res =>{
                  this.read=res.data;
              })
            },
            getDelMessage(){
              this.getRequest('/getHiddenMess').then(res=>{
                  this.recycle=res.data;
              })
            },
            getSent(){
              this.getRequest('/getMyMess').then(res=>{
                  this.sent=res.data;
              })
            },
            showContent(){
                console.log("click!")
            },
            showPerson(scope){
                console.log(scope.row.who)
            },
            // 单个未读变已读
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.getRequest(`/makeMessRead/${item[0].id}`).then(res=>{
                   if(res.data.code!=200){
                       this.$message({
                           type: 'error',
                           message: '发生错误，稍微再试试吧'
                       });
                   }
                   else {
                       this.$store.dispatch("controlSidebar/MCountsub");
                       this.read = item.concat(this.read);
                   }
                })
            },
            handleReadAll(){
               for(var item of this.unread){
                   this.getRequest(`/makeMessRead/${item.id}`).then(res=>{
                       if(res.data.code!=200){
                           this.$message({
                               type: 'error',
                               message: '发生错误，稍微再试试吧'
                           });
                       }
                   })
               }
                this.read = this.unread.concat(this.read);
                this.unread.splice(0);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);

                this.getRequest(`/hiddenMess/${item[0].id}`).then(res=>{
                    if(res.data.code!=200){
                        this.$message({
                            type: 'error',
                            message: '发生错误，稍微再试试吧'
                        });
                    }
                    else{
                        this.recycle = item.concat(this.recycle);
                    }
                })
            },
            handleDelAll(){
                for(var item of this.read){
                    this.getRequest(`/hiddenMess/${item.id}`).then(res=>{
                        if(res.data.code!=200){
                            this.$message({
                                type: 'error',
                                message: '发生错误，稍微再试试吧'
                            });
                        }
                    })
                }
                this.recycle = this.read.concat(this.recycle);
                this.read.splice(0);
            },
            handlRestoreAll(){
                this.recycle.splice(0);
            },
            handleDelSent(index){
                const item = this.sent.splice(index, 1);
                this.getRequest(`/deleteSelfMess/${item[0].id}`).then(res=>{
                    console.log(res);
                    if(res.data.code!=200){
                        this.$message({
                            type: 'error',
                            message: '发生错误，稍微再试试吧'
                        });
                    }
                })
            },
            handlRestorSenteAll(){
                for(var item of this.sent){
                    this.getRequest(`/deleteSelfMess/${item.id}`).then(res=>{
                        console.log(res);
                        if(res.data.code!=200){
                            this.$message({
                                type: 'error',
                                message: '发生错误，稍微再试试吧'
                            });
                        }
                    })
                }
                this.sent.splice(0);
            }
        }
    }
</script>

<style scoped>
    .mine-personalMessage{
        position: relative;
        margin-left: 210px;
        padding: 0;
        width: 1380px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .message-title{
        cursor: pointer;
    }
    .message-who{
        width: 180px;
        cursor: pointer;
    }
    .handle-row{
        margin-top: 30px;
    }
</style>