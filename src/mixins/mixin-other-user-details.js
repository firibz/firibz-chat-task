export default {
  computed: {
    otherUserDetails() {
      if (this.$store.state.user.users[this.$route.params.otherUserId]) {
        return this.$store.state.user.users[this.$route.params.otherUserId];
      }
      return {};
    },
  },
};
