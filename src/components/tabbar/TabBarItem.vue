<template>
    <div class="tab-bar-item">
        <slot name="tabBar">
            <router-link tag="a" :to="{name:'showSquare',params: { text: 123 },query: { plan: text }}" v-for="text in tabItems" :key="text" class="tag" >{{text}}</router-link>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            tabItems: {
                type: Array,
                default(){
                    return ['涩图1','涩图2','涩图3','涩图4'];
                }
            },
        },
    }
</script>

<style scoped>
    .tab-bar-item{
        display: flex;
    }
    .tag{
        max-width: 72px;
        height: 28px;
        margin: 10px 10px 5px 5px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 6px;
        background-color: #f5f5fa;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        color: #252526;
        text-decoration: none;
        transition: all .2s ease;
    }
</style>