<script lang="ts" setup>
const { auth, logout } = useAuth();

import swal from 'sweetalert2'

const checkSmallAdmin = () => {
  if (auth.value?.email === '66309010020' ) {
    return true
  }
}


const logoutConfirm = () => {
  swal.fire({
    title: "ออกจากระบบ",
    text: "คุณต้องการออกจากระบบใช่หรือไม่",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  })
    .then((result) => {
      if (result.isConfirmed) {
        logout()
      }
    });
  // if (swal.isConfirmed) {
  //   logout()
  // }
}

</script>

<template>
  <div class="navbar">
    <div class="w-14 ms-4 rounded-full">
      <img alt="Tailwind CSS Navbar component" src="@/assets/images/logo.png" />
    </div>
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost text-xl"
        >กิจกรรมวิทยาลัยเทคนิคชัยภูมิ</NuxtLink
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li v-if="checkSmallAdmin()"><NuxtLink to="/forSmallAdmin" class="text-lg font-bold text-yellow-500 btn mx-1 btn-ghost">จัดการกิจกรรม</NuxtLink></li>
        <li><NuxtLink to="/" class="text-lg font-bold btn mx-1 btn-ghost">หน้าหลัก</NuxtLink></li>
        <!-- <li><NuxtLink to="/activity" class="text-lg font-bold btn mx-1 btn-ghost">กิจกรรม</NuxtLink></li> -->
        <div class="dropdown dropdown-end z-10">
            <summary  tabindex="0" role="button"  class="text-lg  font-bold   btn mx-1 btn-ghost  hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white">กิจกรรมทั้งหมด</summary>
          <ul tabindex="0" class="dropdown-content ">
            <li><nuxt-link class="text-base font-bold shadow-2xl my-1 bg-lime-700 hover:bg-lime-500 text-white"  to="/activity">กิจกรรมที่เปิด</nuxt-link></li>
            <li><nuxt-link class="text-base font-bold shadow-2xl my-1 bg-pink-700 hover:bg-pink-500 text-white"  to="/profile/editActivity">กิจกรรมที่จอง</nuxt-link></li>
          </ul>
        </div>
        <li>
          <NuxtLink to="about" class="text-lg font-bold btn mx-1 btn-ghost">เกี่ยวกับเรา</NuxtLink>
        </li>
        <li>
          <NuxtLink to="contact" class="text-lg font-bold btn mx-1 btn-ghost">ติดต่อเรา</NuxtLink>
        </li>
        <template v-if="auth">
          <div class="dropdown dropdown-end">
            <summary  tabindex="0" role="button"  class="text-lg  font-bold   btn mx-1 btn-ghost  hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white">{{ auth.email }}</summary>
          <ul tabindex="0" class="dropdown-content ">
            <li>  <nuxt-link class="text-lg font-bold shadow-2xl my-1 bg-teal-700 hover:bg-teal-500 text-white"  to="/profile">ดูรายระเอียด</nuxt-link></li>
              <li><a @click="logoutConfirm" class="text-lg font-bold shadow-2xl my-1 bg-red-700 hover:bg-red-500 text-white" >ออกจากระบบ</a></li>
          </ul>
        </div>

          <!-- <details class="dropdown dropdown-end ">
            <summary  tabindex="0" role="button"  class="text-lg  font-bold   btn mx-1 btn-ghost  hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white">{{ auth.email }}</summary>
            <ul tabindex="0" class="dropdown-content">
              <li>  <nuxt-link class="text-lg font-bold shadow-2xl my-1 bg-green-700 text-white"  to="/profile">ดูรายระเอียด</nuxt-link></li>
              <li><a @click="logout" class="text-lg font-bold shadow-2xl my-1 bg-red-700 text-white" >ออกจากระบบ</a></li>
            </ul>
          </details> -->
        </template>
        <template v-else>
          <div>
            <li>
              <NuxtLink
                to="login"
                class="text-lg font-bold text-slate-100 btn btn-info"
                >เข้าสู่ระบบ</NuxtLink
              >
            </li>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
