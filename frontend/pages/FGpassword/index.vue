<script setup lang="ts">
definePageMeta({
  layout: false,
});
useHead({ title: "ลืมรหัสผ่าน" });
</script>

<template>
    <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">ลืมรหัสผ่าน ?</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            โปรดใส่รหัสนักศึกษาของคุณ และรอเราส่งรหัสผ่านใหม่
            
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">รหัสนักศึกษา</label>
                <div class="relative">
                  <input type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error">
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">โปรดระบุที่อยู่อีเมลที่ถูกต้องเพื่อให้เราติดต่อกลับได้</p>
              </div>
              <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">เปลี่ยนรหัสผ่าน</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    
  </main>
</template>

<style scoped>

</style>