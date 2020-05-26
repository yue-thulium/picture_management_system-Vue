<template>
    <div class="page-container" :style="{height:fullHeight+'px'}">
        <div class="page-header">
            <h2>这里用来写一些标题头</h2>
        </div>
        <div class="page-main" >
            <router-view/>
            <div class="page-side-wrapper">
                <img src="~assets/img/userPhoto.jpg" alt="头像">
                <h5>不充钱不给看嗷！</h5>
                <main-nav-menu/>
            </div>
        </div>
    </div>
</template>

<script>
    import MainNavMenu from "../../components/navMenu/MainNavMenu";
    export default {
        components:{
            MainNavMenu,
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
        }
    }
</script>

<style scoped>
    img{
        width: 100px;
        height: 100px;
    }
    h5{
        margin: 2px;
    }
    .page-header{
        width: 100%;
        position: absolute;
        top: 0;
        height: 50px;
        text-align: center;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
        background-color: #fff;
    }
    .page-side-wrapper{
        position: fixed;
        right: 50px;
        flex:2;
        width: auto;
    }

     .page-main{
         width: 100%;
         height: 100%;
         display: flex;
         flex-wrap: wrap;
         padding-top: 63px;
         overflow: visible;
    }
    .page-container{
        display: flex;
        height: 850px;
        flex-direction: column;
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
