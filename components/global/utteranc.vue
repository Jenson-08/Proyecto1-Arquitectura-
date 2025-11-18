<template>
  <div ref="comments"></div>
</template>

<script>
export default {
  mounted() {
    this.loadUtterances();
  },

  watch: {
    $route() {
      this.loadUtterances();
    },
  },

  methods: {
    issueKey() {
      const route = this.$route;

      const slug = route.query.slug || "general";
      const director = route.query.director || "no-director";
      const productora = route.query.productora || "no-productora";

      return `detalle-${slug}-${director}-${productora}`;
    },

    loadUtterances() {
      const container = this.$refs.comments;
      if (!container) return;

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
