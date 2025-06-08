<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useQuizStore } from "@/stores/quiz";
import { pb } from "@/lib/pocketbase";
import Logo from "@/assets/svg/logo.svg";
import Vector from "@/assets/svg/vector.svg";

const quiz = useQuizStore();
const cardName = quiz.final_card;

const card = ref<{ name: string; image: string } | null>(null);

onMounted(async () => {
  try {
    const result = await pb.collection("cards").getFirstListItem(`name = "${cardName}"`);
    card.value = {
      name: result.name,
      image: pb.files.getURL(result, result.picture),
    };
  } catch (err) {
    console.error("Error loading final card data:", err);
  }
});

async function downloadImage() {
  if (!card.value?.image) return;

  try {
    const response = await fetch(card.value.image);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${card.value.name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  } catch (error) {
    console.error("Download failed:", error);
  }
}

</script>

<template>
  <div
    class="min-h-dvh w-screen flex flex-col justify-center items-center bg-[#17174A] overflow-hidden bg-no-repeat bg-cover"
  >
    <div
      class="bg-slate-900 px-6 py-8 sm:px-10 sm:py-12 rounded-3xl shadow-xl border-2 text-center space-y-6 max-w-xl w-[90%] z-10"
    >
      <div v-if="card" class="flex flex-col items-center space-y-4 z-10">
        <img
          :src="card.image"
          :alt="card.name"
          class="rounded-xl w-full max-h-80 max-w-xs sm:max-w-sm object-contain"
        />
        <p class="text-2xl sm:text-3xl font-pelakbold text-white">
          {{ card.name }}
        </p>

        <button
          @click="downloadImage"
          class="bg-white text-[#17174A] z-10 font-pelakbold py-2 px-4 rounded-lg shadow transition hover:bg-gray-200"
        >
          📥 دریافت کارت
        </button>

      </div>
      <p class="text-xl sm:text-2xl font-pelakbold text-white">
      به هزارتوی هفتم رسیدی، برای جستجو آماده‌ای؟
      </p>

    </div>

    <Vector class="absolute bottom-0 left-0 z-0 pointer-events-none" />
  </div>
</template>

