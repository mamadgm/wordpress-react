<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import { ref } from "vue";

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
  <div class="min-h-full flex items-center justify-center px-6 py-12">
    <div class="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-2xl w-full text-center space-y-8">
      <h1 class="text-4xl sm:text-6xl font-extrabold text-indigo-700">سلام {{ first }} 👋</h1>
      <p class="text-xl sm:text-2xl text-gray-700 font-medium">به آزمون هزارتو خوش اومدی!</p>

      <div class="text-right text-sm sm:text-base text-gray-600 border-t pt-6 space-y-2">
        <p><span class="font-semibold text-gray-800">نام:</span> {{ first }}</p>
        <p><span class="font-semibold text-gray-800">نام خانوادگی:</span> {{ last }}</p>
        <p><span class="font-semibold text-gray-800">شماره موبایل:</span> {{ phone }}</p>
      </div>

      <router-link
       v-if="error == false"
        to="/quiz"
        class="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition text-white font-bold text-xl sm:text-2xl px-10 py-5 rounded-full shadow-lg hover:shadow-2xl animate-bounce"
      >
        شروع آزمون 🚀
      </router-link>
    </div>
  </div>
</template>
