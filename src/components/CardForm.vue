<template>
  <form ref="formRef" @submit.prevent="handleSubmit">
    <label>
      Card number

      <input
        v-model="formData.cardNumber"
        type="text"
        inputmode="numeric"
        pattern="[0-9]{13,16}"
        required
        placeholder="Write here"
        title="Card number must be a number between 13 and 16 characters"
      />
    </label>

    <label>
      CVV

      <input
        v-model="formData.cvv"
        type="text"
        inputmode="numeric"
        pattern="[0-9]{3,4}"
        required
        placeholder="Write here"
        title="CVV must be a number with 3 or 4 characters"
      />
    </label>

    <div class="date">
      <label>
        Expiration month

        <input
          v-model="formData.expirationMonth"
          type="text"
          inputmode="numeric"
          pattern="[0-9]{1,2}"
          required
          placeholder="Write here"
          title="Expiration month must be a number with 1 or 2 characters"
        />
      </label>

      <label>
        Expiration year

        <input
          v-model="formData.expirationYear"
          type="text"
          inputmode="numeric"
          pattern="[0-9]{4}"
          required
          placeholder="Write here"
          title="Expiration year must be a number with 4 characters"
        />
      </label>
    </div>

    <label>
      Email

      <input v-model="formData.email" type="email" required placeholder="Write here" />
    </label>

    <button type="submit" :disabled="loading">Pay</button>
  </form>

  <p v-if="token"><strong>Token: </strong> {{ token }}</p>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';

import { CardData } from '../types/card';
import { tokenService } from '../services/TokenService';

const formRef = ref<HTMLFormElement>();

const formData = reactive<CardData>({
  cardNumber: '',
  cvv: '',
  expirationMonth: '',
  expirationYear: '',
  email: '',
});

const loading = ref(false);
const token = ref('');

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await tokenService.tokenize(formData);

    token.value = response.token;

    formRef.value?.reset();
    toast.success('The token was generated');
  } catch (error) {
    toast.error(error.message);

    token.value = '';
  }

  loading.value = false;
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: min(80%, 700px);
  margin: 0 auto;
}

input {
  width: 100%;
}

.date {
  display: flex;
  gap: 10px;
}

.date > label {
  width: 100%;
}

button {
  margin-right: 0;
}
</style>
