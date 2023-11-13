<template>
  <form>
    <label>
      Card number

      <input type="text" pattern="[0-9]+" required placeholder="Write here" />
    </label>

    <label>
      CVV

      <input type="text" pattern="[0-9]+" required placeholder="Write here" />
    </label>

    <div class="date">
      <label>
        Expiration month

        <input type="text" pattern="[0-9]+" required placeholder="Write here" />
      </label>

      <label>
        Expiration Year

        <input type="text" pattern="[0-9]+" required placeholder="Write here" />
      </label>
    </div>

    <label>
      Email

      <input type="email" required placeholder="Write here" />
    </label>

    <button type="submit">Pay</button>
  </form>
</template>

<script setup lang="ts"></script>

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
