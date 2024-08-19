<script setup lang="ts">
interface Activity {
  id: number;
  title: string;
  description: string;
  images: string[];
  score: number;
  createdAt: string;
  updatedAt: string;
}

const axios = useAxios()
const route = useRoute()
import Swal from 'sweetalert2'


function seccess() {
  Swal.fire({
            icon: "success",
            title: "จองกิจกรรมสำเร็จ",
            showConfirmButton: false,
            timer: 1700
          });
}




const { data } = await axios.get<{ activity: Activity }>(`/api/activity/${route.params.id}`)
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img :src="data.activity.images[0]" class="h-48 w-full object-cover md:w-48" alt="รูปภาพกิจกรรม"/>
          <button @click="seccess" class="btn btn-success px-14 mt-4 text-white hover:bg-green-600 transition  ease-in-out transform hover:scale-105">
         จองกิจกรรม
           </button>
        </div>

        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">กิจกรรม</div>
          <h1 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ data.activity.title }}
          </h1>
          <p class="mt-4 max-w-4xl text-xl text-gray-500">
            {{ data.activity.description }}
          </p>
          <div class="mt-6">
            <div class="flex items-center">
              <div class="flex items-center">
                <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-2 text-gray-600">{{ data.activity.score }} คะแนน</span>
              </div>
              <span class="mx-4 text-gray-300">|</span>
              <div class="text-gray-600">
                กิจกรรมเริ่มวันที่ : 15/6/2567
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
