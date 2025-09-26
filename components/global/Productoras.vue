<template>
  <div class="u-wrapper-xenon">
    <h3 class="u-heading-eldritch">Productoras</h3>

    <ul class="u-list-nebula">
      <li v-for="p in items" :key="p.Identificacion" class="card-productora">
        <!-- Imagen -->
        <div class="card-productora__imagen-wrapper">
          <img
            class="card-productora__imagen"
            :src="`/images/productoras/${p.Identificacion.replace(/\s+/g, '_')}.jpg`"
            :alt="`Logo de ${p.Nombre}`"
          />
        </div>

        <!-- Contenido -->
        <div class="card-productora__contenido">
          <span class="u-emphasis-cryptic">{{ p.Nombre }}</span>
          <p class="card-productora__info">
            {{ p.Pais_origen }}
            <span class="u-desc-phantasm">(Fundada: {{ p.Annio_fundacion }})</span>
          </p>

          <NuxtLink
            :to="{ path: '/cine/search/peliculas', query: { productora: p.Identificacion } }"
            class="btn-enlace"
          >
            🎬 Ver películas
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Productoras",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.u-wrapper-xenon {
  padding: 20px;
  background: #111827;
  color: #f9fafb;
  border-radius: 12px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.u-heading-eldritch {
  font-size: 1.6rem;
  margin-bottom: 12px;
  color: #f87171;
  text-align: center;
  text-shadow: 1px 1px 2px #000;
}

/* Grid de tarjetas */
.u-list-nebula {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.2rem;
}

/* Tarjeta */
.card-productora {
  background: #1f2937;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}
.card-productora:hover {
  transform: translateY(-5px);
  background: #374151;
}

/* Imagen */
.card-productora__imagen-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-productora__imagen {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}

/* Contenido */
.card-productora__contenido {
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.u-emphasis-cryptic {
  font-weight: bold;
  font-size: 1.1rem;
  color: #34d399;
  margin-bottom: 6px;
}

.card-productora__info {
  font-size: 0.9rem;
  margin: 4px 0 10px;
  color: #e5e7eb;
}

.u-desc-phantasm {
  display: block;
  margin-top: 2px;
  font-size: 0.8rem;
  color: #9ca3af;
}

/* Botón/enlace */
.btn-enlace {
  display: inline-block;
  margin-top: auto;
  padding: 6px 12px;
  font-size: 0.85rem;
  background: #2563eb;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}
.btn-enlace:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}
</style>
