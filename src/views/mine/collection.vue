<template>
    <div class="mine-collection"
         v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="1"
         :infinite-scroll-immediate="false">
        <div style="display: flex;
            align-items: flex-start;">
            <ul     class="list">
                <li v-for="(i,index) in pictureList1.length" :key="index" class="list-item">
                    <img-item :pictureList="pictureList1[index]"></img-item>
                </li>
            </ul>
            <ul     class="list">
                <li v-for="(i,index) in pictureList2.length" :key="index" class="list-item">
                    <img-item :pictureList="pictureList2[index]"></img-item>
                </li>
            </ul>
            <ul     class="list">
                <li v-for="(i,index) in pictureList3.length" :key="index" class="list-item">
                    <img-item :pictureList="pictureList3[index]"></img-item>
                </li>
            </ul>
        </div>
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
                pictureList1:[],
                pictureList2:[],
                pictureList3:[],
            }
        },
        created() {
            this.getCollection(this.count);
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
                    this.count += 6
                    this.loading = false
                }, 200)
            },
            getCollection(count){
                this.getRequest(`/getCollectAlbum/${count}`).then(res=>{
                    this.pictureList1.push(...res.data.slice(0,res.data.length/3));
                    this.pictureList2.push(...res.data.slice(res.data.length/3,2*res.data.length/3));
                    this.pictureList3.push(...res.data.slice(2*res.data.length/3));
                    console.log(this.pictureList1);
                    console.log(this.pictureList2);
                    console.log(this.pictureList3);
                })
            }
        }
    }
</script>

<style scoped>
    .mine-collection{
        position: relative;
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
        width: 1180px;
        padding: 0;
        margin: 0;
    }
    li{
        list-style:none;
        margin: 10px;

    }
</style>