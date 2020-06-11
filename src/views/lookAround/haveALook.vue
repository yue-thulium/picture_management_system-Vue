<template>
    <div class="main-square"
         v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="20"
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
                tagList:[],
                count: 6,
                loading: false,
                pictureList1:[],
                pictureList2:[],
                pictureList3:[],
            }
        },
        created () {
            if(this.$route.query.tag!=null) {
                this.tagList=[];
                this.tagList.push(this.$route.query.tag);
                this.tagList=this.arrayToJson(this.tagList);
                this.getPicSearch();
            }
            else{
                this.getPicture(this.count);
            }
        },
        watch: {
            $route (to, from) {
                if(to.query.tag){
                    this.tagList=[];
                    this.tagList.push(this.$route.query.tag);
                    this.tagList=this.arrayToJson(this.tagList);
                    this.pictureList1.splice(0);
                    this.pictureList2.splice(0);
                    this.pictureList3.splice(0);
                    this.getPicSearch();
                }
                else {
                    this.pictureList1.splice(0);
                    this.pictureList2.splice(0);
                    this.pictureList3.splice(0);
                    this.getPicture(this.count);
                }
            }
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
                    if(this.tagList.length!=0){
                        this.getPicSearch();
                    }
                    else{
                        this.getPicture(this.count);
                    }
                }, 200)
            },
            getPicture(count){
              this.getRequest(`/getOnePageAlbum/${count}`).then(res=>{
                  this.pictureList1.push(...res.data.message.slice(0,res.data.message.length/3));
                  this.pictureList2.push(...res.data.message.slice(res.data.message.length/3,2*res.data.message.length/3));
                  this.pictureList3.push(...res.data.message.slice(2*res.data.message.length/3));
              })
            },
            getPicSearch(){
                console.log(this.tagList);
                this.postRequest('/getAlbumByTags', {tags: this.tagList,pageNumber:this.count}).then(res => {
                    console.log(res);
                    this.pictureList1.push(...res.data.slice(0,res.data.length/3));
                    this.pictureList2.push(...res.data.slice(res.data.length/3,2*res.data.length/3));
                    this.pictureList3.push(...res.data.slice(2*res.data.length/3));
                })
            },
            arrayToJson(arr){
                return JSON.stringify(arr.map((val,index)=>{
                    let id = val.replace(/[^0-9]/ig,"");
                    return {
                        id:id,
                        tag_name: val,
                    }
                }))
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
        overflow: hidden;
    }
    .list-item{
        list-style:none;
        margin: 10px;
    }
</style>