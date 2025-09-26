<template>
  <div class="u-wrapper-xenon">
    <h3 class="u-heading-eldritch">Directores</h3>

    <ul class="u-list-nebula">
      <li v-for="d in items" :key="d.Identificacion" class="card-director">
        <!-- Imagen -->
        <div class="card-director__imagen-wrapper">
          <img
            class="card-director__imagen"
            :src="`/images/directores/${d.Identificacion.replace(/\s+/g, '_')}.jpg`"
            :alt="`Foto de ${d.Nombre}`"
          />
        </div>

        <!-- Contenido -->
        <div class="card-director__contenido">
          <span class="u-emphasis-cryptic">{{ d.Nombre }}</span>
          <p class="card-director__info">
            {{ d.Nacionalidad }}
            <span class="u-desc-phantasm">(Nacido: {{ d.Fecha_nacimiento }})</span>
          </p>

          <NuxtLink
            :to="{ path: '/cine/search/peliculas', query: { director: d.Identificacion } }"
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
  name: "Directores",
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

/* Lista de tarjetas */
.u-list-nebula {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.2rem;
}

/* Tarjeta de director */
.card-director {
  background: #1f2937;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}
.card-director:hover {
  transform: translateY(-5px);
  background: #374151;
}

/* Imagen */
.card-director__imagen-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.card-director__imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Contenido */
.card-director__contenido {
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

.card-director__info {
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
