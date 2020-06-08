<template>
   <div  v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="20"
         :infinite-scroll-immediate="false"
        >
      <el-table
              :data="tableData"
              style="width: 100%">
         <el-table-column type="expand">
            <template slot-scope="props">
               <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="">
                     <img-item :pictureList="props.row"></img-item>
                  </el-form-item>
                  <el-form-item label="发布时间">
                     <span>{{ props.row.create_time }}</span>
                  </el-form-item>
               </el-form>
            </template>
         </el-table-column>
         <el-table-column
                 label="标题"
                 prop="tittle">
         </el-table-column>
         <el-table-column
                 label="发布时间"
                 prop="create_time">
         </el-table-column>
      </el-table>
   </div>
</template>

<script>
   import ImgItem from "../../components/pictureItem/ImgItem";
    export default {
        name: "UserSetting",
       components:{
          ImgItem,
       },
       data() {
          return {
             count:6,
             loading: false,
             tableData: []
          }
       },
       created() {
           this.getformdata();
       },
       computed: {
          noMore () {
             return this.count >= 30
          },
          disabled () {
             return this.loading || this.noMore
          }
       },
       methods:{
          load () {
             this.loading = true
             setTimeout(() => {
                this.count += 6
                this.loading = false
                this.getformdata();
             }, 200)
          },
         getformdata(){
            this.getRequest(`/getMyAlbum/${this.count}`).then(res=>{
               console.log(res);
               this.tableData.push(...res.data.message);
            })
         }
       },
    }
</script>

<style scoped>
   .demo-table-expand {
      font-size: 0;
   }
   .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
   }
   .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
   }
</style>