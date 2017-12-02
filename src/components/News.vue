<template>
    <div id="news">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    // export with the name 'News'
    export default {
        name: 'news',
        data() {
            return {
                msg: 'hello'
            }
        }
    }
</script>

<style>
    #news {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
