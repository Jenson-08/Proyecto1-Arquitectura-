<template>
  <div ref="comments"></div>
</template>

<script>
export default {
  mounted() {
    this.loadUtterances();
  },

  watch: {
    // Cuando cambie la ruta → recargar comentarios sin duplicar
    $route() {
      this.loadUtterances();
    },
  },

  methods: {
    // Genera un issue único por página
    issueKey() {
      const route = this.$route;

      // Página general → /cine/:marca
      if (route.params && route.params.marca) {
        return `general-${route.params.marca}`;
      }

      // Página de detalle → usa slug + director/productora
      const slug = route.query.slug || "default";

      let director = "nd";
      let productora = "np";

      if (route.query.director) {
        try {
          director = JSON.parse(decodeURIComponent(route.query.director)).id;
        } catch {}
      }

      if (route.query.productora) {
        try {
          productora = JSON.parse(
            decodeURIComponent(route.query.productora)
          ).id;
        } catch {}
      }

      return `detalle-${slug}-${director}-${productora}`;
    },

    loadUtterances() {
      const container = this.$refs.comments;

      if (!container) return;

      // Limpia instancia previa → evita comentarios duplicados
      container.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.async = true;
      script.crossorigin = "anonymous";
      script.setAttribute("repo", "Jenson-08/Proyecto1-Arquitectura-");
      script.setAttribute("issue-term", this.issueKey());
      script.setAttribute("theme", "github-dark");
      script.setAttribute("label", "comments");

      container.appendChild(script);
    },
  },
};
</script>
