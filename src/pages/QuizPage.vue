<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quiz';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://netvana.ir/prj/hezartoo');
const router = useRouter();
const quiz = useQuizStore();

const loading = ref(true);
const question = ref<any>(null);
const selected = ref<number | null>(null);

onMounted(async () => {
  const all = await pb.collection('questions').getFullList({ sort: 'order' });
  quiz.setQuestions(all);
  question.value = all[0];
  loading.value = false;
});

function submitAnswer() {
  if (selected.value === null) return;
  quiz.setAnswer(1, (selected.value + 1).toString());
  router.push('/quiz/next');
}
</script>


<template>
  <div class="max-w-3xl mx-auto py-12 px-4 text-right" v-if="!loading">
    <h2 class="text-2xl sm:text-4xl font-bold text-indigo-800 mb-10 leading-relaxed">
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

