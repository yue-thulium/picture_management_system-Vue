<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">图片管理系统</div>
        <div class="search">
            <div class="input-search">
                <el-autocomplete
                        class="inline-input"
                        v-model="state1"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                >
                    <el-button slot="append" icon="el-icon-search" @click="click"></el-button>
                </el-autocomplete>
            </div>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="$store.state.controlSidebar.messageCount?`有${$store.state.controlSidebar.messageCount}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/mainPage/mine-personalMessage">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="$store.state.controlSidebar.messageCount"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <router-link tag="a"  :to="{name:'imgItem-detail',params: { text: 123 },query: { plan: 'private' }}">
                    <img :src="icno" alt="头像">
                    </router-link>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <router-link :to="{name:'UserSetting'}">
                            <el-dropdown-item>用户信息</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item command="user">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                isShow:false,
                fullscreen: false,
                name: "kotori",
                icno:'http://120.27.241.26/',
                state1: '',
                tags: [],
            };
        },
        created() {
            this.$store.dispatch("controlSidebar/showCollapse",this.isShow);
            this.getMessageCount();
            this.getIcon();
        },
        computed:{
            username() {
                let username = this.$store.getters.username;
                return username ? username : this.name;
            },
        },
        methods:{
            getIcon(){
                this.getRequest('/getIcon').then(res=>{
                    this.icno+=res.data;
                })
            },
            getMessageCount(){
              this.getRequest('/getCountMessNeedRead').then(res=>{
                  this.$store.dispatch("controlSidebar/MCount",res.data.message);
              })
            },
            collapseChage() {
                this.isShow = !this.isShow;
                this.$store.dispatch("controlSidebar/showCollapse",this.isShow);
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command == "loginout") {
                    // this.socketApi.websocketclose();
                    this.$store.dispatch('user/logout');
                    this.$router.replace('/loginPage');
                }else if(command =="user"){
                    this.$router.replace('/mainPage/passwordconfig');
                }
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            click(){
                let tags =[];
                tags.push( this.arrayforSearch(this.state1));
                this.$router.push({ name: 'showSquare',params:{ tagList: tags[0] },query: { tag: tags[0].tag_name }})
            },
            querySearch(queryString, cb) {
                var tags =this.arrayToJson( this.tags);
                var results = queryString ? tags.filter(this.createFilter(queryString)) : tags;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (tags) => {
                    return (tags.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },
            arrayToJson(arr){
                return arr.map((val,index)=>{
                    return {
                        "value": val.tag_name,
                    }
                })
            },
            arrayforSearch(str){
                for(let item of this.tags){
                    if(item.tag_name==str)
                        return item;
                }
            }
        },
        mounted() {
            if (document.body.clientWidth < 1000) {
                this.collapseChage();
            }
            this.getRequest("/getAllPictureTag").then(res=>{
                this.tags=res.data;
            })
        }
    }
</script>

<style scoped>
    .header {
        background-color: rgb(84, 92, 100) !important;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo {
        float: left;
        width: 250px;
        line-height: 70px;
    }
    .search{
        width: 400px;
        height: 70px;
        margin-left: 30px;
        float: left;
        display: table;
    }
    .input-search{
        display:table-cell;
        vertical-align:middle;
    }
    .header-right {
        float: right;
        padding-right: 50px;
    }
    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell {
        color: #fff;
    }
    .user-name {
        margin-left: 10px;
    }
    .user-avator {
        margin-left: 20px;
    }
    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
    .collapse-btn:hover{
        background-color: #009688!important;
    }
</style>