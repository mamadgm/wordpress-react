<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import { ref } from "vue";
import Home from "@/assets/png/castle.png";
import Snake from "@/assets/svg/snake.svg";
import { computed } from "vue";

const displayFirst = computed(() => {
  if (first && last) return first;
  if (first) return first;
  if (!first && last) return last;
  return "کاربر";
});

const displayLast = computed(() => {
  if (first && last) return last;
  if (first && !last) return "عزیز";
  if (!first && last) return "عزیز";
  return "ناشناس";
});

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
      <h2 class="text-[18px] text-right leading-6 mt-2 max-w-80">
        <span class="text-[#f9d923] font-pelakbold">
          {{ displayFirst + " " + displayLast + " " }}
        </span>
        <span class="text-[#d6b5fc] font-pelakmed">
          بلیط شما با موفقیت ثبت شد.
        </span>
      </h2>

      <h1
        class="text-[22px] max-w-80 font-bold text-white text-right leading-10 font-pelakbold"
      >
       آماده‌ای تو ۳۰ ثانیه بفهمی چقدر به دنیای بازاریابی نزدیکی؟
      </h1>
      <h2
        class="text-[18px] text-[#d6b5fc] text-right font-pelaksemi leading-6 mt-2"
      >
        فقط دو سوال تا گرفتن جواب فاصله داری!
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
