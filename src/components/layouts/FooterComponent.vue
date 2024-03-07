<template>
  <div class="footer d-flex justify-content-end gap-3 px-4">
    <div class="icons">
      <img src="" alt="i">
    </div>
    <div class="time d-flex flex-column justify-content-center">
      <span>
        <span class="small">Current Time:</span>
        <span class="text-white small date-time">{{ currentDateTime }}</span>
      </span>
    </div>
    <div class="icons">
      <img src="" alt="i">
    </div>
    <div class="icons right-border">
      <img src="" alt="i">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
    };
  },
  computed: {
    currentDateTime() {
      const currentDate = new Date();
      const month = currentDate.toLocaleString('default', { month: 'long' });
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      const time = currentDate.toLocaleTimeString();
      return`${month} ${day}, ${year} ${time}`;
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #131722;
  padding-block: 4px;
}
.date-time{
  color: #c1c4cd !important;
}
.icons{
  display: flex;
  align-items: center;
  justify-content: center;
  border-inline: 1px solid #415159;;
  padding: 5px;
  padding-inline: 12px;
}
.right-border{
  margin-left: 5px;
  border-right: none;
}


</style>
