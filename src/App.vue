<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("user", ["handleAuthStateChanged"]),
  },
  created() {
    let dark = JSON.parse(localStorage.getItem("dark"));
    dark = typeof dark === "boolean" ? dark : this.$q.dark.isActive;

    if (dark !== undefined && dark !== null) {
      // appTheme.value = !dark;
      this.$q.dark.set(dark);
    } else {
      // appTheme.value = true;
      this.$q.dark.set(false);
    }
  },
  mounted() {
    this.handleAuthStateChanged();
  },
};
</script>
