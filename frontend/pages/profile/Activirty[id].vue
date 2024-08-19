<script lang="ts" setup>
import { ref, computed } from 'vue'
import QRCodeVue3 from 'qrcode-vue3'

interface Activity {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'booking' | 'completed' | 'failed';
  score: number | null;
}

const activity = ref<Activity>({
  id: 1,
  name: 'ไหว้เจ้า',
  date: '15 สิงหาคม 2024',
  time: '09:00 - 12:00',
  location: 'วัดพระธาตุดอยสุเทพ',
  description: 'กิจกรรมไหว้เจ้าประจำปีของวิทยาลัย เพื่อความเป็นสิริมงคลแก่นักศึกษาและบุคลากรทุกท่าน',
  status: 'booking',
  score: 0.5,
});

const user = ref({
  name: 'ชวัลวิชญ์ คงสำพันธ์',
  profileImage: 'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.6435-9/125985976_697934107811643_3815542183752697058_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c7cdda&_nc_ohc=QHb9oMx_LAUQ7kNvgEwhEr3&_nc_ht=scontent.fbkk7-2.fna&gid=A7ZQbHAUSQqOXqLizSt8BLm&oh=00_AYCTu0A5o4Zv7plYt7TfoAjH4O6B1NzrIUtBjD2_Sr4kOw&oe=66D01F69',
});

const getStatusClass = (status: Activity['status']): string => {
  switch(status) {
    case 'booking': return 'badge-warning';
    case 'completed': return 'badge-success';
    case 'failed': return 'badge-error';
    default: return 'badge-ghost';
  }
};

const getStatusText = (status: Activity['status']): string => {
  switch(status) {
    case 'booking': return 'กำลังจอง';
    case 'completed': return 'เข้าร่วมสำเร็จ';
    case 'failed': return 'เข้าร่วมไม่สำเร็จ';
    default: return 'ไม่ทราบสถานะ';
  }
};

const IN = ref(false)

const checkInQRValue = computed(() => `http://localhost:3000/admin/edit/user/activity/[id]/checkIn/acpass=yes?no`)
const checkOutQRValue = computed(() => `http://localhost:3000/admin/edit/user/activity/[id]/checkOut/acpass=yes?no`)
</script>

<template>
  <div class="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-base-100 shadow-2xl rounded-box overflow-hidden">
        <!-- Activity Header -->
        <div class="relative h-64 bg-gradient-to-r from-primary to-secondary">
          <div class="absolute inset-0 flex items-center justify-center bg-opacity-75 bg-base-100">
            <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {{ activity.name }}
            </h1>
          </div>
        </div>

        <!-- User Info -->
        <div class="flex items-center space-x-4 p-8 bg-base-200">
          <div class="avatar">
            <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img :src="user.profileImage" alt="User profile" />
            </div>
          </div>
          <div>
            <h2 class="text-3xl font-semibold">{{ user.name }}</h2>
            <div class="mt-2">
              <span :class="['badge', 'badge-lg', getStatusClass(activity.status)]">
                {{ getStatusText(activity.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Activity Details -->
        <div class="p-8 space-y-6">
          <div class="flex items-center space-x-3 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ activity.date }} | {{ activity.time }}</span>
          </div>
          <div class="flex items-center space-x-3 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ activity.location }}</span>
          </div>
          <p class="text-base-content/70 text-lg">{{ activity.description }}</p>
        </div>

        <!-- QR Codes -->
        <div class="p-8 bg-base-200">
          <h3 class="text-2xl font-semibold mb-6 text-center">QR Codes สำหรับเช็คอิน/เช็คเอาท์</h3>
          <div class="flex justify-around">
            <div v-if="IN == false" class="text-center">
              <div class="bg-white p-4 rounded-box shadow-lg">
                <QRCodeVue3 :value="checkInQRValue" :size="200" level="H" />
              </div>
              <p class="mt-4 font-bold text-lg">เช็คอิน</p>
            </div>
            <div v-if="IN == true" class="text-center">
              <div class="bg-white p-4 rounded-box shadow-lg">
                <QRCodeVue3 :value="checkOutQRValue" :size="200" level="H" />
              </div>
              <p class="mt-4 font-bold text-lg">เช็คเอาท์</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
