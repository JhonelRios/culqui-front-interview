<template>
  <h2>Get card details:</h2>
  <section>
    <form @submit.prevent="handleSubmit">
      <input v-model="token" type="text" required placeholder="Enter a token" />

      <button type="submit" :disabled="loading">Get card details</button>
    </form>

    <ul v-if="card">
      <li><strong>Card number: </strong> {{ card.card_number }}</li>
      <li><strong>Expiration month: </strong> {{ card.expiration_month }}</li>
      <li><strong>Expiration year: </strong> {{ card.expiration_year }}</li>
      <li><strong>Email: </strong> {{ card.email }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

import type { CardDataRequestBody } from '../types/card';
import { tokenService } from '../services/TokenService';

const token = ref('');
const card = ref<CardDataRequestBody>();
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await tokenService.getCardByToken(token.value);

    card.value = response.card;
  } catch (error) {
    toast.error(error.message);

    card.value = undefined;
  }

  loading.value = false;
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

form {
  display: flex;
  gap: 10px;
  align-items: center;
}

ul {
  list-style: none;
}
</style>
