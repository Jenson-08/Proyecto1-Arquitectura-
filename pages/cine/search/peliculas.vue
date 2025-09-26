<template>
  <div class="pagina-general">
    <RenderizadorGeneral
      :marca="marca"
      :data="data"
      :director="directorObj"
      :productora="productoraObj"
    />
  </div>
</template>

<script>
import collections from "@/utils/peliculas_terror.json";
import RenderizadorGeneral from "@/components/global/RenderizadorGeneral.vue";

export default {
  components: { RenderizadorGeneral },

  async asyncData({ query }) {
    return {
      marca: "Peliculas", // string: "Peliculas" | "Directores" | "Productoras"
      data: collections || [], // array de registros
      // Si existe, lo parsea de JSON, si no queda null
      directorObj: query.director ? JSON.parse(decodeURIComponent(query.director)) : null,
      productoraObj: query.productora ? JSON.parse(decodeURIComponent(query.productora)) : null,
    };
  },
};
</script>

<style scoped>
.pagina-general {
  padding: 2rem;
}
</style>
