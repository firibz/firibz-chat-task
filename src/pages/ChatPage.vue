<template>
  <q-page ref="pageChat" class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center fixed-top"
    >
      {{ otherUserDetails.name }} is offline.
    </q-banner>
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
        :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
      />
    </div>
    <new-chat-section v-else />
    <q-footer>
      <q-form @submit="sendMessage" class="full-width">
        <q-toolbar class="bg-grey-3 text-black row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="newMessage"
            @blur="scrollToBottom"
            ref="newMessage"
            placeholder="Type a message"
          />
          <q-btn round dense flat type="submit" color="indigo" icon="send" />
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
