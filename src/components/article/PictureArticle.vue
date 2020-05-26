<template>
    <div class="article-picture">
        <article style="max-height: 64px">
            <slot name="text"><a href="#">这里是文字内容这里是文字内容这里是文字内容这里是文字内容这里是文字内容</a></slot>
        </article>
    </div>
</template>

<script>
    export default {
        name: "PictureArticle"
    }
</script>

<style scoped>
    .article-picture{
        overflow: hidden;
        position: relative;
    }
</style>