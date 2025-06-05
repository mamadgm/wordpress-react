<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import { ref } from "vue";
import Home from "@/assets/png/castle.png";
import Snake from "@/assets/svg/snake.svg";

const router = useRouter();
const route = useRoute();
const quiz = useQuizStore();
const error = ref(false);

const first = (route.query.first_name as string) || "";
const last = (route.query.last_name as string) || "";
const phone = (route.query.phone_number as string) || "";

if (!phone) {
  alert("لطفاً اطلاعات صحیح وارد کنید");
  router.replace("/");
  error.value = true;
} else {
  quiz.setUserInfo(first, last, phone);
}
</script>

<template>
  <div
    class="relative min-h-dvh flex flex-col items-center justify-start bg-[#17174A] overflow-hidden"
  >
    <!-- Snake SVG at top-left -->
    <Snake class="absolute scale-110 top-5 left-5" />

    <!-- Home SVG with pulsing-blue dot overlay -->

    <img
      :src="Home"
      alt="castle"
      class="absolute bottom-0 left-0 w-auto h-auto max-h-[50vh] object-contain"
    />

    <!-- Pulsing Neon‐Blue Dot -->

    <!-- Main Content -->
    <div class="mt-20 z-10">
      <h1
        class="text-3xl font-bold text-white text-right leading-10 font-pelakbold"
      >
        واقعاً تو نقشی هستی<br />
        که بهت میاد؟
      </h1>
      <h2
        class="text-[18px] text-[#d6b5fc] text-right font-pelaksemi leading-6 mt-2"
      >
        یه تست کوتاه کمکت می‌کنه نقش<br />
        واقعیتو کشف کنی، شاید غافلگیر بشی.
      </h2>
      <router-link
        v-if="error == false"
        to="/quiz"
        class="inline-block mt-4 font-pelakbold bg-[#d6b5fc] text-[#17174A] font-bold text-xl px-8 py-1 rounded-lg shadow-lg hover:shadow-2xl animate-pulse"
      >
        شروع
      </router-link>
    </div>
  </div>
</template>
