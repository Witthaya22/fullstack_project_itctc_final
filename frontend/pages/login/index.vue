<script setup lang="ts">
definePageMeta({
  layout: false,
});
useHead({ title: "เข้าสู่ระบบ" });

const { checkAuth } = useAuth();
const router = useRouter()
const axios = useAxios()

const input = reactive({
  email: '',
  password: '',
})

const loading = ref(false)

// const { $swal } = useNuxtApp()
import Swal from 'sweetalert2'



async function onLogin() {
  loading.value = true
  try {
    const res = await axios.post<{ message: string }>('/api/login', input)

    const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: res.data.message
  });


    // $swal.fire({
    // title: "เข้าสู้ระบบสำเร็จ!",
    // text: res.message,
    // icon: "success"
  // });
    // alert(res.message)
    await checkAuth()
    router.push('/')
  } catch (error: any) {
    Swal.fire({
    icon: "error",
    title: error.response?.data?.message || "เกิดความผิดพลาด",
  });
    // alert(error.data.message)
  }
  loading.value = false

}
</script>

<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <div class="w-1/2 h-screen hidden lg:block">
      <img
        src="@/assets/images/login1.png"
        alt="Placeholder Image"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-3xl font-semibold mb-4 text-center">เข้าสู่ระบบ</h1>
      <form @submit.prevent="onLogin()">
        <div class="mb-4">
          <label
            for="email"
            class="block text-base font-medium text-gray-700 my-2"
            >เลขประจำตัวนักศึกษา</label
          >
          <input
            v-model="input.email"
            type="text"
            id="email"
            name="email"
            class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition-colors duration-300"
            autocomplete="off"
          />
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="block text-base font-medium text-gray-700 my-2"
            >รหัสผ่าน <span class="text-slate-500 italic">(เลขบัตรประชาชน)</span></label
          >
          <input
            v-model="input.password"
            type="password"
            id="password"
            name="password"
            class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 transition-colors duration-300"
            autocomplete="off"
          />
        </div>

        <div class="mb-6 text-blue-500">
          <nuxt-link to="/FGpassword"class="hover:underline">ลืมรหัสผ่าน</nuxt-link>
        </div>
        <button
          type="submit"
          class="bg-info hover:bg-sky-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          เข้าสู่ระบบ
        </button>
      </form>
      <div class="mt-6 text-blue-500 text-center">
        <nuxt-link to="signup" class="hover:underline"
          >สมัครสมาชิก</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
