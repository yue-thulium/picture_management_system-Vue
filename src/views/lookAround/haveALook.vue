<template>
    <div class="main-square" style='height:100%'>
        <ul     class="list"
                v-infinite-scroll="load"
                :infinite-scroll-disabled="disabled"
                :infinite-scroll-distance="3"

        >
            <li v-for="i in count" class="list-item">
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
                count: 3,
                loading: false
            }
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
                }, 1000)
            }
        }
    }
</script>

<style scoped>
    .main-square{
        overflow : auto;
        height: 2000px;
        width: 100%;
    }
    .list-item{
        z-index: 999;
    }
    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
    }
    li{
        list-style:none;
        margin: 10px;

    }
</style>