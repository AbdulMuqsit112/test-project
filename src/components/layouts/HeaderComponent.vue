<template>
  <header class="app-header">
    <div class="app-header-section">
      <div class="app-header-box">
        <div class="favoriteAssets"></div>
      </div>
    </div>
    <div class="app-header-section">
      <div class="app-header-box">
        <div class="header-balances">
          <div class="header-wrap">
            <span class="header-balances-item">
              <div class="">Balance:</div>
              <span class="balance">0.00</span></span
            >
            <span class="header-balances-item">
              <div class="">Credit:</div>
              <span class="balance">0.00</span></span
            >
            <span class="header-balances-item">
              <div class="">Equity:</div>
              <span class="balance">0.00</span></span
            >
            <div class="header-margin">
              <span class="header-balances-item">
                <div class="">Margin</div>
                <div class="ml-sm">Free margin</div></span
              >
              <div class="margin-bar">
                <div class="margin-bar-inner"></div>
              </div>
              <span class="header-balances-item">
                <span class="balance">0.00</span>
                <span class="balance">0.00</span></span
              >
            </div>
            <span
              class="header-balances-item header-balances-item__margin-level"
            >
              <div class="">Margin level:</div>
              <span class="balance">0.00%</span></span
            >
          </div>
          <div class="header-profit">
            P/L: &nbsp;<span class="">€ 0.00</span>
          </div>
        </div>
      </div>
      <div class="header-account-real header-account">
        <img src="" class="icon-xlg icon-round mr-sm" alt="" /><b
          >User - &nbsp;
        </b>
        <span class="header-account-id">460187473</span>
      </div>
      <div class="app-header-box">
        <div class="header-menu" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97">
            <path
              d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z"
            ></path>
          </svg>
          <div class="dropdown-content" v-show="showMenu" @click.stop>
            <ul class="menu-list">
              <li class="menu-item">
                <img
                  src="src/assets/trade.png"
                  class="menu-icon"
                  alt="menu icon"
                />
                Trading
              </li>
              <li class="menu-item">
                <img
                  src="src/assets/account.png"
                  class="menu-icon"
                  alt="menu icon"
                />
                My account
              </li>
              <li class="menu-item">
                <img
                  src="src/assets/settings.png"
                  class="menu-icon"
                  alt="menu icon"
                />
                Settings
              </li>
              <li class="menu-item line2" @click="siginOut">
                <img
                  src="src/assets/sign-out.png"
                  class="menu-icon"
                  alt="menu icon"
                />
                Sign out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      name: "USERNAME - 00001233",
      pl: "0.00",
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    siginOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.margin-bar {
  padding: 1px;
}
.dropdown-content {
  cursor: pointer;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 1000;
  background-color: #131722 !important;
  color: #c4c9c9;
  padding: 21px;
  width: 175px;
  font-size: smaller;
}

.menu-icon {
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
.line2 {
  border-top: 0.1px ridge #c4c9c9;
}
</style>
