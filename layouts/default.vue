<template>
  <div class="container-main">
    <header>
      <NuxtLink to="/" class="button button-secondary">Home</NuxtLink>
    </header>

    <!-- Aquí se renderiza la página actual -->
    <main class="content">
      <div class="background"></div>
      <Nuxt />
    </main>
    <div id="snipcart" hidden :data-api-key="snipcartKey"></div>

    <footer>
      <a>Daniel Hernandez | Jenson Perez</a>
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    // Lee la variable del entorno de Netlify
    snipcartKey() {
      return "YWI0NmRiMjItMzYyYi00OWIxLTlhNDMtMGI2NzZmZmQ5YjRlNjM4OTkwMjI4NzcwNTA1Nzk4";
    },
  },

  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.css",
        },
      ],
      script: [
        {
          src: "https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.js",
          async: true,
        },
      ],
    };
  },
};
</script>
