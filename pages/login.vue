<template>
  <Background class="flex justify-center items-center">
    <div class="bg-gray-800 relative w-1/4 h-62 border rounded-lg p-2 flex flex-col justify-between">
      <fieldset>
        <div div class="flex justify-center">
          <h1 class="text-lg">Login</h1>
        </div>
        <hr  class="mb-4 "/>

        <div class="m-8 grid">
          <label>Username: </label>
          <TextInput v-model="form.name" type="text" placeholder="Enter username" />
        </div>

        <div class="m-8 grid">
          <label>Password: </label>
          <TextInput v-model="form.password" type="text" placeholder="Enter password" class="bg-white" />
        </div>
      </fieldset>
      <div class="text-sm">
        <NuxtLink class="hover:border-b" to="/register">
        Não possui conta, registre-se!
        </NuxtLink>
      </div>
      <div class="self-end">
        <ButtonInput @click="onLogin">Login</ButtonInput>
      </div>
    </div>
  </Background>
</template>

<script setup lang="ts">
import Background from '@/components/Background.vue';
import TextInput from '@/components/TextInput.vue';
import ButtonInput from '@/components/PrimaryButton.vue';

useHead({
  title: 'Login'
});

definePageMeta({
  middleware: 'unauth'
});

const form = reactive({
  name: '',
  password: ''
});

const onLogin = async () => {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: form
    });

    window.location.replace('/');
  } catch {
    alert('failed to login');
  }
};
</script>
