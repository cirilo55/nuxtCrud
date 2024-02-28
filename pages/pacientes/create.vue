<script setup lang="ts">
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
// import cpf from '@/components/cpf.vue';

definePageMeta({
  middleware: ["auth"]
})

useHead({
  title: 'Adicionar Paciente'
});

const form = reactive({
  nome: '',
  cpf: '',
  cep: '',
  bairro: '',
  logradouro: '',
  UF: ''

});

const router = useRouter();

const onSubmit = async () => {
  try {
    await $fetch('/api/pacientes', {
      method: 'POST',
      body: form
    });

    router.push('/pacientes');
  } catch {
    alert('Post blog error');
  }
};

const fetchAddressByCEP = async () => {
  if (form.cep.length === 9) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${form.cep.replace('-', '')}/json/`);

      const data = await response.json();
      console.log(data);
      form.bairro = data.bairro;
      form.logradouro = data.logradouro;
      form.UF = data.uf;
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
    }
  }else{
    return false;
  }
};

// Função para formatar CPF
function formatCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '');

  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
}

// Função para formatar CEP
function formatCEP(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
}

</script>

<template>
  <div
    class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
    <div class="w-full sm:max-w-lg mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
      <div class="m-8 grid">
        <InputLabel for="nome" value="Nome" />
        <input id="name" type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required autofocus autocomplete="name" v-model="form.nome" />
      </div>

      <div class="m-8 grid">
        <InputLabel for="cpf" value="C.P.F" />
        <input id="cpf" type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required autofocus v-model="form.cpf"  @change="form.cpf = formatCPF(form.cpf)" maxlength="14" />
      </div>


      <div class="m-8 grid">
        <InputLabel for="cep" value="C.E.P" />
        <input id="password" type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          v-model="form.cep" required @change="fetchAddressByCEP"  @input="form.cep = formatCEP(form.cep)" maxlength="9"/>
      </div>

      <div class="m-8 grid">
        <InputLabel for="Bairro" value="Bairro" />
        <input id="password" type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          v-model="form.bairro" required />
      </div>


      <div class="m-8 grid">
        <InputLabel for="logradouro" value="Logradouro" />
        <input id="password" type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          v-model="form.logradouro" required />
      </div>


      <div class="m-8 grid">
        <InputLabel for="UF" value="U.F" />
        <input id="UF" type="text"
          class="w-full border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
          required autocomplete="new-password" v-model="form.UF" />
      </div>
      <div class="flex items-center justify-end mt-4">
        <PrimaryButton @click="onSubmit" class="ms-4">
          Register
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

