<template>
    <div class="main-square"
         v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="1"
         :infinite-scroll-immediate="false">
        <ul     class="list">
            <li v-for="i in count" :key="i" class="list-item">
                <img-item></img-item>
            </li>
        </ul>
        <div>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>

<script>
    import ImgItem from "../../components/pictureItem/ImgItem";
    export default {
        name: "haveALook",
        components:{
            ImgItem,
        },
        data () {
            return {
                count: 6,
                loading: false,
            }
        },
        mounted () {
        },
        computed: {
            noMore () {
                return this.count >= 18
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods: {
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 3
                    this.loading = false
                }, 200)
            },
        }
    }
</script>

<style scoped>
    .main-square{
        position: relative;
        margin-left: 210px;
        padding: 0;
        width: 100%;
        flex: 5;
    }
    .list-item{
        background-color: white;
        height: auto;
        padding: 0 15px;
    }
    ul{
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 0;
        margin: 0;
    }
    li{
        list-style:none;
        margin: 10px;

    }
</style>