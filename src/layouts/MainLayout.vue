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
        <q-avatar class="cursor-pointer q-ml-sm">
          <img src="~assets/axon-logo.webp" />
        </q-avatar>
        <span class="text-bold text-teal q-ml-sm">{{ userDetails.name }}</span>
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
                <q-item-section>New group</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Archived</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Favorites</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item @click="logoutUser" clickable>
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
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details.js";
import ChatList from "components/ChatList.vue";

const conversations = [
  {
    id: 1,
    person: "Razvan Stoenescu",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
    caption: "I'm working on Quasar!",
    time: "15:00",
    sent: true,
  },
  {
    id: 2,
    person: "Dan Popescu",
    avatar: "https://cdn.quasar.dev/team/dan_popescu.jpg",
    caption: "I'm working on Quasar!",
    time: "16:00",
    sent: true,
  },
  {
    id: 3,
    person: "Jeff Galbraith",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
    caption: "I'm working on Quasar!",
    time: "18:00",
    sent: true,
  },
  {
    id: 4,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
];

export default {
  name: "MainLayout",
  components: {
    ChatList,
  },
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
    currentConversation() {
      return this.conversations[this.currentConversationIndex];
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
      search: "",
      message: "",
      currentConversationIndex: 0,
      conversations: conversations,
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
    setCurrentConversation(index) {
      this.currentConversationIndex = index;
    },
    toggleTheme(value) {
      console.log("value");
      console.log(value);
      this.$q.dark.set(!value);
      localStorage.setItem("dark", JSON.stringify(!value));
    },
  },
};
</script>
