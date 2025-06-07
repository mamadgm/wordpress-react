<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { pb } from "@/lib/pocketbase";
import backUrl from "@/assets/svg/back.svg?url";
import Vector from "@/assets/svg/vector.svg";
import Logo from "@/assets/svg/logo.svg";

const router = useRouter();
const quiz = useQuizStore();

interface Card {
  id: string;
  name: string;
  image: string;
}

const cards = ref<Card[]>([]);
const selectedCardId = ref<string | null>(null); // ✅ selected card

onMounted(async () => {
  try {
    const option1 = quiz.resultOptions[0];
    const option2 = quiz.resultOptions[1];

    const result = await pb.collection("roles").getFullList({
      filter: `name = "${option1}" || name = "${option2}"`,
    });

    cards.value = result.map((card: any) => ({
      id: card.id,
      name: card.name,
      image: pb.files.getURL(card, card.picture),
    }));
  } catch (err) {
    console.error("Error fetching filtered roles:", err);
  }
});

async function submitSelection() {
  if (!selectedCardId.value) return;

  const selected = cards.value.find((c) => c.id === selectedCardId.value);
  if (!selected) return;

  quiz.setResultCard(selected.name);

  const payload = {
    first_name: quiz.first_name,
    last_name: quiz.last_name,
    phone_number: quiz.phone_number,
    atq_1: quiz.answers[1],
    atq_2: quiz.answers[2],
    summary: quiz.summary,
    chosen_card: selected.name,
  };

  try {
    await pb.collection("submissions").create(payload);
    router.push("/response");
  } catch (error) {
    alert("شما قبلا شرکت کرده‌اید");
    console.error("PocketBase error:", error);
  }
}
</script>

<template>
  <div
    class="min-h-dvh w-screen flex flex-col items-center bg-[#17174A] overflow-hidden bg-no-repeat bg-cover"
    :style="{ backgroundImage: `url(${backUrl})` }"
  >
    <div class="mt-responsive">
      <h2 class="text-[16px] text-white text-right leading-5 font-pelaksemi">
        سوال 3/3
      </h2>
      <h1
        class="text-[18px] font-bold text-white text-right leading-6 max-w-72 font-pelakbold mb-8"
      >
        یکی از نقش‌های پیشنهادی را انتخاب کنید
      </h1>
    </div>

    <!-- Cards -->
    <div class="flex w-full px-4 gap-4 justify-center items-center">
      <button
        v-for="card in cards"
        :key="card.id"
        @click="selectedCardId = card.id"
        class="flex flex-col items-center justify-center rounded-2xl transition-all duration-1000 overflow-hidden"
        :class="[
          selectedCardId === card.id
            ? 'flex-2 scale-105 h-[26rem] border border-1 border-gray-400'
            : 'flex-1 scale-95 h-[12rem]',
        ]"
      >
        <img
          :src="card.image"
          alt="card"
          class="w-full h-full object-contain transition-all rounded-lg duration-1000"
        />
      </button>
    </div>

    <!-- Submit Button -->
    <button
      @click="submitSelection"
      :disabled="!selectedCardId"
      class="absolute bottom-10 z-10 px-10 py-1 bg-white text-[#17174A] rounded-lg font-pelakbold text-lg transition hover:bg-gray-200 disabled:opacity-50"
    >
      تایید
    </button>

    <Vector class="absolute bottom-0 left-0 z-0 pointer-events-none" />
    <!-- <Logo class="absolute bottom-12 z-0 pointer-events-none" /> -->
  </div>
</template>
