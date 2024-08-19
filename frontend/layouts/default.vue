<script lang="ts" setup>
// ไม่ต้องเปลี่ยนแปลงส่วน script
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <main class="flex-grow container px-4 sm:px-0">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* ไม่จำเป็นต้องใช้ style เพิ่มเติม เนื่องจากใช้ Tailwind classes แล้ว */
</style>
