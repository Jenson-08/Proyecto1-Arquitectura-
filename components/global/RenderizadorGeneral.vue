<template>
  <div class="renderizador-caja">
    <!-- Renderiza Películas -->
    <div v-if="marca === 'Peliculas'">
      <h2 class="renderizador-titulo">
        <template v-if="director">
          Películas del Director {{ director.Nombre }}
          
        </template>
        <template v-else-if="productora">
          Películas de la Productora {{ productora.Nombre }}
        </template>
        <template v-else> Listado de Películas </template>
      </h2>

 <!-- 🔹 Botón Volver dinámico -->
      <div v-if="director || productora" class="volver-wrapper">
        <NuxtLink
          v-if="director"
          to="/cine/Directores"
          class="btn-volver"
        >
          ← Volver a Directores
        </NuxtLink>
        <NuxtLink
          v-else-if="productora"
          to="/cine/Productoras"
          class="btn-volver"
        >
          ← Volver a Productoras
        </NuxtLink>
      </div>



      <Peliculas
        :key="$route.fullPath"
        :items="data"
        :directorId="$route.query.director"
        :productoraId="$route.query.productora"
      />
    </div>

    <!-- Renderiza Directores -->
    <div v-else-if="marca === 'Directores'">
      <h2 class="renderizador-titulo"></h2>
      <Directores :items="data[marca]" />
    </div>

    <!-- Renderiza Productoras -->
    <div v-else-if="marca === 'Productoras'">
      <h2 class="renderizador-titulo">Listado de Productoras</h2>
      <Productoras :items="data[marca]" />
    </div>

    <!-- Caso no reconocido -->
    <div v-else>
      <p class="renderizador-aviso">⚠️ No se reconoce el tipo de datos</p>
    </div>
  </div>
</template>

<script>
import Peliculas from "@/components/global/Peliculas.vue";
import Directores from "@/components/global/Directores.vue";
import Productoras from "@/components/global/Productoras.vue";

export default {
  name: "RenderizadorGeneral",
  props: {
    marca: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  components: {
    Peliculas,
    Directores,
    Productoras,
  },
 computed: {
    director() {
      const id = this.$route.query.director;
      return id
        ? this.data.Directores.find((d) => d.Identificacion === id)
        : null;
    },
    productora() {
      const id = this.$route.query.productora;
      return id
        ? this.data.Productoras.find((p) => p.Identificacion === id)
        : null;
    },
  },

};
</script>

<style scoped>
.renderizador-caja {
  border: 2px dashed #0f172a90;
  padding: 1.5rem;
  border-radius: 12px;
  background: #0f172a90;
}

.renderizador-titulo {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #ffffff;
  text-align: center;
}

.renderizador-aviso {
  text-align: center;
  font-style: italic;
  color: #d32f2f;
}
</style>
