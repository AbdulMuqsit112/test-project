<template>
  <div class="wrapper  h-100 w-100 p-4 d-flex flex-column gap-4">
    <div class="card-header text-center mt-4">
      <h3>User Profile</h3>
      <img src="" alt="avatar">
    </div>
    <div class="d-flex gap-4 justify-content-center mt-4">
      <div class="d-flex flex-column gap-4">
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
  background-color: #131722;
}
</style>