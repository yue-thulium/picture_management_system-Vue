<template>
    <div class="main-square"
         v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="1"
         :infinite-scroll-immediate="false"
         infinite-scroll-immediate>
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
        name: "haveALook",
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
        mounted () {
             this.getPicture(this.count);
        },
        computed: {
            noMore () {
                return this.count >= 30
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
                    this.getPicture(this.count);
                }, 200)
            },
            getPicture(count){
              this.getRequest(`/getOnePageAlbum/${count}`).then(res=>{
                  this.pictureList1.push(...res.data.message.slice(0,res.data.message.length/3));
                  this.pictureList2.push(...res.data.message.slice(res.data.message.length/3,2*res.data.message.length/3));
                  this.pictureList3.push(...res.data.message.slice(2*res.data.message.length/3));
              })
            },
        }
    }
</script>

<style scoped>
    .main-square{
        position: relative;
        padding: 0;
        width: 100%;
        flex: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .list-item{
        background-color: white;
        height: auto;
        padding: 0 15px;
    }
    .list{
        height: 100%;
        display: block;
        align-items: center;
        padding: 0;
        margin: 0 ;
        overflow-x: auto;
    }
    .list-item{
        list-style:none;
        margin: 10px;
    }
</style>