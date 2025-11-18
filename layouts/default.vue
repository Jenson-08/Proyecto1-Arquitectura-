<template>
  <div class="container-main">
    <header>
      <NuxtLink to="/" class="button button-secondary">Home</NuxtLink>
      <button @click="abrirCarrito()" class="button button-secondary snipcart-cart-button">🛒 Ver carrito</button>
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
  methods: {
  async abrirCarrito() {
  try {
    // 1) Esperar a que Snipcart esté disponible
    if (
      !window.Snipcart ||
      !window.Snipcart.api ||
      !window.Snipcart.api.cart
    ) {
      await new Promise((resolve, reject) => {
        let tries = 0;
        const maxTries = 20;

        const iv = setInterval(() => {
          tries++;

          if (
            window.Snipcart &&
            window.Snipcart.api &&
            window.Snipcart.api.cart
          ) {
            clearInterval(iv);
            return resolve();
          }

          if (tries >= maxTries) {
            clearInterval(iv);
            return reject(
              new Error("Snipcart no está listo (script no cargado)")
            );
          }
        }, 100);
      });
    }

    // 2) Intentar abrir carrito (varios paths según versión)
    if (
      window.Snipcart.api?.theme?.cart?.open
    ) {
      window.Snipcart.api.theme.cart.open();
    } else if (
      window.Snipcart.api?.cart?.open
    ) {
      window.Snipcart.api.cart.open();
    } else {
      console.warn("No se encontró un método válido para abrir el carrito");
    }

    console.log("Carrito abierto");
  } catch (err) {
    console.error("Error al abrir el carrito Snipcart:", err);
  }
  }
  }

};
</script>

<style scoped>
.snipcart-cart-button {

  margin-left: auto !important;
  margin-right: 3rem !important;
}

.snipcart-cart-button:hover {
    color: #0f172a;
  background-color: #06b6d4;
  border: none;
}

</style>