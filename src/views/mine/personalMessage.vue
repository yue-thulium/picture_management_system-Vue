<template>
    <div class="mine-personalMessage">
       <el-tabs v-model="editableTabsValue[0]">
           <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
               <el-table :data="unread" :show-header="false" style="width: 100%">
                   <el-table-column>
                       <template slot-scope="scope">
                           <span class="message-title" @click="showContent(scope)">{{scope.row.title}}</span>
                       </template>
                   </el-table-column>
                   <el-table-column width="180">
                       <template slot-scope="scope">
                           <span class="message-who" @click="showPerson(scope)">{{scope.row.who}}</span>
                       </template>
                   </el-table-column>
                   <el-table-column prop="date" width="180"></el-table-column>
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
                               <span class="message-title"  @click="showContent(scope)">{{scope.row.title}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column width="180">
                           <template slot-scope="scope">
                               <span class="message-who" @click="showPerson(scope)">{{scope.row.who}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column prop="date" width="150"></el-table-column>
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
                               <span class="message-title" @click="showContent(scope)">{{scope.row.title}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column width="180">
                           <template slot-scope="scope">
                               <span class="message-who" @click="showPerson(scope)">{{scope.row.who}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column prop="date" width="150"></el-table-column>
                       <el-table-column width="120">
                           <template slot-scope="scope">
                               <el-button @click="handleRestore(scope.$index)">还原</el-button>
                           </template>
                       </el-table-column>
                   </el-table>
                   <div class="handle-row">
                       <el-button type="danger" @click="handlRestoreAll">清空回收站</el-button>
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
                editableTabsValue:['first','second','third'],
                personal:['未读私信','已读私信','回收站'],
                unread: [{
                    date: '2018-04-19 20:00:00',
                    who:'kotori',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                },{
                    date: '2018-04-19 21:00:00',
                    who:'Thoka',
                    title: '今晚12点整发大红包，先到先得',
                }],
                read: [{
                    date: '2018-04-19 20:00:00',
                    who:'系统',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }],
                recycle: [{
                    date: '2018-04-19 20:00:00',
                    who:'系统',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }]
            }
        },
        created() {
        },
        methods:{
            showContent(){
                console.log("click!")
            },
            showPerson(scope){
                console.log(scope.row.who)
            },
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleReadAll(){
                this.read = this.unread.concat(this.read);
                this.unread.splice(0);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleDelAll(){
                this.recycle = this.read.concat(this.recycle);
                this.read.splice(0);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            },
            handlRestoreAll(){
                this.recycle.splice(0);
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