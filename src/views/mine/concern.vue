<template>
    <div class="mine-concern">
        <el-table
                :data="tableData"
                style="width: 100%"
                highlight-current-row
               >
            <el-table-column
                    label="用户"
                    width="180">
                <template slot-scope="scope">
                    <img :src="'http://120.27.241.26/'+scope.row.icon" alt="" style="width: 80px;height:80px;">
                </template>
            </el-table-column>
            <el-table-column
                    prop="nick_name"
                    label="昵称"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">取消关注</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "mine-concern",
        created() {
            this.getFollows();
        },
        methods: {
            getFollows(){
              this.getRequest('/getFollows').then(res=>{
                  this.tableData=res.data;
                  console.log(res);
              })
            },
            handleDelete(index, row) {
                console.log(index);
                this.getRequest(`/dropFollows/${row.username}`).then(res => {
                    if(res.data.code==200){
                        this.$message({
                            type: 'success',
                            message: '取消关注   '
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
        data() {
            return {
                tableData: [],
            }
        }
    }
</script>

<style scoped>
    .mine-concern{
        margin: 0 auto;

    }
</style>