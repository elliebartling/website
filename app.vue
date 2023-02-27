<template>
  <div>
    <h1>{{ data.icon.emoji }}</h1>
  </div>
</template>
<script setup>
const { data } = await useFetch('/api/page')
</script>