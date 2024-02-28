<!-- TextInput.vue -->
<template>
    <label class="block font-medium text-sm text-gray-700 dark:text-gray-300">
      <span v-if="label">{{ label }}</span>
      <span v-else><slot /></span>
      <input
        v-model="maskedValue"
        :type="type"
        :class="inputClasses"
        :placeholder="placeholder"
        @input="applyMask"
      />
    </label>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const label = 'value' in $props ? $props.value : '';
  const placeholder = 'placeholder' in $props ? $props.placeholder : '';
  
  const value = ref('');
  const maskedValue = ref('');
  
  const applyMask = () => {
    // Remove all non-digit characters
    const unmaskedValue = maskedValue.value.replace(/\D/g, '');
  
    // CPF Mask: XXX.XXX.XXX-XX
    maskedValue.value = unmaskedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  watch(
    () => $props.value,
    (newValue) => {
      value.value = newValue;
      maskedValue.value = newValue;
    }
  );
  </script>
  