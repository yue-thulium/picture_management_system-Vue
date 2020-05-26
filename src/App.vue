<template>
    <div id="app">
        <router-view></router-view>
        <vue-particles
                color="#FAEBD7"
                :particleOpacity="0.3"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#CDC673"
                :linesWidth="2"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true  "
                hoverMode="grab"
                :clickEffect="false"
        >
        </vue-particles>
    </div>
</template>

<style>
    body{
        background-color: #f5f5fa;
    }
    #particles-js{
        background-size:cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(~assets/back.png) repeat -1 center;
    }
</style>
