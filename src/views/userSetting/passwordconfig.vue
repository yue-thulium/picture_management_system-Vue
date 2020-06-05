<template>
    <el-form ref="passwordInfFrom" :model="passwordInf" :rules="rules" label-width="95px" style="width: 30%;margin-top: 30px" >
        <el-form-item label="旧密码：" prop="oldpass">
            <el-input v-model="passwordInf.oldpass"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newpass">
            <el-input type="password" v-model="passwordInf.newpass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="chickpass">
            <el-input type="password" v-model="passwordInf.chickpass"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 200px" @click.native.prevent="confirmChange" :loading="isLaoding">确认修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passwordInf.chickpass !== '') {
                        this.$refs.passwordInfFrom.validateField('checkpass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordInf.newpass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passwordInf:{
                    oldpass: '',
                    newpass: '',
                    chickpass: ''
                },
                rules:{
                    oldpass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
                    newpass: [{ validator: validatePass, trigger: 'blur', required: true }],
                    chickpass: [{ validator: validatePass2, trigger: 'blur', required: true }],
                },
                isLaoding : false
            }
        },
        mounted: function () {
        },
        methods: {
            confirmChange() {
                this.$refs.passwordInfFrom.validate(valid => {
                    if (valid){
                        this.isLaoding = true;
                        this.postRequest('/changePass',{
                            'oldpass' : this.passwordInf.oldpass,
                            'newpass' : this.passwordInf.newpass
                        }).then(resp => {
                            this.isLaoding = false;
                            if (resp.data.code === 200) {
                                this.$message.success(resp.data.message)
                            } else {
                                this.$message.error(resp.data.message)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
