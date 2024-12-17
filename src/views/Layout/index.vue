<script setup>
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
</script>

<template>
    <LayoutFixed/>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <!-- 缓存问题：当路由path一样，参数不同的时候会选择直接复用路由对应的组件 -->
    <!-- 给router-view添加key ,破坏复用机制，强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath"/> -->
    <RouterView/>
    <LayoutFooter></LayoutFooter>
</template>

<style scoped></style>