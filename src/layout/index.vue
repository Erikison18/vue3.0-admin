<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="layOutSettingStore.fold ? true : false"
          :default-active="$route.path"
          mode="vertical"
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'

const userStore = useUserStore()
const layOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    // z-index: 100;
    // background-color: #fff;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    // z-index: 100;
    // background-color: #fff;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
