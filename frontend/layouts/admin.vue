<script lang="ts" setup>

const { logout } = useAuth()

interface Link {
    text: string
    to: string
}

const linkList: Link[] = [
    { text: 'หน้าระบบหลัก', to: '/admin/dashboard' },
    { text: 'แก้ไขรายระเอียดนักศึกษา', to: '/admin/edit' },
    { text: 'จัดการกิจกรรม', to: '/admin/activity' }
]

</script>

<template>
  <div class="flex min-h-screen">
    <aside class="bg-slate-600 w-44 flex flex-col sticky top-0 h-screen">
      <h1 class="text-lg font-bold text-center text-slate-100 m-2">กิจกรรมวิทยาลัยเทคนิคชัยภูมิ</h1>
      <ul class="list-none flex flex-col flex-grow">
        <li v-for="link in linkList" :key="link.to">
          <nuxt-link class="mt-3 text-lg font-bold w-44 text-slate-100 btn btn-ghost" :to="link.to">{{ link.text }}</nuxt-link>
        </li>
        <li class="mt-auto">
          <div @click="logout" class="mt-3 text-lg font-bold w-44 text-slate-100 btn btn-ghost bg-red-600 hover:bg-red-800">ออกจากระบบ</div>
        </li>
      </ul>
    </aside>

    <main class="p-3 grow">
      <div class="container">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
}


</style>

