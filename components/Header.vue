<template>
    <div class='flex bg-gray-800 shadow-sm'>
      <div class="flex">
      <div class="mr-3" style="margin-left: auto">
        <NuxtLink class="hover:border-b" to="/">Home</NuxtLink>
        </div>      
        <div class="" style="margin-left: auto">
          <NuxtLink class="hover:border-b" to="/pacientes">Pacientes</NuxtLink>
        </div>
      </div>
        <div class="" style="margin-left: auto">
        <button @click="onLogout">Logout</button>
        </div>
    </div> 
</template>
<script setup type="ts">
  const onLogout = async () => {
  try {
    await $fetch('/api/logout');
    window.location.reload();
  } catch {
    alert('failed to logout');
  }
  };

</script>