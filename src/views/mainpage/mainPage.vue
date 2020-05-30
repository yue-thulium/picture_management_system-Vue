<template>
    <div class="page-container" :style="{height:fullHeight+'px'}">
            <Header></Header>
            <main-nav-menu/>
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
     .page-main{
         position: absolute;
         left: 126px;
         top: 70px;
         width: 100%;
         overflow: auto;
         overflow-x: hidden;
    }
    .page-container{
        display: flex;
        height: 100%;
        flex-direction: column;
        overflow: hidden;
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
