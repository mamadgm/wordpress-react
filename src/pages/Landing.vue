<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const name = computed(() => route.query.name as string || '');
const last = computed(() => route.query.last as string || '');
const isValid = computed(() => name.value.trim() !== '' && last.value.trim() !== '');

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
    <div class="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-center space-y-6">
      
      <template v-if="isValid">
        <h1 class="text-4xl sm:text-3xl font-bold text-gray-800">خوش آمدید 👋</h1>
        <p class="text-base sm:text-lg text-gray-700">
          نام شما: <span class="font-semibold text-indigo-600">{{ name }}</span>
        </p>
        <p class="text-base sm:text-lg text-gray-700">
          فامیل شما: <span class="font-semibold text-indigo-600">{{ last }}</span>
        </p>
      </template>

      <template v-else>
        <h1 class="text-4xl sm:text-3xl font-bold text-red-600">خطا ❌</h1>
        <p class="text-base sm:text-lg text-gray-700">
          لینک شما معتبر نیست. لطفاً نام و نام خانوادگی را به درستی وارد کنید.
        </p>
        <div class="mt-4 text-sm sm:text-base text-gray-500">
          مثال:
          <code class="bg-gray-100 px-2 py-1 rounded">?name=Ali&last=Hoseyni</code>
        </div>
      </template>

    </div>
  </div>
</template>
