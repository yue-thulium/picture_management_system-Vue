<template>
   <div  v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="2"
         :infinite-scroll-immediate="true"
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
         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button
                       size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
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
             tableData: [],
             noMore:false,
             multipleSelection: []
          }
       },
       created() {
           this.getformdata();
       },
       computed: {
          disabled () {
             return this.loading || this.noMore
          }
       },
       methods:{
          load () {
             this.loading = true
             setTimeout(() => {
                this.count += 6
                this.getformdata();
             }, 500)
          },
         getformdata(){
            this.getRequest(`/getMyAlbum/${this.count}`).then(res=>{
               this.tableData.push(...res.data.message);
               if(res.data.message.length < 6){
                  this.noMore=true;
                  console.log( this.count);
               }
               else {
                  this.noMore=false;
                  this.loading = false
               }

            })
         },
          handleDelete(index, row) {
             console.log(index);
             console.log(row);
             this.getRequest(`/deleteAlbum/${row.id}`).then(res => {
                if(res.data.code==200){
                   this.$message({
                      type: 'success',
                      message: '删除成功   '
                   });
                   this.tableData.splice(index,1);
                }
                else{
                   this.$message({
                      type: 'error',
                      message: '网络有波动 ，稍微再试试吧'
                   });
                }
             });
          },
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