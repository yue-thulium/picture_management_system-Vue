<template>
    <div class="publish-picture">
        <el-upload type=""
                   class="avatar-uploader"
                   ref="upload"
                   :action="basepath"
                   :limit="1"
                   :data="{tags:tagList}"
                   :auto-upload="false"
                   accept="image/jpeg,image/gif,image/png"
                   :show-file-list="true"
                   :on-progress="onAvatarUpload"
                   :on-success="handleAvatarSuccess"
                   :on-change="onAvatarChange"
                   :before-upload="beforeAvatarUpload"
        >
            <div><span class="propaganda">图片上传</span></div>
            <img :src="imgUrl" alt="" v-if="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
        <el-form :label-position="'right'" label-width="80px" >
            <el-form-item label="图片标题">
                <el-input  v-model="tittle" placeholder="这里是标题文字..."></el-input>
            </el-form-item>
            <el-form-item label="图片tags">
                <el-checkbox-group v-model="tags">
                    <el-checkbox :label="item.tag_name" border size="medium" v-for="item in tagList" :key="item.id"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "publish-picture",
        data() {
            return {
                ad_url: '',//上传后的图片或视频URL
                basepath:'/releaseAtlas',//上传UR
                imgUrl:'',
                tittle:'',
                tagList:[],
                tags:[],
            }
        },
        created() {
            this.getRequest("/getAllPictureTag").then(res=>{
                this.tagList=res.data;
                console.log(this.tagList);
            })
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(file);
                console.log(res);
                console.log('--------------');
                console.log(this.imgUrl);
                this.tags = this.arrayToJson(this.tags);
                console.log(this.tags)
                console.log(this.tittle);
                //下面才是真正的上传文章
                this.imgUrl = res;
                console.log('正在上传的url为：'+this.imgUrl);
                // this.postRequest('/tfrArticle/addArticle', this.formLabelAlign).then(res => {
                //     const h = this.$createElement;
                //     this.$notify({
                //         title: '提示信息',
                //         message: h('i', {style: 'color: teal'}, '您已成功创建托福文章')
                //     });
                // })
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return isLt2M;
            },
            onAvatarUpload(event, file, fileList){
            },
            onAvatarChange(file, fileList){
                console.log('change');
                console.log(file);
                // 显示上传成功的图片
                if(file.status == 'ready')
                    this.imgUrl = URL.createObjectURL(file.raw);
            },
            uploaderror(err, file, fileList) {
                console.log(err);
                console.log(file);
                console.log(fileList);
            },

            onSubmit() {
                console.log('submit!');
                this.$refs.upload.submit()
            },
            arrayToJson(arr){
                return JSON.stringify(arr.map((val,index)=>{
                    var id = null;
                    this.tagList.map((res)=>{
                        if(res.tag_name == val)
                            id=res.id;
                    })
                    return {
                        id:id,
                        tag_name: val,
                    }
                }))
            },
        },
    }
</script>

<style scoped>
    .publish-picture{
        position: relative;
        margin-left: 0px;
        padding: 0;
        width: 100%;
        flex: 5;
    }
    .el-form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .el-form-item {
        width: 1300px;
    }
    .propaganda{
        color:#3c763d;
        box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
    }
    .avatar-uploader{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        max-width: 850px;
        max-height: 600px;
        display: block;
    }
    .el-upload__input input[file] {
        display: none;
    }
</style>