<script lang="ts" setup>
// import Typewriter from 'typewriter-effect'
import Typewriter from 'typewriter-effect/dist/core';

import { ref, onMounted } from 'vue'

useHead({ title: 'กิจกรรมวิทยาลัยเทคนิคชัยภูมิ' })

const phrases = [
  'เพื่อชาติ!',
  'เพื่อวิทยาลัย!',
  'เพื่อตัวเอง!',
  'เพื่อเธอ!'
]

const typewriterElement = ref<HTMLElement | null>(null)

onMounted(() => {
  console.log(typewriterElement.value); // Check if this logs the correct element

  if (typewriterElement.value) {
    const typewriter = new (Typewriter as any)(typewriterElement.value, {
  loop: true,
  delay: 80,
  deleteSpeed: 50,
})

    phrases.forEach((phrase) => {
      typewriter
        .typeString(phrase)
        .pauseFor(2000)
        .deleteAll();
    });

    typewriter.start();
  } else {
    console.error('typewriterElement is null');
  }
});

</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img
        src="~/assets/images/logo.png"
        class="max-w-52 mx-20 animate-bounce"
      />
      <div>
        <h1 class="text-5xl font-bold ">
          <span ref="typewriterElement">เข้าร่วมกิจกรรม</span><span ref="typewriterElement"></span>
        </h1>
        <p class="py-6">
          ร่วมมือร่วมใจ ก้าวไปสู่ความสำเร็จด้วยกัน เรียนรู้พร้อมสนุกสนาน
          สานฝันร่วมกันในทุกกิจกรรม สามัคคีคือพลัง สร้างสรรค์กิจกรรมที่ยอดเยี่ยม
          พัฒนาความคิดและทักษะ เพื่อพิชิตทุกความฝัน
          สร้างสรรค์และแบ่งปันประสบการณ์ใหม่ในทุกกิจกรรม ก้าวไกลไปด้วยกัน
          ด้วยใจที่เป็นหนึ่งเดียว เพื่อนพ้องคือพลัง สร้างสรรค์สังคมที่ดี
          เรียนรู้ร่วมกัน สร้างฝันให้เป็นจริงไปด้วยกัน
          พลังเยาวชนสร้างอนาคตที่สดใส จินตนาการไม่มีที่สิ้นสุด
          เรียนรู้ไม่มีขอบเขต
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-char-typed {
  color: #009688;
}
.custom-char-selected {
  color: #E91E63;
}
</style>
