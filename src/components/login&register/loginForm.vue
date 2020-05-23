<template>
    <el-form ref="loginForm" :model="loginForm">
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" prefix-icon="el-icon-user"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-key"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 300px" v-loading="loading" @click.native.prevent="submitClick">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                loginForm: {
                    username: 'admin',
                    password: 'admin1222'
                },
                loading: false,
            }
        },
        mounted: function () {
        },
        methods: {
            submitClick: function () {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('user/login', this.loginForm)
                            .then(() => {
                                this.$router.push('/mainPage/test');
                                next();
                                this.loading = false
                            })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
