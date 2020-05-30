<template>
    <div class="mine-collection"
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
        name: "collection",
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
    .mine-collection{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
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
        width: 1180px;
        padding: 0;
        margin: 0;
    }
    li{
        list-style:none;
        margin: 10px;

    }
</style>