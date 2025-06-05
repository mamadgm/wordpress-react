<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import { pb } from "@/lib/pocketbase";
import backUrl from "@/assets/svg/back.svg?url"; // This gives you the file path
import Vector from "@/assets/svg/vector.svg";
import Logo from "@/assets/svg/logo.svg"; // This gives you the file path

const router = useRouter();
const quiz = useQuizStore();

async function selectRole(role: string) {
  quiz.setResultCard(role); // Save the selected one

  const payload = {
    first_name: quiz.first_name,
    last_name: quiz.last_name,
    phone_number: quiz.phone_number,
    atq_1: quiz.answers[1],
    atq_2: quiz.answers[2],
    summary: quiz.summary,
    chosen_card: role,
  };

  try {
    await pb.collection("submissions").create(payload);
    router.push("/response");
  } catch (error) {
    alert("ارسال اطلاعات با خطا مواجه شد.");
    console.error("PocketBase error:", error);
  }
}
</script>

<template>
  <div
    class="min-h-dvh w-screen flex flex-col items-center bg-[#17174A] overflow-hidden bg-no-repeat bg-cover"
    :style="{ backgroundImage: `url(${backUrl})` }"
  >
    <div class="mt-48">
      <h2 class="text-[16px] text-white text-right leading-5 font-pelaksemi">
        سوال 3/3
      </h2>
      <h1
        class="text-[18px] font-bold text-white text-right leading-6 max-w-72 font-pelakbold mb-8"
      >
        یکی از نقشهای پیشنهادی را انتخاب کنید
      </h1>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="role in quiz.resultOptions"
        :key="role"
        @click="selectRole(role)"
        class="max-w-36 py-24 font-pelakbold leading-5 px-6 rounded-xl bg-[#263387] text-white text-lg transition"
      >
        {{ role }}
      </button>
    </div>
    <Vector class="absolute bottom-0 left-0 z-0 pointer-events-none" />
    <Logo class="absolute bottom-12 z-0 pointer-events-none"></Logo>
  </div>
</template>
