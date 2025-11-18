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
      const path = this.$route.path.toLowerCase();
      const query = JSON.stringify(this.$route.query || {});

      const base = `${path}__${query}`;

      let hash = 0;
      for (let i = 0; i < base.length; i++) {
        hash = (hash << 5) - hash + base.charCodeAt(i);
        hash |= 0;
      }

      return `page-${Math.abs(hash)}`;
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
