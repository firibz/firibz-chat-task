<template>
  <q-page ref="pageChat" class="flex column chat-background-pattern">
    <!-- <q-banner v-if="!otherUserDetails.online" class="text-center">
      {{ otherUserDetails.name }} is offline.
    </q-banner> -->
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
    <!-- <q-inner-loading v-if="messagesLoading" :showing="true">
      <q-spinner-hearts color="teal" size="7em" />
      <div class="text-bold text-center text-teal">Loading...</div>
    </q-inner-loading> -->
    <div
      v-if="messages && Object.keys(messages).length > 0"
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
            @blur="scrollToBottom"
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
    ...mapState("chat", ["messages"]),
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
