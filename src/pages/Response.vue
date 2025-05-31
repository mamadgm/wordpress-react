
<script setup lang="ts">
import { useQuizStore } from "@/stores/quiz";

const quiz = useQuizStore();
const card = quiz.result_card;
</script>
<template>
  <div class="flex justify-center items-center min-h-[600px] px-4 bg-gray-50">
    <div
      class="bg-white px-8 py-12 sm:px-10 sm:py-14 rounded-3xl shadow-xl text-center space-y-8 max-w-xl w-full"
    >
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-800">
        🎉 نتیجه شما
      </h2>

      <p class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700">
        {{ card }}
      </p>

      <p class="text-lg sm:text-xl md:text-2xl text-gray-600">
        از شرکت شما متشکریم ❤️
      </p>
    </div>
  </div>
</template>


