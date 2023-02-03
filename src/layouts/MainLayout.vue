<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="$route.fullPath.includes('/chat')" elevated>
      <q-toolbar class="bg-grey-3 text-black">
        <!-- <q-btn round flat icon="keyboard_arrow_left" class="q-mr-sm" to="/" /> -->
        <q-btn to="/" icon="keyboard_arrow_left" flat round class="q-mr-sm" />
        <q-btn round flat>
          <q-avatar>
            <img :src="currentConversation.avatar" />
            <!-- <q-icon name="mdi-account" /> -->
          </q-avatar>
        </q-btn>

        <span class="q-subtitle-1 q-pl-md">
          {{ otherUserDetails.name }}
        </span>

        <q-space />

        <q-btn round flat icon="search" />
        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 0]">
            <q-list style="min-width: 150px">
              <q-item clickable>
                <q-item-section>Contact data</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Block</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Select messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Silence</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Clear messages</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Erase messages</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="!$route.fullPath.includes('/chat') || $q.screen.gt.xs"
      :content-style="
        $q.screen.gt.xs ? 'width:300px' : 'width:100vw !important'
      "
      content-class="bg-white"
      show-if-above
      bordered
      :breakpoint="0"
    >
      <q-toolbar class="bg-grey-3">
        <!-- <q-btn round flat icon="menu" @click="toggleLeftDrawer" /> -->
        <q-avatar class="cursor-pointer q-ml-sm">
          <img src="~assets/axon-logo.webp" />
        </q-avatar>
        <span class="text-bold text-teal q-ml-sm">{{ userDetails.name }}</span>
        <q-space />

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
      class="bg-grey-2"
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
    };
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    setCurrentConversation(index) {
      this.currentConversationIndex = index;
    },
  },
};
</script>
