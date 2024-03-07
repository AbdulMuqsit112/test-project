<template>
  <div class="wrapper d-flex justify-content-center h-100 w-100 align-items-center">
    <div class="s-card p-4">
      <div class="card-header">
        <h3>User Profile</h3>
      </div>
      <div class="card-body">
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Username</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="username" disabled>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Change Password</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" v-model="newPassword">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 offset-sm-3">
            <button class="btn btn-primary" @click="changePassword">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ProfilePage',
};
</script>
<style>
.wrapper{
  background-color: #3d3c3c;
}
</style>