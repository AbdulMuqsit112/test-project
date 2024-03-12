<template>
  <div class="main__grid">
    <div class="mainBlock" style="width: 100%; height: 100%; top: 0; left: 0;">
      <div class="mainBlock__content">
        <div class="p-3 d-flex flex-column gap-4 align-items-start">
          <div class="card-header mt-4">
            <span class="h5">
              <-
              <router-link to="/dashboard">
                Go Back
              </router-link> 
            </span>
            <h3 class="mt-4">My Account</h3>
            <span>personal Information</span>
          </div>
          <div class="d-flex gap-4 justify-content-center mt-4 w-100">
            <div class="d-flex flex-column gap-4 w-100">
              <ul class="d-flex tab-btns py-1">
                <li class="tab-btn-item">
                  <button class="tab-button" :class="{ active: activeTab === 'personalInfo' }"
                    @click="activeTab = 'personalInfo'">Personal Info</button>
                </li>
                <li class="tab-btn-item">
                  <button class="tab-button" :class="{ active: activeTab === 'transactions' }"
                    @click="activeTab = 'transactions'">Transactions</button>
                </li>
                <li class="tab-btn-item">
                  <button class="tab-button" :class="{ active: activeTab === 'changePassword' }"
                    @click="activeTab = 'changePassword'">Change Password</button>
                </li>
              </ul>
              <div class="p-4" v-if="activeTab === 'personalInfo'">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Login</th>
                      <th>Currency</th>
                      <th>Account Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>USERNAME - 00001233</td>
                      <td>EUR</td>
                      <td>Main</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="footer" colspan="3">
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
                <h4>Transactions</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="transactions" v-for="(transaction, index) in transactions" :key="index">
                      <td>{{ transaction.order }}</td>
                      <td>{{ transaction.date }}</td>
                      <td>{{ transaction.type }}</td>
                      <td>{{ transaction.volume }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="footer" colspan="4">
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
                <h4>Change Password</h4>
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" class="form-control" v-model="newPassword">
                </div>
                <div class="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" class="form-control" v-model="confirmPassword">
                </div>
                <button class="btn confirm-btn" @click="changePassword">Confirm</button>
              </div>
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
      transactions: [
        { order: 12314241, date: '2024-03-11', type: 'Deposit', volume: '$100.00' },
        { order: 12314244, date: '2024-03-21', type: 'Withdraw', volume: '$1000.00' },
        { order: 12314246, date: '2024-02-11', type: 'Deposit', volume: '$300.00' },
      ],
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    changePassword() {
      if (this.newPassword === this.confirmPassword) {
        console.log('Password changed successfully');
        this.newPassword = '';
        this.confirmPassword = '';
      } else {
        console.error('Passwords do not match');
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #131722;
  color: white;
}

.tab-btns {
  padding-inline: 0;
  border-block: 1px solid;
}

.tab-button {
  background: none;
  color: white;
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
  color: #085bb4;
  border-bottom: 2px solid #085bb4;
}

.line-item {
  width: calc(100% - 33%);
  border-bottom: 1px solid white;
  height: 29px;
}

ul {
  list-style-type: none;
}

th {
  background-color: #434d51 !important;
  color: #f5fafd !important;
  padding-block: 15px !important;
  border: none;
}

td {
  padding-block: 12px !important;
  color: #f5fafd !important;
  background-color: #1e222d !important;
  border: none;
}

.footer {
  background-color: #434d51 !important;
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

input {
  border: 1px solid;
  background-color: #131722 !important;
  color: white !important;
}

.confirm-btn {
  background-color: #085bb4;
  color: white;
}
</style>
