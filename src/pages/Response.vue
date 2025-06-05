<script setup lang="ts">
import { useQuizStore } from "@/stores/quiz";
import Logo from "@/assets/svg/logo.svg"; // This gives you the file path
import Vector from "@/assets/svg/vector.svg";

const quiz = useQuizStore();
const card = quiz.final_card;
</script>
<template>
  <div
    class="min-h-dvh w-screen flex flex-col justify-center items-center bg-[#17174A] overflow-hidden bg-no-repeat bg-cover"
    :style="{}"
  >
    <div
      class="bg-slate-900 px-8 py-12 sm:px-10 sm:py-14 rounded-3xl shadow-xl border-2 text-center space-y-8 max-w-xl w-64"
    >
      <h2 class="text-2xl text-white sm:text-3xl md:text-4xl font-bold font-pelakbold">
        🎉 نتیجه شما
      </h2>

      <p class="text-3xl sm:text-4xl md:text-5xl font-pelakbold text-white">
        {{ card }}
      </p>

      <p class="text-lg sm:text-xl md:text-2xl text-white font-pelakmed">
        از شرکت شما متشکریم ❤️
      </p>
    </div>
    <Vector class="absolute bottom-0 left-0 z-0 pointer-events-none" />
    <Vector class="absolute top-0 right-0 z-0 pointer-events-none" />
    <Logo class="absolute bottom-12 z-0 pointer-events-none"></Logo>
  </div>
</template>
