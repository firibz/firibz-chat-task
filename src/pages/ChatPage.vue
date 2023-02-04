<template>
  <q-page
    ref="pageChat"
    class="flex column chat-background-pattern relative-position"
  >
    <!-- <q-banner v-if="!otherUserDetails.online" class="text-center">
      {{ otherUserDetails.name }} is offline.
    </q-banner> -->
    <q-header class="system-header" elevated>
      <q-toolbar>
        <!-- <q-btn round flat icon="keyboard_arrow_left" class="q-mr-sm" to="/" /> -->
        <q-btn to="/" icon="keyboard_arrow_left" flat round class="q-mr-sm" />
        <q-btn round flat>
          <q-avatar>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1141/1141031.png"
            />
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
    <q-page-sticky
      v-if="
        otherUserDetails &&
        Object.keys(otherUserDetails).length > 0 &&
        !otherUserDetails.online
      "
      expand
      position="top"
    >
      <q-banner class="full-width text-center">
        {{ otherUserDetails.name }} is offline.
      </q-banner>
    </q-page-sticky>
    <div v-if="messagesLoading" class="absolute-center fit bg-loading">
      <div class="absolute-center">
        <q-spinner-comment color="teal" size="7em" />
        <div class="text-bold text-center text-teal">Loading...</div>
      </div>
    </div>
    <div
      v-else-if="messages && Object.keys(messages).length > 0"
      :class="{ invisible: !showMessages }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :text-color="message.from == 'me' ? 'system-content' : 'system-dark'"
        :bg-color="message.from == 'me' ? 'chat-from-me' : 'system-success'"
      />
    </div>
    <new-chat-section v-else />
    <q-footer class="bg-system-section">
      <q-form @submit="sendMessage" class="full-width">
        <q-toolbar class="row">
          <q-btn
            color="system-primary"
            round
            flat
            icon="insert_emoticon"
            class="q-mr-sm"
          />
          <q-input
            borderless
            dense
            class="full-width system-white-input"
            v-model="newMessage"
            ref="newMessage"
            placeholder="Type a message"
          />
          <q-btn
            round
            dense
            flat
            type="submit"
            class="q-ml-sm"
            color="system-primary"
            icon="send"
            :disable="!newMessage"
          />
        </q-toolbar>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details.js";
import NewChatSection from "components/NewChatSection.vue";

export default {
  name: "ChatPage",
  mixins: [mixinOtherUserDetails],
  components: {
    NewChatSection,
  },
  data() {
    return {
      newMessage: "",
      showMessages: false,
      loading: false,
    };
  },
  computed: {
    ...mapState("user", ["userDetails"]),
    ...mapState("chat", ["messages", "messagesLoading"]),
  },
  methods: {
    ...mapActions("chat", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage",
    ]),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me",
        },
        otherUserId: this.$route.params.otherUserId,
      });
      this.clearMessage();
    },
    clearMessage() {
      this.newMessage = "";
      this.$refs.newMessage.focus();
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    },
  },
  watch: {
    messages: function (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
        setTimeout(() => {
          this.showMessages = true;
        }, 200);
      }
    },
  },
  mounted() {
    console.log("mounted PageChat");
    this.$refs.newMessage.focus();
    this.firebaseGetMessages(this.$route.params.otherUserId);
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    if (to.path === "/chat/" + to.params.otherUserId) {
      this.$refs.newMessage.focus();
      this.firebaseStopGettingMessages();
      this.firebaseGetMessages(to.params.otherUserId);
    }
    next();
  },
};
</script>
