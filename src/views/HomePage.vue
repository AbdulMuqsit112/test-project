<template>
  <div>
    <div class="layout">
      <header class="header">
        <HeaderComponent />
      </header>
      <div class="left-bar">
        <leftBar />
      </div>
      <div class="graph-section">
        <GraphComponent />
      </div>
      <aside class="r-banner">
        <SideBar />
      </aside>
      <footer class="footer">
        <FooterComponent />
      </footer>
    </div>
  </div>
</template>
  
<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import leftBar from '@/components/leftBar.vue';
import GraphComponent from '../components/GraphComponent.vue';
import SideBar from '../components/SideBar.vue';
import FooterComponent from '../components/FooterComponent.vue';
export default {
  name: 'HomePage',
  components: {
    GraphComponent,
    SideBar,
    FooterComponent,
    HeaderComponent,
    leftBar
  }
}
</script>
  
<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    'header header header header header'
    'l-bar graph-section graph-section r-banner r-banner'
    'l-bar graph-section graph-section r-banner r-banner'
    'l-bar graph-section graph-section r-banner r-banner'
    'l-bar graph-section graph-section r-banner r-banner'
    'l-bar footer footer r-banner r-banner'
    'l-bar footer footer r-banner r-banner';
  height: 100vh;
}

.header {
  grid-area: header;
}

.graph-section {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: graph-section;
}

.left-bar {
  grid-area: l-bar;
}

.r-banner {
  grid-area: r-banner;
}

.footer {
  grid-area: footer;
}

@media screen and (max-width: 1000px) {
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 100vh;
  }
}
</style>