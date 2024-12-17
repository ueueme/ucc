<script setup>
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhCn from "element-plus/es/locale/lang/zh-cn";

</script>

<!-- <template> -->
  <!-- <header> -->
  <!-- <el-button type="primary">按钮</el-button>
    <h1>helloworld</h1> -->
  <!-- hello -->
  <!-- </header> -->
  <!-- <RouterView />
</template> -->

<template>
  <el-config-provider :locale="zhCn">
    <router-view/>
  </el-config-provider>
</template>



<style scoped lang="scss">
header {
  color: $priceColor;
}
</style>