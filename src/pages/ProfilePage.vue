<template>
  <q-dialog content-class="bg-blur" persistent v-model="card">
    <q-card class="system-section q-pa-md" style="width: 300px">
      <q-img src="~assets/axon-life.svg" />

      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis text-center">
            {{ userDetails.name }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 text-center">{{ userDetails.email }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn
          v-go-back.single
          flat
          color="system-negative"
          label="Close"
          icon="close"
        />
        <q-btn
          v-if="$route.params.otherUserId"
          v-close-popup
          flat
          color="system-warning"
          icon="mdi-heart"
          label="favorite"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      card: true,
    };
  },
  computed: {
    userDetails() {
      if (this.$store.state.user.users[this.$route.params.otherUserId]) {
        return this.$store.state.user.users[this.$route.params.otherUserId];
      } else {
        return this.$store.state.user.userDetails;
      }
    },
  },
};
</script>
