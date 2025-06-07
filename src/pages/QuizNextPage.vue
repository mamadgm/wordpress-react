<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/stores/quiz";
import backUrl from "@/assets/svg/back.svg?url"; // This gives you the file path
import Vector from "@/assets/svg/vector.svg";
import Logo from "@/assets/svg/logo.svg"; // This gives you the file path

const router = useRouter();
const quiz = useQuizStore();

const answer1 = quiz.answers[1];
const nextQuestionOrder = {
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
}[answer1];

const question = quiz.questions.find((q) => q.order === nextQuestionOrder);

const selected = ref<number | null>(null);

function createQuestionsSummary() {
  const summary = quiz.questions;
  return summary;
}

function determineFinalCard(atq_1: string, atq_2: string): string {
  const map: Record<string, Record<string, string>> = {
    "1": {
      "1": "Marketing Analyst",
      "2": "Performance Marketer",
    },
    "2": {
      "1": "Content Marketer",
      "2": "PR Manager", //
    },
    "3": {
      "1": "Creative Director",
      "2": "Social Media Manager",
    },
    "4": {
      "1": "Campaign Manager",
      "2": "SEO Specialist",
    },
  };

  return map[atq_1]?.[atq_2] ?? null;
}

async function submitAnswer() {
  if (selected.value === null) return;

  quiz.setAnswer(2, (selected.value + 1).toString());

  const atq_1 = quiz.answers[1];
  const atq_2 = quiz.answers[2];
  const summary = createQuestionsSummary();

  const option1 = determineFinalCard(atq_1, "1");
  const option2 = determineFinalCard(atq_1, "2");

  quiz.resultOptions = [option1, option2];
  quiz.summary = summary;

  router.push("/choose-role"); // 🎯 Redirect only — no API call here
}
</script>

<template>
  <div
    class="min-h-dvh w-screen flex flex-col items-center bg-[#17174A] overflow-hidden bg-no-repeat bg-cover"
    :style="{ backgroundImage: `url(${backUrl})` }"
    v-if="question"
  >
    <div class="mt-responsive">
      <h2
        class="text-[16px] text-white text-right leading-6 max-w-72 font-pelakmed"
      >
        سوال 2/3
      </h2>
      <h1
        class="text-[18px] font-bold text-white text-right leading-6 max-w-72 font-pelakbold"
      >
        {{ question.text }}
      </h1>
    </div>
    <div class="space-y-2 mt-8">
      <button
        v-for="(choice, i) in question.choices"
        :key="i"
        @click="selected = i"
        :class="[
          'flex items-center w-full text-right px-4 py-2 rounded-lg transition min-w-80 space-x-3 rtl:space-x-reverse',
          'bg-[#263387] text-white',
          selected === i ? 'border shadow-[0_0_4px_1px_#d6b5fc]' : '',
        ]"
      >
        <!-- Dot -->
        <span
          :class="[
            'w-3 h-3 rounded-full inline-block',
            selected === i
              ? 'bg-white shadow-[0_0_8px_2px_#d6b5fc]'
              : 'border border-white bg-transparent',
          ]"
        ></span>

        <!-- Text -->
        <h5 class="max-w-64 leading-5 font-pelakmed">
          {{ choice }}
        </h5>
      </button>
    </div>

    <button
      :disabled="selected === null"
      @click="submitAnswer"
      class="mt-10 w-32 py-4 z-10 font-pelakbold rounded-xl text-lg font-bold transition text-white flex items-center justify-center"
      :class="[
        selected !== null
          ? 'bg-indigo-700 hover:bg-indigo-800'
          : 'bg-gray-400 cursor-not-allowed',
      ]"
    >
      ادامه
    </button>

    <Vector class="absolute bottom-0 left-0 z-0 pointer-events-none" />
    <Logo class="absolute bottom-12 z-0 pointer-events-none"></Logo>
  </div>
</template>