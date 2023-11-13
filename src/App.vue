<template>
  <h1>Card Tokenization</h1>

  <main>
    <CardForm />

    <CardDetails />
  </main>
</template>

<script setup lang="ts">
import CardForm from './components/CardForm.vue';
import CardDetails from './components/CardDetails.vue';
</script>

<style scoped>
h1 {
  text-align: center;
}

main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
