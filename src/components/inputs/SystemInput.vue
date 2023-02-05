<template>
  <span>
    <external-label
      v-if="externalLabel"
      :label="externalLabel"
      :for="$attrs['for']"
      :required="$attrs['is-required']"
    />
    <q-input
      :type="isPassword && isPwd ? 'password' : 'text'"
      v-model="innerValue"
      v-bind="$attrs"
      :class="
        ($attrs['rules'] ? '' : 'q-pb-md ') + $attrs['system-input-class']
      "
      :borderless="booleanSetDefaultTrue('borderless')"
      :no-error-icon="booleanSetDefaultTrue('no-error-icon')"
      :reactive-rules="
        isBoolean($attrs['reactive-rules'])
          ? $attrs['reactive-rules']
          : !!$attrs['rules']
      "
      :clearable="booleanSetDefaultTrue('clearable')"
    >
      <template v-if="isPassword" v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer q-ml-sm"
          @click="isPwd = !isPwd"
          size="sm"
          color="system-caption"
        />
      </template>
      <!--      <template v-slot:append="scope"><slot name="append" v-bind="scope"/></template>-->
      <!--      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>-->
    </q-input>
  </span>
</template>

<script>
import ExternalLabel from "components/ExternalLabel.vue";

export default {
  inheritAttrs: false,
  name: "SystemInput",
  components: { ExternalLabel },
  props: {
    externalLabel: {
      type: String,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    // must be included in props
    value: {
      type: null,
    },
  },
  data: () => ({
    innerValue: "",
    isPwd: true,
  }),
  methods: {
    isBoolean(val) {
      return typeof val === "boolean";
    },
    booleanSetDefaultTrue(attName) {
      if (this.isBoolean(this.$attrs[attName])) {
        return this.$attrs[attName];
      } else {
        return true;
      }
    },
  },
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>
