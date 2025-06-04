<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quiz';
import { pb } from '@/lib/pocketbase';



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
    await pb.collection('submissions').create(payload);
    router.push("/response");
  } catch (error) {
    alert("ارسال اطلاعات با خطا مواجه شد.");
    console.error("PocketBase error:", error);
  }
}
</script>


<template>
  <div class="max-w-xl mx-auto py-12 px-4 text-center">
    <h2 class="text-2xl sm:text-4xl font-bold text-indigo-800 mb-10">یکی از نقش‌های پیشنهادی را انتخاب کنید</h2>

    <div class="space-y-6">
      <button
        v-for="role in quiz.resultOptions"
        :key="role"
        @click="selectRole(role)"
        class="w-full py-4 px-6 rounded-xl bg-indigo-700 text-white text-lg font-bold hover:bg-indigo-800 transition"
      >
        {{ role }}
      </button>
    </div>
  </div>
</template>
