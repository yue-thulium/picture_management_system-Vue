<!--
https://www.jianshu.com/p/8097bb3d9d49
基于 Vue.js 2.0 酷炫自适应背景视频登录页面的设计
目前源码参考
视频源以及图片源均为网络，现在播放需要长时间加载，要不然github上传一传5MB以上慢的跟憨憨一样
登录功能已实现，暂未测试

-->

<template>
    <div class="homepage-hero-module">
        <div class="video-container">
            <div :style="fixStyle" class="filter"></div>
            <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
                <source src="http://120.27.241.26/group1/M00/00/00/rBDDUl7VB0mAW61jAIeON4MkPK4646.mp4"/>
            </video>
            <div class="poster hidden" v-if="!vedioCanPlay">
                <img :style="fixStyle" src="http://bpic.588ku.com//back_water_img/19/10/13/10a8fb99ffe3ac40a7e5e1d42415d9d046.jpg!/fw/750/quality/99/unsharp/true/compress/true" alt="">
            </div>
            <div :style="fixStyle" class="loginForm_test">
                <h1 class="loginTest">图片管理云平台</h1>
                <loginForm class="loginFrom"/>
            </div>
        </div>
    </div>
</template>

<script>
    import loginForm from "@/components/login&register/loginForm";

    export default {
        name: 'login',
        components: {
            loginForm
        },
        data() {
            return {
                vedioCanPlay: false,
                fixStyle: ''
            }
        },
        methods: {
            canplay() {
                this.vedioCanPlay = true
            }
        },
        mounted: function() {
            window.onresize = () => {
                const windowWidth = document.body.clientWidth
                const windowHeight = document.body.clientHeight
                const windowAspectRatio = windowHeight / windowWidth
                let videoWidth
                let videoHeight
                if (windowAspectRatio < 0.5625) {
                    videoWidth = windowWidth
                    videoHeight = videoWidth * 0.5625
                    this.fixStyle = {
                        height: windowWidth * 0.5625 + 'px',
                        width: windowWidth + 'px',
                        'margin-bottom': (windowHeight - videoHeight + 200) / 2 + 'px',
                        'margin-left': 'initial'
                    }
                } else {
                    videoHeight = windowHeight
                    videoWidth = videoHeight / 0.5625
                    this.fixStyle = {
                        height: windowHeight + 'px',
                        width: windowHeight / 0.5625 + 'px',
                        'margin-left': (windowWidth - videoWidth) / 2 + 'px',
                        'margin-bottom': 'initial'
                    }
                }
            }
            window.onresize()
        }
    }
</script>

<style>
    .homepage-hero-module,
    .video-container {
        position: relative;
        height: 100vh;
        overflow: hidden;
    }

    .video-container video.fillWidth {
        width: 100%;
    }

    .video-container .poster img,
    .video-container video {
        z-index: 0;
        position: absolute;
    }

    .video-container .filter {
        z-index: 1;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
    }

    .loginForm_test{
        z-index: 2;
        position: absolute;
    }

    .loginFrom{
        width: 300px;
        height: 100px;
        margin: 0 auto;
        position: relative;
        top: 50%; /*偏移*/
        transform: translateY(-175%);
    }

    .loginTest{

    }
</style>
