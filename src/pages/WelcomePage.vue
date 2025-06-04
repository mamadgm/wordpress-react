<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import { ref } from "vue";
import Home from "@/assets/svg/home.svg";
import Snake from "@/assets/svg/snake.svg";

const router = useRouter();
const route = useRoute();
const quiz = useQuizStore();
const error = ref(false);


const first = (route.query.first_name as string) || "";
const last = (route.query.last_name as string) || "";
const phone = (route.query.phone_number as string) || "";

if (!first || !last || !phone) {
  alert("آدرس نامعتبر است. لطفاً اطلاعات صحیح وارد کنید.");
  router.replace("/");
  error.value = true;
} else {
  quiz.setUserInfo(first, last, phone);
}
</script>

<template>
  <div class="relative min-h-dvh  flex flex-col items-center justify-start bg-[#17174A] overflow-hidden">

    <!-- Top-left SVG -->
    <Snake class="absolute scale-110 top-5 left-5"></Snake>

    <!-- Bottom-left SVG -->
    <Home class="absolute bottom-0 left-0"></Home>


    <!-- Main Content -->
    <div class="mt-32 z-10 ">
      <h1 class="text-3xl font-bold text-white text-right leading-relaxed">
        واقعاً تو نقشی هستی<br>
        که بهت میاد؟
      </h1>
      <h2 class="text-xl text-[#d6b5fc] text-right leading-relaxed mt-2">
        یه تست کوتاه کمکت می‌کنه نقش<br>
        واقعیتو کشف کنی، شاید غافلگیر بشی.
      </h2>
      <router-link v-if="error == false" to="/quiz"
        class="inline-block mt-4 bg-[#d6b5fc] text-[#17174A] font-bold text-xl px-8 py-1 rounded-lg shadow-lg hover:shadow-2xl animate-pulse">
        شروع
      </router-link>
    </div>

    <!-- Decorative Component -->

  </div>
</template>
