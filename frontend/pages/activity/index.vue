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

const page = ref(1)
const activityRes = ref<{ activities: Activity[] }>({ activities: [] })

async function fetchActivities() {
    const response = await axios.get<{ activities: Activity[] }>('/api/activity', {
      params: {
        page: page.value
      }
    })

      activityRes.value = response.data


}

await fetchActivities()

watch(page, () => {
  fetchActivities()
})
</script>
<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-4xl font-bold mb-12 text-center text-gray-800">กิจกรรมทั้งหมด</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <NuxtLink
        v-for="activity in activityRes.activities"
        :key="activity.id"
        :to="`/activity/${activity.id}`"
        class="card bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
      >
        <figure class="w-full h-64 overflow-hidden">
          <img :src="activity.images[0]" class="w-full h-full object-contain" alt="รูปภาพกิจกรรม"/>
        </figure>
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{{ activity.title }}</h2>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ activity.description }}</p>
          </div>
          <div class="flex justify-between items-center mt-auto">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="ml-1 text-gray-600">{{ activity.score }}</span>
            </div>
            <div class="flex space-x-2">
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">0/1000</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">15/6/2567</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="flex justify-center space-x-4 mt-12">
      <button
        v-if="page > 1"
        @click="page--"
        class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        ย้อนกลับ
      </button>
      <button
        @click="page++"
        class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        ถัดไป
      </button>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1300px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
