<template>
  <div>
    <div class="layout">
      <header class="header">
        <HeaderComponent />
      </header>
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
import GraphComponent from '../components/GraphComponent.vue';
import SideBar from '../components/SideBar.vue';
import FooterComponent from '../components/FooterComponent.vue';
export default {
  name: 'HomePage',
  components: {
    GraphComponent,
    SideBar,
    FooterComponent,
    HeaderComponent
  }
}
</script>
  
<style scoped>

.layout {
  display: grid;
  grid-template-areas:
    'header header header header'
    'graph-section graph-section r-banner r-banner'
    'graph-section graph-section r-banner r-banner'
    'graph-section graph-section r-banner r-banner'
    'graph-section graph-section r-banner r-banner'
    'footer footer r-banner r-banner'
    'footer footer r-banner r-banner';
  gap: 0.2rem;
  height: 100vh;
}

.header {
  grid-area: header;
}

.graph-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  grid-area: graph-section;
}

.r-banner {
  grid-area: r-banner;
}

.footer {
  grid-area: footer;
}</style>