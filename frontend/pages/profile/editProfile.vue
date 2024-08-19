<script setup lang="ts">
import { ref, onMounted } from 'vue';

const username = ref('');
const email = ref('');
const bio = ref('');
const profileImage = ref('');

const fileInput = ref<HTMLInputElement | null>(null);

const updateProfile = () => {
  // ส่งข้อมูลไปยัง API เพื่อบันทึก
  console.log('บันทึกโปรไฟล์:', { username: username.value, email: email.value, bio: bio.value });
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  // สมมติว่าเราโหลดข้อมูลผู้ใช้จาก API
  username.value = 'ชวัลวิชญ์';
  email.value = '66309010020';
  bio.value = 'ฉันชอบการผจญภัยและการเรียนรู้สิ่งใหม่ๆ';
  profileImage.value = 'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.6435-9/125985976_697934107811643_3815542183752697058_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=c7cdda&_nc_ohc=QHb9oMx_LAUQ7kNvgEwhEr3&_nc_ht=scontent.fbkk7-2.fna&gid=A7ZQbHAUSQqOXqLizSt8BLm&oh=00_AYCTu0A5o4Zv7plYt7TfoAjH4O6B1NzrIUtBjD2_Sr4kOw&oe=66D01F69';
});
</script>

<template >
  <div class="profile-edit">
    <h1>แก้ไขโปรไฟล์</h1>
    <div class="profile-image">
      <img :src="profileImage" alt="รูปโปรไฟล์" />
      <input
        type="file"
        accept="image/*"
        @change="handleImageUpload"
        ref="fileInput"
        style="display: none;"
      />
      <button @click="fileInput?.click()" class="btn">เปลี่ยนรูปโปรไฟล์</button>
    </div>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="username">ชื่อผู้ใช้:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div class="form-group">
        <label for="email">รหัสประจำตัวนักศึกษา:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="bio">เกี่ยวกับฉัน:</label>
        <textarea id="bio" v-model="bio" rows="4"></textarea>
      </div>
      <button type="submit" class="submit-btn">บันทึกการเปลี่ยนแปลง</button>
    </form>
  </div>
</template>

<style scoped>
.profile-edit {
  max-width: 100%;
  height: 100vh;
  margin: 80px;
  padding: 40px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.profile-image {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.change-image-btn {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.change-image-btn:hover {
  background-color: #e0e0e0;
}

form {
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
