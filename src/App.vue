<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>


<template>
  <div class="flex flex-col min-h-dvh text-gray-800 font-sans bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    <Header class="fixed top-0 left-0 w-full z-50" />
    
    <main
      class="flex-1 overflow-y-auto bg-gray-50 pt-[80px] pb-[30px]"
    >
      <!-- pt = header height, pb = footer height -->
      <router-view />
    </main>

    <Footer class="fixed bottom-0 left-0 w-full z-50" />
  </div>
</template>

