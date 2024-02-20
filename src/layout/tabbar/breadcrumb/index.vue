<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      v-show="!item.meta.hidden && item.meta.title"
      :key="index"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'

let layOutSettingStore = useLayOutSettingStore()

let $route = useRoute()
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss"></style>
