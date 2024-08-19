<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// const axios = useAxios()

interface Activity {
  id: number; name: string; date: string; location: string
  status: 'open' | 'closed'; participantsCount: number
  score: number; description: string
}

interface User {
  id: number; name: string; email: string
  role: 'user' | 'admin'; lastLogin: string
  completedActivities: number
}

const router = useRouter()
const activitySearchQuery = ref('')
const userSearchQuery = ref('')
const showActivities = ref(true)
const showUsers = ref(false)
const activitiesPerPage = 15
const usersPerPage = 15
const currentActivityPage = ref(1)
const currentUserPage = ref(1)

const activities = ref<Activity[]>([
  { id: 1, name: 'ไหว้เจ้า', date: '15 สิงหาคม 2024', location: 'วัดพระธาตุดอยสุเทพ', status: 'closed', participantsCount: 500, score: 0.5, description: 'กิจกรรมไหว้เจ้าประจำปี' },
  { id: 2, name: 'คอนเสิร์ตดนตรีคลาสสิค', date: '22 สิงหาคม 2024', location: 'หอประชุมวิทยาลัยเทคนิคชัยภูมิ', status: 'closed', participantsCount: 2000, score: 1, description: 'คอนเสิร์ตดนตรีคลาสสิคประจำปี' },
  { id: 3, name: 'วันพ่อ', date: '5 ธันวาคม 2024', location: 'หอประชุมวิทยาลัยเทคนิคชัยภูมิ', status: 'open', participantsCount: 1000, score: 1, description: 'กิจกรรมวันพ่อแห่งชาติ' },
])

const users = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', lastLogin: '2024-08-13 14:30', completedActivities: 2 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', lastLogin: '2024-08-14 09:15', completedActivities: 3 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', lastLogin: '2024-08-12 18:45', completedActivities: 1 },
])

const totalUsers = computed(() => users.value.length)
const totalActivities = computed(() => activities.value.length)
const openActivities = computed(() => activities.value.filter(a => a.status === 'open').length)

const getStatusClass = (status: 'open' | 'closed') => status === 'open' ? 'badge-success' : 'badge-error'
const getStatusText = (status: 'open' | 'closed') => status === 'open' ? 'เปิด' : 'ปิด'

const filteredActivities = computed(() => {
  return activities.value.filter(activity =>
    activity.name.toLowerCase().includes(activitySearchQuery.value.toLowerCase()) ||
    activity.id.toString().includes(activitySearchQuery.value)
  )
})

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(userSearchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchQuery.value.toLowerCase()) ||
    user.id.toString().includes(userSearchQuery.value)
  )
})

const paginatedActivities = computed(() => {
  const start = (currentActivityPage.value - 1) * activitiesPerPage
  const end = start + activitiesPerPage
  return filteredActivities.value.slice(start, end)
})

const paginatedUsers = computed(() => {
  const start = (currentUserPage.value - 1) * usersPerPage
  const end = start + usersPerPage
  return filteredUsers.value.slice(start, end)
})

const totalActivityPages = computed(() => Math.ceil(filteredActivities.value.length / activitiesPerPage))
const totalUserPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage))

const changePage = (section: 'activities' | 'users', page: number) => {
  if (section === 'activities') {
    currentActivityPage.value = page
  } else {
    currentUserPage.value = page
  }
}

const editUser = (user: User) => {
  alert(`แก้ไขข้อมูลผู้ใช้: ${user.name}`)
}

const addActivity = () => {
  router.push('/admin/activity/create')
}

const exportActivityToPDF = (activity: Activity) => {
  alert(`ส่งออก PDF สำหรับกิจกรรม: ${activity.name}`)
}

// async function fetchActivities() {
//     const res = await axios.get<{ activities: Activity[] }>(
//       '/api/activity',
//       {
//         params: {
//           page: page.value,
//         },
//       }
//     );
//     activities.value = res.data.activities;

// }

</script>

<template>
  <div class="min-h-screen p-8">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-center text-primary">แดชบอร์ดผู้ดูแลระบบ</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="(stat, index) in [
          { title: 'จำนวนผู้ใช้ทั้งหมด', value: totalUsers, bgColor: 'bg-primary' },
          { title: 'จำนวนกิจกรรมทั้งหมด', value: totalActivities, bgColor: 'bg-secondary' },
          { title: 'กิจกรรมที่เปิดอยู่', value: openActivities, bgColor: 'bg-accent' }
        ]" :key="index" :class="['stat text-white rounded-box shadow-xl', stat.bgColor]">
          <div class="stat-title text-white">{{ stat.title }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>

      <div class="bg-base-100 rounded-box shadow-xl p-6 mb-8">
        <div class="flex justify-between items-center mb-4 cursor-pointer" @click="showActivities = !showActivities">
          <h2 class="text-2xl font-semibold">จัดการกิจกรรม</h2>
          <span class="text-2xl">{{ showActivities ? '▼' : '▶' }}</span>
        </div>
        <div v-if="showActivities">
          <div class="flex justify-between items-center mb-4">
            <input v-model="activitySearchQuery" type="text" placeholder="ค้นหากิจกรรม" class="input input-bordered w-full max-w-xs" />
            <button @click="addActivity" class="btn btn-primary">เพิ่มกิจกรรม</button>
          </div>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ชื่อกิจกรรม</th>
                  <th>วันที่</th>
                  <th>สถานที่</th>
                  <th>สถานะ</th>
                  <th>จำนวนผู้เข้าร่วม</th>
                  <th>คะแนน</th>
                  <th>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="activity in paginatedActivities" :key="activity.id">
                  <td>{{ activity.id }}</td>
                  <td>{{ activity.name }}</td>
                  <td>{{ activity.date }}</td>
                  <td>{{ activity.location }}</td>
                  <td>
                    <span :class="['badge', getStatusClass(activity.status)]">
                      {{ getStatusText(activity.status) }}
                    </span>
                  </td>
                  <td>{{ activity.participantsCount }}</td>
                  <td>{{ activity.score }}</td>
                  <td>
                    <div class="flex space-x-2">
                      <nuxt-link :to="`/forSmallAdmin/editActivity/${activity.id}`" class="btn btn-sm btn-primary">ดูรายละเอียด</nuxt-link>
                      <button @click="exportActivityToPDF(activity)" class="btn btn-sm btn-secondary">ส่งออก PDF</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-center mt-4">
            <div class="btn-group">
              <span class="text-xl btn btn-ghost text-blue-600 cursor-pointer" >ย้อนกลับ</span>
              <button v-for="page in totalActivityPages" :key="page"
                      @click="changePage('activities', page)"
                      :class="['btn', currentActivityPage === page ? 'btn-ghost' : ''] ">
                {{ page }}
              </button>
                <span class="text-xl btn btn-ghost text-blue-600 cursor-pointer" >ถัดไป</span>
              <!-- <div class="space-x-5 text-right container mt-2 mr-1">
                <span v-if="page > 1" class="text-xl btn btn-ghost text-blue-600 cursor-pointer" @click="page--">ย้อนกลับ</span>
                <span class="text-xl btn btn-ghost text-blue-600 cursor-pointer" @click="page++">ถัดไป</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="bg-base-100 rounded-box shadow-xl p-6">
        <div class="flex justify-between items-center mb-4 cursor-pointer" @click="showUsers = !showUsers">
          <h2 class="text-2xl font-semibold">จัดการผู้ใช้</h2>
          <span class="text-2xl">{{ showUsers ? '▼' : '▶' }}</span>
        </div>
        <div v-if="showUsers">
          <div class="mb-4">
            <input v-model="userSearchQuery" type="text" placeholder="ค้นหาผู้ใช้" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ชื่อ</th>
                  <th>อีเมล</th>
                  <th>บทบาท</th>
                  <th>เข้าสู่ระบบล่าสุด</th>
                  <th>กิจกรรมที่เสร็จสิ้น</th>
                  <th>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span :class="user.role === 'admin' ? 'badge badge-primary' : 'badge'">
                      {{ user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้' }}
                    </span>
                  </td>
                  <td>{{ user.lastLogin }}</td>
                  <td>{{ user.completedActivities }}</td>
                  <td>
                    <button @click="editUser(user)" class="btn btn-sm btn-warning">แก้ไข</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-center mt-4">
            <div class="btn-group">
              <span class="text-xl btn btn-ghost text-blue-600 cursor-pointer" >ย้อนกลับ</span>
              <button v-for="page in totalUserPages" :key="page"
                      @click="changePage('users', page)"
                      :class="['btn', currentUserPage === page ? 'btn-ghost' : '']">
                {{ page }}
              </button>
               <span class="text-xl btn btn-ghost text-blue-600 cursor-pointer" >ถัดไป</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
