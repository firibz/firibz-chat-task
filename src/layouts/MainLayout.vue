<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      v-if="!$route.fullPath.includes('/chat') || $q.screen.gt.xs"
      :content-style="
        $q.screen.gt.xs ? 'width:300px' : 'width:100vw !important'
      "
      content-class="system-drawer overflow-hidden"
      show-if-above
      :breakpoint="0"
    >
      <q-toolbar>
        <!-- <q-btn round flat icon="menu" @click="toggleLeftDrawer" /> -->
        <q-btn round to="/profile">
          <q-avatar class="cursor-pointer q-ml-sm">
            <img src="~assets/axon-logo.webp" />
          </q-avatar>
        </q-btn>
        <span class="text-bold text-teal q-ml-sm ellipsis">{{
          userDetails.name
        }}</span>
        <q-space />
        <q-toggle
          v-model="appTheme"
          aria-label="switch-theme-btn"
          :color="appTheme ? 'amber' : 'indigo-11'"
          checked-icon="mdi-brightness-7"
          class="text-blue q-mr-xs"
          keep-color
          unchecked-icon="mdi-brightness-2"
          @input="toggleTheme"
        />
        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 8]">
            <q-list style="min-width: 150px">
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-account-multiple-plus"></q-icon>
                </q-item-section>
                <q-item-section>New group</q-item-section>
              </q-item>
              <q-item to="/profile" clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-account"></q-icon>
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-archive"></q-icon>
                </q-item-section>
                <q-item-section>Archived</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-heart"></q-icon>
                </q-item-section>
                <q-item-section>Favorites</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-cogs"></q-icon>
                </q-item-section>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item @click="logoutUser" clickable>
                <q-item-section avatar>
                  <q-icon name="mdi-logout" color="system-negative"></q-icon>
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <chat-list />
    </q-drawer>

    <q-page-container
      v-if="$route.fullPath.includes('/chat') || $q.screen.gt.xs"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ChatList from "components/ChatList.vue";

export default {
  name: "MainLayout",
  components: {
    ChatList,
  },
  computed: {
    ...mapState("user", ["userDetails"]),
  },
  data() {
    return {
      leftDrawerOpen: false,
      search: "",
      message: "",
      appTheme: true,
    };
  },
  created() {
    let dark = JSON.parse(localStorage.getItem("dark"));
    dark = typeof dark === "boolean" ? dark : this.$q.dark.isActive;

    if (dark !== undefined && dark !== null) {
      this.appTheme = !dark;
    } else {
      this.appTheme = true;
    }
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleTheme(value) {
      this.$q.dark.set(!value);
      localStorage.setItem("dark", JSON.stringify(!value));
    },
  },
};
</script>
