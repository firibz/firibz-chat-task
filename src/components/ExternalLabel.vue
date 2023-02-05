<template>
  <div class="full-width">
    <label class="text-system-primary text-bold q-pl-sm"
           :for="$attrs['for'] ? $attrs['for'] : null">{{ label }}</label>
    <span class="text-system-negative">{{ required ? ' *' : '' }}</span>
    <!--    <span class="text-system-primary q-pl-md">{{extraLabel? '('+ extraLabel + ')':''}}</span>-->
  </div>
</template>

<script>
export default {
  name: "ExternalLabel",
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
    // extraLabel: {
    //   type: String,
    // }
  }
}
</script>
