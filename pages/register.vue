<template>
  
    <Background class="flex justify-center items-center">
      <div class="bg-gray-800 relative w-1/4 h-90 border rounded-lg p-2 flex flex-col justify-between">
        <fieldset>
          <div div class="flex justify-center">
            <h1 class="text-lg">Register</h1>
          </div>
          <hr  class="mb-4 "/>
  
          <div class="m-8 grid">
            <label>Username: </label>
            <TextInput type="text" placeholder="Enter username" v-model="form.name" />
          </div>

          <div class="m-8 grid">
            <label>Email: </label>
            <TextInput type="text" placeholder="Enter email" v-model="form.email"/>
          </div>

          <div class="m-8 grid">
            <label>Password: </label>
            <TextInput type="text" placeholder="Enter password" v-model="form.password" />
          </div>

  
          <div class="m-8 grid">
            <label>Re-Password: </label>
            <TextInput  type="text" placeholder="Repeat password" class="bg-white" v-model="form.repassword" />
          </div>
        </fieldset>
  
        <div class="self-end">
          <ButtonInput @click="onSubmit" class="hover:bg-blue">Register</ButtonInput>
        </div>
      </div>
    </Background>
  </template>
  
  <script setup lang="ts">
  import Background from '@/components/Background.vue';
  import TextInput from '@/components/TextInput.vue';
  import ButtonInput from '@/components/PrimaryButton.vue'

  
  useHead({
    title: 'Register User'
  });

  const form = reactive({
    name: '',
    email: '',
    password: '',
    repassword: ''
  })

const router = useRouter();

const onSubmit = async () => {
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: form
    });
    await $fetch('/api/login', {
        method: 'POST',
        body: form
      });
  
    window.location.replace('/pacientes');


  } catch {
    alert('Post blog error');
  }
};
</script>