<script setup lang="ts">
// import Activity from '@/interface/activity.ts'
useHead({ title: "จัดการกิจกรรม" });
definePageMeta({
  layout: "admin",
  middleware: ["only-admin"],
});

interface Activity {
  id: number;
  title: string;
  description: string;
  images: string[];
  score: number;
  createdAt: string;
  updatedAt: string;
}

const page = ref(1);
const activities = ref<Activity[]>([])
const axios = useAxios()

async function fetchActivities() {
    const res = await axios.get<{ activities: Activity[] }>(
      '/api/activity',
      {
        params: {
          page: page.value,
        },
      }
    );
    activities.value = res.data.activities;

}

await fetchActivities();
watch(page, () => fetchActivities())
</script>

<template>
  <div>
    <h2 class="font-bold text-2xl">รายการกิจกรรม</h2>
    <hr class="my-3" />
    <nuxt-link class="btn btn-info text-white" to="/admin/activity/create">เพิ่มกิจกรรม</nuxt-link>
    <div class="overflow-x-auto relative mt-3">
      <table class="table w-full">
        <thead>
          <tr class="bg-gray-200">
            <th>ID</th>
            <th>ชื่อกิจกรรม</th>
            <th>คะแนน</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td>{{ activity.id }}</td>
            <td>{{ activity.title }}</td>
            <td>{{ activity.score }}</td>
            <td>
              <nuxt-link class="text-blue-500" :to="`/admin/activity/${activity.id}`">แก้ไข</nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="space-x-5 text-right container mt-2 mr-1">
      <span v-if="page > 1" class="text-xl btn btn-ghost text-blue-600 cursor-pointer" @click="page--">ย้อนกลับ</span>
      <span class="text-xl btn btn-ghost text-blue-600 cursor-pointer" @click="page++">ถัดไป</span>
    </div>
  </div>
</template>
