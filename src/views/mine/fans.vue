<template>
    <div class="mine-fans">
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
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "fans",
        created() {
            this.getFollows();
        },
        methods: {
            getFollows(){
                this.getRequest('/getFans').then(res=>{
                    this.tableData=res.data;
                    console.log(res);
                })
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
    .mine-fans{
       margin: 0 auto;
    }

</style>