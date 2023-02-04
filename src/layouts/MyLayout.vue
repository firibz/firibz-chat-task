<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="system-header" elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          class="absolute-left"
          v-go-back.single
          icon="arrow_back"
          flat
          dense
          label="Back"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          Logout<br />
          {{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details.js";

export default {
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("user", ["userDetails"]),
    title() {
      let pageTitle = "Chat";
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") {
        pageTitle = "Firibz chat app";
      } else if (currentPath.includes("/chat")) {
        pageTitle = this.otherUserDetails.name;
      } else if (currentPath == "/auth") {
        pageTitle = "Login";
      }
      return pageTitle;
    },
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
  },
};
</script>

<style lang="stylus">
.platform-ios
  .q-header
    .q-btn, .q-toolbar__title
      padding-top constant(safe-area-inset-top)
      padding-top env(safe-area-inset-top)

.q-toolbar
  .q-btn
    line-height: 1.2
</style>
