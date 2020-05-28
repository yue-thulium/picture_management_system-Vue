<template>
    <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                isShow:false,
            };
        },
        created() {
            this.$store.dispatch("controlSidebar/showCollapse",this.isShow);
        },
        methods:{
            collapseChage() {
                this.isShow = !this.isShow;
                console.log(this.isShow);
                this.$store.dispatch("controlSidebar/showCollapse",this.isShow);
            },
        },
        mounted() {
            if (document.body.clientWidth < 1000) {
                this.collapseChage();
            }
        }
    }
</script>

<style scoped>
    .collapse-btn:hover{
        background-color: #009688!important;
    }
</style>