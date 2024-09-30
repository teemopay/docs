<script setup lang="ts">
import { ref } from "vue";
import { navigate } from "astro:transitions/client";

// 定义选项接口
interface Option {
  value: string;
  label: string;
}

// 定义组件的属性
interface Props {
  options: Option[];
  currentCountry: string;
}

// 使用 withDefaults 函数将 props 转换为响应式变量
const props = withDefaults(defineProps<Props>(), {
  currentCountry: "",
});

// 使用 ref 创建响应式变量，初始值为当前国家
const selectedCountry = ref(props.currentCountry);

// 定义导航函数
const navigateToCountry = () => {
  if (selectedCountry.value) {
    // 如果选择了国家，导航到该国家的 payin/create 页面
    navigate(`/${selectedCountry.value}/payin/create`);
  } else {
    // 如果没有选择国家，导航到首页
    navigate(`/`);
  }
};
</script>

<template>
  <select class="focus:outline-none" v-model="selectedCountry" @change="navigateToCountry">
    <option v-for="option in options" :key="option.value" :value="option.value" :selected="currentCountry === option.value">
      {{ option.label }}
    </option>
  </select>
</template>
