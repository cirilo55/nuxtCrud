<template>
  <Background>
    <Header />

    <div class="py-12 bg-dots-darker w-full max-w-3xl mx-auto py-8 ">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-6">
        <div class="flex bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900 dark:text-gray-100">Pacientes:</div>
          <div class="flex justify-center" style="margin-left: auto;">

            <NuxtLink to="/pacientes/create" class="hover:">
              <addLogo />
            </NuxtLink>

          </div>
        </div>
      </div>


      <table class="rounded-lg w-full text-gray-400 bg-gray-700 text-white border-gray-700" >
        <thead class="border-b border-gray-700 bg-gray-700">
          <tr>
            <th class="w-1/4 px-4 py-2">Nome</th>
            <th class="w-1/4 px-2 py-2">CPF</th>
            <th class="w-1/4 px-2 py-2">CEP</th>
            <th class="w-1/4 px-2 py-2">Logradouro-UF</th>

            <th class="w-1/4 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paciente in data" :key="paciente.id" class="border border-gray-800 hover:bg-blue-500 cursor-pointer">
            <td class="px-4 py-2">{{ paciente.nome }}</td>
            <td class="px-2 py-2">{{ paciente.cpf }}</td>
            <td class="px-2 py-2">{{ paciente.cep }}</td>
            <td class="py-2">{{ paciente.logradouro+' - '+ paciente.UF }}</td>

            <td class="px-4 py-2 flex space-x-4">
              <NuxtLink :to="'/pacientes/' + paciente.id">
                <editLogo />
              </NuxtLink>
              <button @click="() => onDelete(paciente.id)"
                class="">
                <deleteLogo />
              
              </button>
            
            </td>
          </tr>
        </tbody>
      </table>


    </div>
  </Background>
</template>
  
<script setup lang="ts">

import type { PacientesModel } from '~~/server/model/pacientes';
import Header from '@/Components/Header.vue';
import Background from '@/components/Background.vue';
import addLogo from '@/components/icons/addLogo.vue'
import editLogo from '@/components/icons/editLogo.vue';
import deleteLogo from '@/components/icons/deleteLogo.vue';



useHead({
  title: 'Lista Pacientes'
});

definePageMeta({
  middleware: 'auth'
});

const data = ref<PacientesModel[]>([]);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/pacientes');
    data.value = result.data as PacientesModel[];
  } catch {
    alert('Fetch error');
  }
};

const onDelete = async (id: number) => {
  try {
    await $fetch('/api/pacientes/' + id, {
      method: 'DELETE'
    });

    await fetchData();
  } catch {
    alert('Delete error');
  }
};

onMounted(fetchData);
</script>
<style>
.bg-dots-darker {
  background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
}
</style>
  