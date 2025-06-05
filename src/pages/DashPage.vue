<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/lib/pocketbase'
import * as XLSX from 'xlsx' // 📦 install: npm i xlsx

const submissions = ref<any[]>([])
const currentPage = ref(1)
const perPage = 10
const totalPages = ref(1)

const loading = ref(false)

async function fetchPage(page = 1) {
  loading.value = true
  try {
    const result = await pb.collection('submissions').getList(page, perPage, {
      sort: '-created'
    })
    submissions.value = result.items
    totalPages.value = result.totalPages
    currentPage.value = result.page
  } catch (err) {
    console.error('❌ Error fetching page:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPage()
})

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('fa-IR')
}

async function exportAllToExcel() {
  try {
    const all = await pb.collection('submissions').getFullList({ sort: '-created' })

    const rows = all.map((item) => ({
      "نام": item.first_name,
      "فامیل": item.last_name,
      "شماره": item.phone_number,
      "نقش انتخابی": item.chosen_card,
      "تاریخ": formatDate(item.created)
    }))

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions')

    XLSX.writeFile(workbook, 'submissions.xlsx')
  } catch (err) {
    console.error('❌ Export failed:', err)
  }
}
</script>


<template>
  <div class="min-h-screen bg-[#17174A] text-white p-6">
    <h1 class="text-2xl font-bold mb-6">📄 لیست کارت ها</h1>

    <div class="flex justify-end mb-4">
      <button
        @click="exportAllToExcel"
        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-bold"
      >
        📤 خروجی اکسل
      </button>
    </div>

    <table class="w-full border border-gray-500 rounded-lg overflow-hidden">
      <thead class="bg-indigo-700 text-center">
        <tr>
          <th class="py-2 px-4">نام</th>
          <th class="py-2 px-4">فامیل</th>
          <th class="py-2 px-4">شماره</th>
          <th class="py-2 px-4">نقش انتخابی</th>
          <th class="py-2 px-4">تاریخ</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in submissions"
          :key="item.id"
          class="odd:bg-[#1f1f5a] even:bg-[#2c2c6c] text-center hover:bg-indigo-800 transition"
        >
          <td class="py-2 px-4">{{ item.first_name }}</td>
          <td class="py-2 px-4">{{ item.last_name }}</td>
          <td class="py-2 px-4">{{ item.phone_number }}</td>
          <td class="py-2 px-4">{{ item.chosen_card }}</td>
          <td class="py-2 px-4">{{ formatDate(item.created) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="submissions.length === 0 && !loading" class="mt-8 text-center text-gray-300">
      هیچ داده‌ای یافت نشد.
    </p>

    <!-- Pagination Controls -->
    <div class="flex justify-center gap-4 mt-6">
      <button
        @click="fetchPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
      >
        قبلی
      </button>

      <span class="px-4 py-2 text-sm">صفحه {{ currentPage }} از {{ totalPages }}</span>

      <button
        @click="fetchPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  </div>
</template>
