<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { Expand, Fold } from "@element-plus/icons-vue";

const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>
<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="globalStore.isCollapse ? Expand : Fold"></component>
  </el-icon>
</template>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
