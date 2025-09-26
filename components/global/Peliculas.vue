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
        <h3 class="tarjeta-pelicula__titulo">{{ pelicula.Titulo.replace(/_/g, " ") }}</h3>

        <ul class="tarjeta-pelicula__detalles">
          <li><strong>Año:</strong> {{ pelicula.Annio_estreno }}</li>
          <li><strong>Duración:</strong> {{ pelicula.Duracion }} min</li>
          <li><strong>Clasificación:</strong> {{ pelicula.Clasificacion_edad }}</li>
          <li>
            <strong>Director:</strong>
            <NuxtLink
              :to="{ path: '/cine/search/peliculas', query: { director: pelicula.Director } }"
              class="enlace-card"
            >
              {{ getDirectorNombre(pelicula.Director) }}
            </NuxtLink>
          </li>
          <li>
            <strong>Productora:</strong>
            <NuxtLink
              :to="{ path: '/cine/search/peliculas', query: { productora: pelicula.Productora } }"
              class="enlace-card"
            >
              {{ getProductoraNombre(pelicula.Productora) }}
            </NuxtLink>
          </li>
        </ul>

        <p class="tarjeta-pelicula__descripcion">{{ pelicula.Descripcion }}</p>
      </div>
    </div>

    <p v-if="peliculasFiltradas.length === 0" class="peliculas-vacio">
      ⚠️ No hay películas para este filtro
    </p>
  </div>
</template>

<script>
export default {
  name: "Peliculas",
  props: {
    items: { type: Object, required: true },
    directorId: { type: String, default: null },
    productoraId: { type: String, default: null },
  },
  computed: {
    peliculasFiltradas() {
      let lista = this.items.Peliculas;

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
      const dir = this.items.Directores.find((d) => d.Identificacion === id);
      return dir ? dir.Nombre : "Desconocido";
    },
    getProductoraNombre(id) {
      const prod = this.items.Productoras.find((p) => p.Identificacion === id);
      return prod ? prod.Nombre : "Desconocida";
    },
  },
};
</script>


<style scoped>
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
