<template>
  <div class="fit flex q-pa-md">
    <q-card class="full-width flex flex-center landing-page no-shadow">
      <div class="row fit">
        <div
          class="column col-12 col-sm-5 col-md-6 col-lg-8 justify-center items-center"
          :class="$q.screen.lt.sm ? 'order-last' : ''"
        >
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="/animations/auth.json"
            style="height: 320px; width: 320px"
          ></lottie-player>
        </div>
        <div
          class="system-card system-section column col-12 col-sm-7 col-md-6 col-lg-4 justify-center"
        >
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="system-cyan"
            indicator-color="system-cyan"
            align="justify"
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            style="min-height: 375px"
            v-model="tab"
            class="system-section q-my-md"
            animated
          >
            <q-tab-panel class="overflow-hidden" name="login">
              <login-register :tab="tab" />
            </q-tab-panel>

            <q-tab-panel class="overflow-hidden" name="register">
              <login-register :tab="tab" />
            </q-tab-panel>
          </q-tab-panels>
          <q-inner-loading v-if="authLoading" :showing="true">
            <q-spinner-hearts color="teal" size="8em" />
            <div class="text-bold text-center text-teal">Loading...</div>
          </q-inner-loading>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
// the import ia essential in order to use vue-lottie component
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { mapState } from "vuex";
import LoginRegister from "components/LoginRegister.vue";

export default {
  name: "AuthPage",
  components: { LoginRegister },
  data() {
    return {
      tab: "login",
    };
  },
  computed: {
    ...mapState("user", ["authLoading"]),
  },
};
</script>

<style></style>
