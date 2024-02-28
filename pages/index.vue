<template>
  
  <Background>
    <div>
      <h1>Home Page</h1>
      <hr />
      <NuxtLink class="hover:border-b" to="/pacientes">Go To Pacientes</NuxtLink>
      <br />
      <button @click="onLogout">Logout</button>

      <br />
    </div>
  </Background>
</template>

<script setup lang="ts">
import Background from '@/components/Background.vue';

const onLogout = async () => {
  try {
    await $fetch('/api/logout');
    window.location.reload();
  } catch {
    alert('failed to logout');
  }
  };
useHead({
  title: 'Home Page'
});




</script>
