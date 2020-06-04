<template>
    <div class="mine-fans">
        <div class="test">
            <ul >
                <li v-for="i in count.slice(0,count.length/3)">
                    <h2 >我的粉丝{{i}}</h2>
                </li>
            </ul>
            <ul >
                <li v-for="i in count.slice(count.length/3,2*count.length/3)">
                    <h2 >我的粉丝{{i}}</h2>
                </li>
            </ul>
            <ul >
                <li v-for="i in count.slice(2*count.length/3)">
                    <h2 >我的粉丝{{i}}</h2>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "fans",
        data(){
            return{
                count:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
            }
        },

    }
</script>

<style scoped>
    .mine-fans{
        z-index: 999;
    }
    .test{
        display: flex;
        flex-wrap: wrap;
    }
</style>