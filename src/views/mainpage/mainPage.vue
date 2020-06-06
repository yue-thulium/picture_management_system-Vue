<template>
    <div class="page-container" :style="{height:fullHeight+'px'}">
            <Header></Header>
            <main-nav-menu />
        <div class="page-main"id="page-main">
            <transition name="move" mode="out-in">
                 <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
    import MainNavMenu from "../../components/navMenu/MainNavMenu";
    import Header from "../../components/header/Header";
    export default {
        components:{
            MainNavMenu,
            Header,
        },
        data() {
            return {
                fullHeight:document.documentElement.clientHeight,
            }
        },
        watch: {
            fullHeight (val) {
                if(!this.timer) {
                    this.fullHeight = val
                    this.timer = true
                    let that = this
                    setTimeout(function (){
                        that.timer = false
                    },400)
                }
            }
        },
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.websock.close();//离开路由之后断开websocket连接
        },
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.fullHeight = document.documentElement.clientHeight
                    that.fullHeight = window.fullHeight
                })()
            }
        },
        methods: {
            initWebSocket(){//初始化weosocket(必须)
                const wsuri = 'ws://localhost:8082/websocket/'+ this.$store.getters.username;    //请根据实际项目需要进行修改
                this.websock = new WebSocket(wsuri);      //新建一个webstock对象
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen(){//websocket连接后发送数据(send发送)
                console.log('初步建立连接');
                let actions = {message:'老子来了'};     //请根据实际项目需要进行修改
                this.websocketsend(JSON.stringify(actions));
            },
            websocketonerror(e){//连接建立失败重连
                that.$notify({
                    title: '错误',
                    message: '服务器错误，无法接收实时报警信息',
                    type: 'error',
                    duration: 0
                });
                this.initWebSocket();
            },
            websocketonmessage(e){ //数据接收
               if(e.data){
                   this.$store.dispatch("controlSidebar/MCountplus");
               }
            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
            },
        },
    }
</script>

<style scoped>
     .page-main{
         width: 90%;
         min-width: 600px;
         height: 100%;
    }
    .page-container{
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        overflow: auto;
    }
    a, abbr, acronym, address, applet, article, aside, audio, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details,
    dfn, div, dl, dt, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, iframe, img, ins, kbd,
    label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, sub, summary, sup, table, tbody, td,
    tfoot, th, thead, time, tr, tt, ul, var, video{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
</style>
