<template>
  <div class="header">
    <div class="margin-block">
      <div class="margin-group">
        <span class="upper">Balance:</span>
        <span class="lower">0.00</span>
      </div>
      <div class="margin-group">
        <span class="upper">Credit:</span>
        <span class="lower">250.00</span>
      </div>
      <div class="margin-group">
        <span class="upper">Equity:</span>
        <span class="lower">250.00</span>
      </div>
      <div class="free-margin">
        <div class="mrg-group">
          <span class="upper">Margin:</span>
          <span class="upper">Free margin:</span>
        </div>
        <span class="line"></span>
        <div class="mrg-group">
          <span class="lower">0.00</span>
          <span class="lower">250.00</span>
        </div>
      </div>
      <div class="margin-group">
        <span class="upper">Margin level:</span>
        <span class="lower">0.00%</span>
      </div>
    </div>
    <div class="amount">
      P/L: € {{ pl }}
    </div>
    <div class="user-details">
      <img src="src/assets/man.png" alt="avatar">
      {{ name }}
    </div>
    <div class="dropdown" @click="toggleMenu">
      ☰
      <div class="dropdown-content" v-show="showMenu" @click.stop>
        <ul class="menu-list">
          <li class="menu-item">
            <img src="src/assets/trade.png" class="menu-icon" alt="menu icon">
            Trading
          </li>
          <li class="menu-item">
            <img src="src/assets/account.png" class="menu-icon" alt="menu icon">
            My account
          </li>
          <li class="menu-item">
            <img src="src/assets/settings.png" class="menu-icon" alt="menu icon">
            Settings
          </li>
          <li class="menu-item line2" @click="siginOut">
            <img src="src/assets/sign-out.png" class="menu-icon" alt="menu icon">
            Sign out
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      name: "USERNAME - 00001233",
      pl: "0.00",
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    siginOut(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>
  
<style scoped>
.dropdown {
  position: relative;
  cursor: pointer;
  font-size: large;
}

.dropdown-content {
  margin-top: 11px;
  position: absolute;
  right: -9px;
  z-index: 1000;
  background-color: #22252e;
  color: #c4c9c9;
  padding: 21px;
  width: 175px;
  font-size: smaller;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.menu-icon{
  width: 14px;
  height: 14px;
}
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  cursor: pointer;
  color: #d7d8d6;
}

.menu-item:hover {
  background-color: #1f6f6c;
}
.header {
  background-color: #131722;
  padding-inline: 10px;
  padding-block: 5px;
  display: flex;
  gap: 12px;
  justify-content: right;
  align-items: center;
  color: #d7d8d6;
  border-radius: 4px;
}

.margin-block {
  display: flex;
  gap: 10px;
  font-size: x-small;
  margin-right: 10px;
}

.free-margin {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mrg-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.line {
  border: 0.2px ridge #d7d8d6;
}
.line2 {
  border-top: 0.1px ridge #c4c9c9;
}

.margin-group {
  display: flex;
  justify-content: center;
  gap: 4px;
  flex-direction: column;
}

.lower {
  color: #1595b5;
}

.amount {
  font-weight: bold;
  font-size: small;
}

.user-details {
  display: flex;
  gap: 4px;
  align-items: center;
  border: 1px solid #1f6f6c;
  padding: 5px 10px;
  font-size: small;
}

.user-details img {
  height: 20px;
  width: 20px;
}
@media screen and (max-width: 3000px) {
    .header{
      height: 100px;
    }
}
@media screen and (max-width: 2000px) {
    .header{
      height: 80px;
    }
}
@media screen and (max-width: 1500px) {
    .header{
      height: 60px;
    }
}
@media screen and (max-width: 1300px) {
    .header{
      height: 50px;
    }
}
@media screen and (max-width: 1000px) {
  .header {
    width: 98vw;
  }
}
</style>
