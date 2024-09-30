<script setup>
import "@styles/markdown.css";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { ref, computed } from "vue";
import { marked } from "marked"; // 导入 marked 库

// 接收父组件的 content 参数
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// 将 content 初始化为 props.content
const content = ref(props.content);
// 创建一个计算属性来渲染 Markdown，忽略头部
const renderedContent = computed(() => {
  const contentWithoutFrontmatter = content.value.replace(/^---[\s\S]*?---/, "").trim();
  return marked(contentWithoutFrontmatter);
});

// 处理表单提交事件
async function onSubmit() {
  const res = await fetch("/api/ghpush", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // path: `src/content/doc/${props.path}.md`,
      path: `README.md`,
      content: content.value,
      message: "更新 " + props.path,
    }),
  });
  console.log(res);
  console.log(await res.json());
}

// 返回上一页
function goBack() {
  window.history.back();
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div id="mdx" class="flex justify-between items-center">
      <h1 class="text-2xl font-bold my-4">编辑 {{ path }}</h1>
      <div class="flex gap-2 items-center">
        <Button>保存修改</Button>
        <Button variant="outline" ariant="outline" @click="goBack">返回文档</Button>
      </div>
    </div>
    <div class="grid grid-cols-6 lg:grid-cols-7 gap-4">
      <Textarea v-model="content" class="col-span-3 h-[80vh]" style="resize: none"></Textarea>
      <div v-html="renderedContent" class="p-4 border rounded-md col-span-3 lg:col-span-4 h-[80vh] overflow-y-auto"></div>
    </div>
  </form>
</template>
