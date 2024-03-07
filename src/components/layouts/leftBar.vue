<template>
  <div class="left-wrapper h-100 d-flex flex-column items-center gap-3">
    <div class="side-bar" :class="{ 'selected': selected === 'trade' }" @click="selectItem('trade')">
      <img src="src/assets/trade.png" alt="icon">
      Trading
    </div>
    <div class="side-bar" :class="{ 'selected': selected === 'account' }" @click="selectItem('account')">
      <img src="src/assets/account.png" alt="icon">
      My Account
    </div>
    <div class="side-bar" :class="{ 'selected': selected === 'settings' }" @click="selectItem('settings')">
      <img src="src/assets/settings.png" alt="icon">
      Settings
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null
    };
  },
  methods: {
    selectItem(item) {
      this.selected = item;
    }
  }
};
</script>

<style scoped>
.left-wrapper {
  background-color: #131722;
  z-index: 1000;
  border-top: 2px solid #415159;
}

.side-bar {
  font-size: xx-small;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  margin-top: 1px; 
  padding-block: 8px;
  transition: background-color 0.2s;
  cursor: pointer;
  border-bottom: 1px solid #415159;
}

.side-bar:hover {
  background-color: #1f6f6c;
}

.side-bar.selected {
  background-color: rgba(34, 39, 46, 255);
}

.side-bar img {
  width: 24px;
  height: 24px;
}

@media screen and (max-width: 2500px) {
  .side-bar{
    font-size: 10px;
  }
}
@media screen and (max-width: 1000px) {
  .left-wrapper {
    display: none;
  }
}
</style>
