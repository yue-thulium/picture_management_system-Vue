<template>
    <div class="infinite-list-wrapper" >
        <ul     class="list"
                v-infinite-scroll="load"
                :infinite-scroll-disabled="disabled"
                :infinite-scroll-distance="21"
        >
            <li v-for="i in count" class="list-item">{{ i }}</li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                count: 35,
                loading: false
            }
        },
        computed: {
            noMore () {
                return this.count >= 70
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods: {
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 5
                    this.loading = false
                }, 1000)
            }
        }
    }
</script>

<style scoped>
    .infinite-list-wrapper{
        width: 100%;
    }
    ul{
        height: 100%;
    }
</style>
