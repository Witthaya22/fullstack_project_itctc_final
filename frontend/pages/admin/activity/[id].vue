<script setup lang="ts">
useHead({ title: "เพิ่มกิจกรรม" });
definePageMeta({
  layout: "admin",
  middleware: ["only-admin"],
});

const route = useRoute();
const router = useRouter();
const axios = useAxios();


interface Input {
  title: string;
  description: string;
  images: string[];
  score: number;
}

const input = reactive<Input>({
  title: '',
  description: '',
  images: [],
  score: 0,
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

const id = ref(-1);
const isCreate = route.params.id === 'create';
let refreshCacge: () => Promise<void> | null = null

if (!isCreate) {
  const { data, refresh } = await useAsyncData <{ activity: Activity }>(
    `admin-activity-${route.params.id}`,
    async () => {
      const res = await axios.get(`/api/activity/${route.params.id}`)
      return res.data
    }
   )
  refreshCacge = refresh
  const activity = data.value.activity;
  // const res = await axios.get(`/api/admin/activity/${route.params.id}`)
  // const activity = res.data.activity
  id.value = activity.id;
  input.title = activity.title;
  input.description = activity.description;
  input.images = activity.images;
  input.score = activity.score;
}

// const { $swal } = useNuxtApp();
import Swal from 'sweetalert2';

const loading = ref(false);

async function onUpsertActivity() {
  loading.value = true;
  try {
    const res = await axios.post<{ message: string }>(
      '/api/admin/activity',
      {
        title: input.title,
        description: input.description,
        images: input.images,
        score: input.score
      },
      {
        params: {
          id: id.value
        }
      }
    );
    if (refreshCacge) {
     refreshCacge()
    }

    Swal.fire({
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 1700
    });
    router.push('/admin/activity');
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: error.response?.data?.message || "An error occurred",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h2 class="font-bold text-2xl">{{ isCreate ? 'เพิ่มกิจกรรม' : `แก้ไขกิจกรรม ID: ${id}` }}</h2>
    <hr class="my-3">
    <form @submit.prevent="onUpsertActivity" class="space-y-3">
      <label class="block">
        <div class="mb-1 font-bold">ชื่อกิจกรรม:</div>
        <input v-model="input.title" class="input input-bordered w-full" type="text" placeholder="ชื่อกิจกรรม" />
      </label>
      <label class="block">
        <div class="mb-1 font-bold">คะแนนกิจกรรม:</div>
        <input v-model="input.score" class="input input-bordered w-full" type="number" placeholder="คะแนนกิจกรรม" />
      </label>
      <div>
        <div class="mb-1 font-bold">รูปภาพกิจกรรม:</div>
        <div v-for="(image, i) in input.images" :key="i" class="flex mb-2">
          <input v-model="input.images[i]" class="w-full input" type="url" placeholder="รูปภาพ" />
          <button type="button" class="btn btn-error" @click="input.images.splice(i, 1)">ลบ</button>
        </div>
        <button class="btn btn-primary" type="button" @click="input.images.push('')">เพิ่มรูปภาพ</button>
      </div>
      <label class="block">
        <div class="mb-1 font-bold">คำอธิบาย:</div>
        <textarea v-model="input.description" class="input input-bordered w-full h-40" placeholder="คำอธิบาย"></textarea>
      </label>
      <div>
        <button class="btn btn-success text-white" type="submit">บันทึก</button>
      </div>
    </form>
  </div>
</template>
