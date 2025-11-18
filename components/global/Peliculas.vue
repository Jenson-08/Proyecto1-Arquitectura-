<template>
  <div class="contenedor-peliculas">
    <div
      v-for="pelicula in peliculasFiltradas"
      :key="pelicula.Titulo"
      class="tarjeta-pelicula"
    >
      <!-- Imagen -->
      <div class="tarjeta-pelicula__imagen-wrapper">
        <img
          class="tarjeta-pelicula__imagen"
          :src="`/images/peliculas/${pelicula.Titulo.replace(/\s+/g, '_')}.jpg`"
          :alt="`Poster de ${pelicula.Titulo}`"
        />
      </div>

      <!-- Contenido -->
      <div class="tarjeta-pelicula__contenido">
        <h3 class="tarjeta-pelicula__titulo">
          {{ pelicula.Titulo.replace(/_/g, " ") }}
        </h3>

        <ul class="tarjeta-pelicula__detalles">
          <li><strong>Año:</strong> {{ pelicula.Annio_estreno }}</li>
          <li><strong>Duración:</strong> {{ pelicula.Duracion }} min</li>
          <li>
            <strong>Clasificación:</strong> {{ pelicula.Clasificacion_edad }}
          </li>
          <li>
            <strong>Director:</strong>
            <NuxtLink
              :to="{
                path: '/cine/search/peliculas',
                query: { director: pelicula.Director },
              }"
              class="enlace-card"
            >
              {{ getDirectorNombre(pelicula.Director) }}
            </NuxtLink>
          </li>
          <li>
            <strong>Productora:</strong>
            <NuxtLink
              :to="{
                path: '/cine/search/peliculas',
                query: { productora: pelicula.Productora },
              }"
              class="enlace-card"
            >
              {{ getProductoraNombre(pelicula.Productora) }}
            </NuxtLink>
          </li>
        </ul>

        <p class="tarjeta-pelicula__descripcion">{{ pelicula.Descripcion }}</p>
        <button class="boton-comprar" @click="onComprar(pelicula)">
          🛒 Comprar ${{ pelicula.Precio }}
        </button>
      </div>
    </div>

    <p v-if="peliculasFiltradas.length === 0" class="peliculas-vacio">
      ⚠️ No hay películas para este filtro
    </p>
  </div>
</template>

<script>
export default {
  name: "peliculas",
  props: {
    items: { type: Object, required: true },
    directorId: { type: String, default: null },
    productoraId: { type: String, default: null },
  },
  computed: {
    peliculasFiltradas() {
      let lista = this.items.peliculas;

      if (this.directorId) {
        lista = lista.filter((p) => p.Director === this.directorId);
      }

      if (this.productoraId) {
        lista = lista.filter((p) => p.Productora === this.productoraId);
      }

      return lista;
    },
  },
  methods: {
    getDirectorNombre(id) {
      const dir = this.items.directores.find((d) => d.Identificacion === id);
      return dir ? dir.Nombre : "Desconocido";
    },
    getProductoraNombre(id) {
      const prod = this.items.productoras.find((p) => p.Identificacion === id);
      return prod ? prod.Nombre : "Desconocida";
    },
    async onComprar(pelicula) {
      try {
        // 1) Esperar a que Snipcart esté disponible (polling seguro)
        if (
          !window.Snipcart ||
          !window.Snipcart.api ||
          !window.Snipcart.api.cart ||
          !window.Snipcart.api.cart.items
        ) {
          await new Promise((resolve, reject) => {
            let tries = 0;
            const maxTries = 20;
            const iv = setInterval(() => {
              tries++;
              if (
                window.Snipcart &&
                window.Snipcart.api &&
                window.Snipcart.api.cart &&
                window.Snipcart.api.cart.items
              ) {
                clearInterval(iv);
                return resolve();
              }
              if (tries >= maxTries) {
                clearInterval(iv);
                return reject(
                  new Error("Snipcart no está disponible (script no cargado)")
                );
              }
            }, 100);
          });
        }

        // 2) Construir el producto (sanitize / fallback)
        const price = Number(pelicula.Precio);
        const product = {
          id: String(pelicula.Titulo), // id único
          name: pelicula.Titulo.replace(/_/g, " "),
          price: Number.isFinite(price) ? price : 0,
          url: `${window.location.origin}/cine/peliculas/${encodeURIComponent(
            pelicula.Titulo
          )}`,
          image: `/images/peliculas/${pelicula.Titulo.replace(
            /\s+/g,
            "_"
          )}.jpg`,
          description: pelicula.Descripcion || "",
          quantity: 1,
        };

        // 3) Añadir al carrito usando la API de Snipcart v3
        await window.Snipcart.api.cart.items.add(product);

        // 4) Abrir el carrito (distintos puntos de acceso según versión)
        try {
          if (
            window.Snipcart.api &&
            window.Snipcart.api.theme &&
            window.Snipcart.api.theme.cart
          ) {
            window.Snipcart.api.theme.cart.open();
          } else if (
            window.Snipcart.api &&
            window.Snipcart.api.cart &&
            window.Snipcart.api.cart.open
          ) {
            window.Snipcart.api.cart.open();
          }
        } catch (e) {
          // No crítico: sólo intentamos abrir el carrito
          // console.warn("No se pudo abrir el carrito automáticamente", e);
        }

        console.log("Producto añadido al carrito:", product.id);
      } catch (err) {
        console.error("Error al agregar producto al carrito Snipcart:", err);
      }
    },
  },
};
</script>

<style scoped>
.boton-comprar {
  width: 100%;
  margin-top: auto;
  padding: 0;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  transition: background 0.2s ease, transform 0.15s ease;
}

.boton-comprar:hover {
  background: #0d47a1;
  transform: translateY(-2px);
}

.boton-comprar:active {
  transform: translateY(0);
}

.contenedor-peliculas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* Card */
.tarjeta-pelicula {
  background: #ffffff;
  border: 1px solid #0f172a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}
.tarjeta-pelicula:hover {
  transform: translateY(-5px);
}

/* Imagen */
.tarjeta-pelicula__imagen-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.tarjeta-pelicula__imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Contenido */
.tarjeta-pelicula__contenido {
  padding: 0.9rem 1rem 1.2rem;
}

.tarjeta-pelicula__titulo {
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
  color: #0f172a;
  text-align: center;
}

.tarjeta-pelicula__detalles {
  list-style: none;
  padding: 0;
  margin: 0 0 0.6rem;
  font-size: 1rem;
  color: #333;
}
.tarjeta-pelicula__detalles li {
  margin-bottom: 4px;
}

/* Descripción */
.tarjeta-pelicula__descripcion {
  font-size: 0.85rem;
  color: #555;
  margin-top: 0.4rem;
  line-height: 1.4;
}

/* Enlaces */
.enlace-card {
  color: #1565c0;
  text-decoration: none;
  font-weight: 500;
}
.enlace-card:hover {
  text-decoration: underline;
  color: #0d47a1;
}

/* Vacío */
.peliculas-vacio {
  grid-column: 1/-1;
  text-align: center;
  color: #d84315;
  font-style: italic;
  margin-top: 1rem;
}
</style>
