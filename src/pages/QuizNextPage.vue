<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/stores/quiz";

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
      "2": "PR Manager",
    },
    "3": {
      "1": "Graphic Designer",
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
  <div class="max-w-3xl mx-auto py-12 px-4 text-right" v-if="question">
    <h2
      class="text-2xl sm:text-4xl font-bold text-indigo-800 mb-10 leading-relaxed"
    >
      {{ question.text }}
    </h2>

    <div class="space-y-4">
      <button
        v-for="(choice, i) in question.choices"
        :key="i"
        @click="selected = i"
        :class="[
          'block w-full text-right px-6 py-4 rounded-xl border transition',
          selected === i
            ? 'bg-indigo-600 text-white border-indigo-700'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100',
        ]"
      >
        {{ choice }}
      </button>
    </div>

    <button
      :disabled="selected === null"
      @click="submitAnswer"
      class="mt-10 w-full py-4 rounded-xl text-lg font-bold transition text-white"
      :class="[
        selected !== null
          ? 'bg-indigo-700 hover:bg-indigo-800'
          : 'bg-gray-400 cursor-not-allowed',
      ]"
    >
      ادامه
    </button>
  </div>
</template>
