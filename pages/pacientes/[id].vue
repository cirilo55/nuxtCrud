<template>
<div
    class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
  >
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
      <div>
        <InputLabel for="nome" value="Nome" />
        <input
          id="name"
          type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          autofocus
          autocomplete="name"
          v-model="form.nome"


        />
      </div>

      <div class="mt-4">
        <InputLabel for="cpf" value="C.P.F" />
        <input
          id="cpf"
          type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          autofocus
          v-model="form.cpf"

        />
      </div>

      <div class="mt-4">
        <InputLabel for="cep" value="C.E.P" />
        <input
          id="password"
          type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          v-model="form.cep"
          required
        />
      </div>

      <div class="mt-4">
        <InputLabel for="cep" value="C.E.P" />
        <input
          id="password"
          type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          v-model="form.cep"
          required
        />
      </div>

      <div class="mt-4">
        <InputLabel for="logradouro" value="Logradouro" />
        <input
          id="password"
          type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          v-model="form.logradouro"
          required
        />
      </div>


      <div class="mt-4">
        <InputLabel for="UF" value="U.F" />
        <input
          id="UF"
          type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required
          v-model="form.UF"

        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton   @click="onSubmit" class="ms-4">
          Register
        </PrimaryButton>
      </div>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { PacientesModel } from '~~/server/model/pacientes';
  import InputLabel from '@/Components/InputLabel.vue';
  import PrimaryButton from '@/Components/PrimaryButton.vue';
  import TextInput from '@/Components/TextInput.vue';
  
  useHead({
    title: 'Editar Paciente'
  });
  
definePageMeta({
  middleware: ["auth"]
})


  const form = reactive({
    nome: '',
    cpf: '',
    cep: '',
    logradouro: '',
    UF: ''
  });
  
  const route = useRoute();
  const router = useRouter();
  
  const onSubmit = async () => {
    try {
      await $fetch('/api/pacientes/' + route.params.id, {
        method: 'PUT',
        body: form
      });
      router.push('/pacientes');
    } catch {
      alert('Erro ao atualizar paciente');
    }
  };
  
  const fetchData = async () => {
    try {
      const result:any = await $fetch('/api/pacientes/' + route.params.id);
      const data = result.data;
      console.log(data);
      form.nome = data.nome;
      form.cpf = data.cpf;
      form.cep = data.cep;
      form.logradouro = data.logradouro;
      form.UF = data.UF;
    } catch {
      alert('Erro ao obter detalhes do paciente');
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  