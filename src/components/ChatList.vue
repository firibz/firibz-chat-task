<template>
  <div class="full-width" style="height: calc(100% - 50px)">
    <q-toolbar class="bg-grey-2">
      <q-input
        rounded
        outlined
        dense
        class="WAL__field full-width"
        bg-color="white"
        v-model="search"
        placeholder="Search users"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>
    <q-scroll-area style="height: calc(100% - 50px)">
      <q-list
        separator
        v-if="filteredUsers && Object.keys(filteredUsers).length > 0"
      >
        <q-item
          v-for="(user, key) in filteredUsers"
          :key="key"
          :to="'/chat/' + key"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <!-- <q-avatar>
                <img :src="conversation.avatar" />
              </q-avatar> -->
            <q-avatar color="indigo" text-color="white" class="relative">
              {{ user.name.charAt(0) }}
              <q-badge
                v-if="user.online"
                color="light-green"
                rounded
                class="online-status"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ user.name }}
            </q-item-label>
            <q-item-label class="conversation__summary" caption>
              <!-- <q-icon name="check" v-if="conversation.sent" /> -->
              <!-- <q-icon name="not_interested" v-if="conversation.deleted" /> -->
              <!-- {{ conversation.caption }} -->
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>
              <!-- {{ conversation.time }} -->
            </q-item-label>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ChatList",
  computed: {
    ...mapGetters("user", ["users"]),
    filteredUsers() {
      if (this.search) {
        let filteredUsers = {};
        for (let key in this.users) {
          if (this.users[key].name.includes(this.search)) {
            filteredUsers[key] = this.users[key];
          }
        }
        return filteredUsers;
      } else {
        return this.users;
      }
    },
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>
