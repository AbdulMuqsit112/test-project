<template>
  <div class="header">
    <div class="profile">
      <img class="avatar" src="../assets/man.png" alt="User Avatar">
      <div class="info">
        <h2 class="name">name</h2>
        <p class="email">email@email.com}</p>
      </div>
    </div>
    <div class="settings">
      <img class="settings-icon" src="../assets/settings.svg" alt="Settings Icon">
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'HeaderComponent',
  
}
</script>
  
<style scoped>
.header {
  background-color: #f0f0f0;
  padding-inline: 10px;
  padding-block: 5px;
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: space-between;
}

.profile {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  margin: 0;
  font-size: medium;
  font-weight: bold;
}

.email {
  font-size: small;
  margin: 0;
  color: #666;
}

.settings-icon {
  width: 20px;
  height: 20px;
}
</style>
  