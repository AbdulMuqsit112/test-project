<template>
  <transition name="fade">
    <div class="alert" :class="color">
      <p class="mt-1">{{ alertText }}</p>
    </div>
  </transition>
</template>
<script>

export default {
  mounted() {
    setTimeout(() => {
      this.$store.commit('toggleShowAlert');
    }, 1600);
  },
  computed: {
    color() {
      let colorVal = this.alertColor;
      switch (colorVal) {
        case "error":
          return "bg-danger";
        case "success":
          return "bg-success";
        default:
          return "bg-primary";
      }
    },
    alertColor() {
      return this.$store.getters.getAlertColor;
    },
    alertText() {
      return this.$store.getters.getAlertText;
    }
  },
};
</script>
<style scoped>
.alert {
  position: fixed;
  top: 4%;
  left: 2%;
  padding: 10px;
  border-radius: 4px;
  color: white;
  z-index: 3000;
  text-align: center;
  font-size: larger;
  width: 15%;
  height: 8%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>