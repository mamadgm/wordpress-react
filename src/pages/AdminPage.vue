<script setup lang="ts">
import { pb } from '@/lib/pocketbase'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()

async function handleLogin() {
  error.value = false
  try {
    await pb.collection('users').authWithPassword(email.value, password.value)
    console.log('✅ Logged in as:', pb.authStore.model)
    router.push('/dash') // 🔁 Redirect to admin route
  } catch (err) {
    console.error('❌ Login failed:', err)
    error.value = true
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#17174A] px-4">
    <h1 class="text-white text-2xl font-bold mb-6">ورود ادمین</h1>

    <input
      v-model="email"
      type="email"
      placeholder="ایمیل"
      class="w-full max-w-sm mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
    />

    <input
      v-model="password"
      type="password"
      placeholder="رمز عبور"
      class="w-full max-w-sm mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
    />

    <button
      @click="handleLogin"
      class="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
    >
      ورود
    </button>

    <p v-if="error" class="text-red-500 mt-4">ورود ناموفق بود. لطفاً دوباره تلاش کنید.</p>
  </div>
</template>


