<template>
  <div class="left-wrapper">
    <span class="m-2"></span>
    <div class="side-bar" :class="{ 'selected': selected === 'trade' }" @click="selectItem('trade')">
      <img src="../assets/trade.png" alt="icon">
      Trading
    </div>
    <div class="side-bar" :class="{ 'selected': selected === 'account' }" @click="selectItem('account')">
      <img src="../assets/account.png" alt="icon">
      My Account
    </div>
    <div class="side-bar" :class="{ 'selected': selected === 'settings' }" @click="selectItem('settings')">
      <img src="../assets/settings.png" alt="icon">
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
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60px;
  background-color: #131722;
  z-index: 1000;
}

.side-bar {
  font-size: xx-small;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  padding: 5px;
  transition: background-color 0.2s;
  cursor: pointer;
  width: 50px;
}

.side-bar:hover {
  background-color: #1f6f6c;
}

.side-bar.selected {
  background-color: rgba(34, 39, 46, 255);
}

.side-bar img {
  width: 30px;
  height: 26px;
}

.m-2 {
  margin-top: 8px;
}

@media screen and (max-width: 3000px) {
  .left-wrapper {
    height: 100%;
    width: 100px;
    gap: 60px;
  }

  .side-bar {
    width: 90px;
  }
}

@media screen and (max-width: 2000px) {
  .left-wrapper {
    width: 80px;
    gap: 50px;
  }
  .side-bar {
    width: 70px;
  }
}

@media screen and (max-width: 1500px) {
  .left-wrapper {
    width: 60px;
    gap: 40px;
  }
  .side-bar {
    width: 50px;
  }
}

@media screen and (max-width: 1300px) {
  .left-wrapper {
    width: 50px;
    gap: 40px;
  }
  .side-bar {
    width: 40px;
  }
}

@media screen and (max-width: 1000px) {
  .left-wrapper {
    display: none;
  }
}
</style>
