<template>
  <div class="pagina-general">
    <RenderizadorGeneral :marca="marca" :data="data" />
  </div>
</template>

<script>
import collections from "@/utils/peliculas_terror.json";
import RenderizadorGeneral from "@/components/global/RenderizadorGeneral.vue";

export default {
  components: { RenderizadorGeneral },

  async asyncData({ params }) {
    return {
      marca: params.marca, // string: "Peliculas" | "Directores" | "Productoras"
      data: collections || [], // array de registros
    };
  },
};
</script>

<style scoped>
.pagina-general {
  padding: 2rem;
}
</style>
