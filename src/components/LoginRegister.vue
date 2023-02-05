<template>
  <q-form @submit="submitForm">
    <system-input
      v-if="tab == 'register'"
      v-model="formData.name"
      system-input-class="system-blue-input"
      externalLabel="Name"
      for="Name"
    />
    <system-input
      v-model="formData.email"
      system-input-class="system-blue-input"
      type="email"
      externalLabel="Email"
      for="email"
    />
    <system-input
      v-model="formData.password"
      system-input-class="system-blue-input"
      type="password"
      externalLabel="Password"
      is-password
    />
    <div class="row">
      <q-space />
      <q-btn
        color="system-secondary"
        class="full-width q-mt-lg"
        type="submit"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
import SystemInput from "components/inputs/SystemInput.vue";

export default {
  props: ["tab"],
  components: { SystemInput },
  data() {
    return {
      formData: {
        name: "",
        email: "danny@test.com",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapActions("user", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>
