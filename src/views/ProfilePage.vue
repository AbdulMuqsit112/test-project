<template>
  <div class="main__grid">
    <div class="mainBlock" style="width: 100%; height: 15%; top: 0; left: 0;">
      <div class="mainBlock__content">
        <div class="p-3 d-flex flex-column align-items-start mt-3 gap-0">
          <div class="card-header">
            <h3 class="" :class="{ 'setting': isDarkMode, 'light-settings': !isDarkMode }">My account</h3>
            <span class="adj-settings" :class="{ 'adjust': isDarkMode, 'light-adjust': !isDarkMode }">personal Information</span>
          </div>
        </div>
      </div>
      </div>
      <div class="mainBlock" style="width: 100%; height: 85.5%; top: 14.5%; left: 0;">
        <div class="mainBlock__content">
          <div class="d-flex gap-4 justify-content-center w-100">
            <div class="d-flex flex-column gap-4 w-100">
              <ul class="d-flex tab-btns py-1">
                <li class="tab-btn-item">
                  <button class="tab-button" :class="{ active: activeTab === 'personalInfo', 'text-white': isDarkMode}"
                    @click="activeTab = 'personalInfo'">Personal Info</button>
                </li>
                <li class="tab-btn-item">
                  <button class="tab-button" :class="{ active: activeTab === 'transactions', 'text-white': isDarkMode }"
                    @click="activeTab = 'transactions'">Transactions</button>
                </li>
                <li class="tab-btn-item">
                  <button class="tab-button" :class="{ active: activeTab === 'changePassword', 'text-white': isDarkMode }"
                    @click="activeTab = 'changePassword'">Change Password</button>
                  </li>
                </ul>
              <div class="p-4" v-if="activeTab === 'personalInfo'">
                <table class="table">
                  <thead>
                    <tr>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Login</th>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Currency</th>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Account Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :class="{ 'text-white': isDarkMode }">
                      <td>USERNAME - 00001233</td>
                      <td>EUR</td>
                      <td>Main</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr >
                      <td class="footer" :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }" colspan="3">
                        showing
                        <select class="mx-1" disabled>
                          <option value="20" selected>20</option>
                        </select>
                        Matches
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="p-4" v-else-if="activeTab === 'transactions'">
                <table class="table">
                  <thead>
                    <tr>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Order</th>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Date</th>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Type</th>
                      <th :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :class="{ 'text-white': isDarkMode }" class="transactions" v-for="(transaction, index) in transactions" :key="index">
                      <td>{{ transaction.order }}</td>
                      <td>{{ transaction.date }}</td>
                      <td>{{ transaction.type }}</td>
                      <td>{{ transaction.volume }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="footer" :class="{ 'dark-th': isDarkMode, 'light-header': !isDarkMode }" colspan="4">
                        showing
                        <select class="mx-1" disabled>
                          <option value="20" selected>20</option>
                        </select>
                        Matches
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="p-4 d-flex flex-column gap-4" v-else>
                <h4 :class="{ 'text-white': isDarkMode }">Change Password</h4>
                <div class="form-group">
                  <label :class="{ 'text-white': isDarkMode }">New Password</label>
                  <input type="password" class="form-control" :class="{'dark-input': isDarkMode, 'light-input': !isDarkMode }" v-model="newPassword">
                </div>
                <div class="form-group">
                  <label :class="{ 'text-white': isDarkMode }">Confirm New Password</label>
                  <input type="password" class="form-control" v-model="confirmPassword" :class="{'dark-input': isDarkMode, 'light-input': !isDarkMode }">
                </div>
                <button class="btn confirm-btn" @click="changePassword">Confirm</button>
                <span :class="msgClass">{{ message }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      activeTab: 'personalInfo',
      transactions: [],
      newPassword: '',
      confirmPassword: '',
      message: '',
      msgClass: ''
    };
  },
  methods: {
    async fetchTransactionsData(){
      try {
        const response = await this.$http.get('transactions', {
          params: {
            limit: 1,
            offset: 1
          }
        });
        if (response.status == 200 ) this.transactions = response.data.orders;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async changePassword() {
      if (this.newPassword === this.confirmPassword) {
        let pwChangePaload = {
          login: 'user2@email.com',
          password: this.newPassword
        };
        const response = await this.$http.put('accounts/change-password', pwChangePaload);
        if (response.status == 200) {
          this.message = 'Password changed successfully';
          this.msgClass = 'text-success'
        } else {
          this.message = 'Something Went Wrong';
          this.msgClass = 'text-danger'
        }
      } else {
        this.message = 'Password mismatch';
        this.msgClass = 'text-danger'
      }
      this.newPassword = '';
      this.confirmPassword = '';
    },
  },
  computed: {
    isDarkMode(){
      return this.$store.getters.getIsDarkMode;
    },
    userID(){
      return this.$store.getters.getUser.loginId;
    }
  },
  watch: {
    activeTab(newVal){
      if (newVal == 'transactions'){
        this.fetchTransactionsData();
      }
    }
  }
};
</script>

<style scoped>
.back {
  width: 16px;
  height: 16px;
}
.tab-btns {
  padding-inline: 0;
  border-block: 1px solid;
}

.tab-button {
  background: none;
  color: inherit;
  border: none;
  padding-block: 2px;
  padding-inline: 20px;
  width: 100%;
  z-index: 1000;
  position: relative;
  top: 4px;
}

.tab-button.active {
  padding-block: 2px;
  color: #007BFF !important;
  border-bottom: 2px solid #007BFF;
}

.line-item {
  width: calc(100% - 33%);
  border-bottom: 1px solid white;
  height: 29px;
}

ul {
  list-style-type: none;
}

.dark-th{
  background-color: #434d51 !important;
  color: #f5fafd !important;
}
th {
  padding-block: 15px !important;
  border: none;
}

td {
  padding-block: 12px !important;
  border: none;
  background-color: inherit;
  color: inherit;
}

.footer select {
  background-color: #434d51 !important;
  border-color: white;
  color: white;
  padding: 4px;
}

.transactions {
  border-bottom: 1px solid;
}
input{
  border: 1px solid;
}
.dark-input {
  background-color: #131722 !important;
  color: white !important;
}
.light-input{
  color: #434d51;
  background-color: inherit;
  border-color: #434d51;
}
.confirm-btn {
  background-color: #007BFF;
  color: white;
}
.text-white {
  color: white !important;
}
</style>
