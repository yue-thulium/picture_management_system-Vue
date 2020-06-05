<template>
    <div>
        <div class="userTX" id="imgUploadContent">
            <div class="fn-clear">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="doUpload"
                        :limit="1"
                        :show-file-list="false"
                        :before-upload="beforeUpload">
                    <el-button slot="trigger" style="width:180px" type="success" round size="medium">选取文件</el-button>
                </el-upload>
            </div>
            <div class="userTXPic">
                <div class="userTXPicText">仅支持JPG、PNG格式且文件小于5M</div>
                <div style="width:240px; height:240px;"><img style="width:240px; height:240px;" :src="imgPath"></div>
            </div>
            <div class="userTXShow">
                <div class="fn-clear">
                    <div class="userTXPicText">您上传的图片会自动生成一下三种尺寸，请观察是否清晰</div>
                    <div class="userTX_150x150"><img :src="imgPath"><span>150*150</span></div>
                    <div class="userTX_60x60"><img :src="imgPath"><span>60*60</span></div>
                    <div class="userTX_30x30"><img :src="imgPath"><span>30*30</span></div>
                </div>
                <el-button style="margin-top: 5%;margin-right: 100%" type="success" round size="medium" @click="confirmUpload">确认上传</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgPath:'http://120.27.241.26/group1/M00/00/00/rBDDUl5bgbqAdAK3AAANpobPlo0663.png',
                files : '',
                fileName: ''
            }
        },
        mounted: function () {
        },
        methods: {
            beforeUpload(file){
                this.files = file;
                const extension = file.name.split('.')[1] === 'png';
                const extension2 = file.name.split('.')[1] === 'jpg';
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!extension && !extension2) {
                    this.$message.warning('上传图片只能是 png、jpg格式!');
                    return
                }
                if (!isLt2M) {
                    this.$message.warning('上传图片大小不能超过 1MB!');
                    return
                }
                this.fileName = file.name;
                console.log(this.files);
                const fileReader = new FileReader();
                fileReader.addEventListener('load',() => {
                    this.imgPath = fileReader.result
                });
                fileReader.readAsDataURL(this.files);
                this.image = this.files;
                return false // 返回false不会自动上传
            },
            confirmUpload(){
                if(this.fileName == ""){
                    this.$message.warning('请选择要上传的文件！')
                    return false
                }
                let file = new FormData();
                //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                file.append('file', this.files, this.fileName);
                this.uploadFileRequest('/changeIcon',file).then(resp => {
                    if (resp.data.code === 200) {
                        this.$message.success(resp.data.message);
                        this.$router.push('/person/personal_data/base');
                    } else {
                        this.$message.error(resp.data.message);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .userTX{ padding:30px 0 0 30px;}
    .userTXPic{width:290px; float:left; border-right:1px solid #dcdcdc;}
    .userTXPicText{font-size:12px; color:#999; line-height:30px; margin-bottom:10px; overflow:hidden;}
    .userTXShow{width:450px; float:left; padding-left:50px;}
    .userTX_150x150{width:150px; height:180px;}
    .userTX_60x60{width:60px; height:90px;}
    .userTX_30x30{width:30px; height:60px;}
    .userTX_150x150,.userTX_60x60,.userTX_30x30{float:left; margin-right:25px;color:#999; font-size:12px; text-align:center;}
    .userTX_150x150 img{width:150px; height:150px;}
    .userTX_60x60 img{width:60px; height:60px;}
    .userTX_30x30 img{width:30px; height:30px;}
</style>
