<script setup lang="ts">
  useHead({ title: "จัดการข้อมูลนักศึกษา" });
definePageMeta({
  layout: "admin",
  middleware: ["only-admin"],
});
</script>

<template>
  <div>
    <h1>นักศึกษา</h1>
  </div>
</template>



<style scoped>

</style>
