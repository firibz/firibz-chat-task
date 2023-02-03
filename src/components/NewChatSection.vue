<template>
  <div class="column col justify-center items-center">
    <div v-for="index in 3" :key="index">
      <span v-show="index === animationId">
        <lottie-player
          autoplay
          loop
          mode="normal"
          :src="'/animations/new-chat-' + index + '.json'"
          style="height: 320px; width: 300px"
        ></lottie-player>
        <div class="text-bold text-center">No messages here yet</div>
        <div class="text-bold text-center">Lets send a message...</div>
      </span>
    </div>
  </div>
</template>

<script>
import { utils } from "../helpers/utils";
// import Lottie from "vue-lottie";
// const animationId = utils.getRandomInt(1, 3);
// the import ia essential in order to use vue-lottie component
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default {
  name: "NewChatSection",
  components: {},
  data() {
    return {
      animationId: utils.getRandomInt(1, 3),
    };
  },
};
</script>
