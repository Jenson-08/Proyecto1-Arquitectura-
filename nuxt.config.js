export default {
  modules: ["@nuxt/content"],
  components: true,

  css: [
    "@/assets/css/normalize.css",
    "@/assets/css/skeleton.css",
    "@/assets/css/mystyles.css",
  ],

  app: {
    head: {
      titleTemplate: "%s - Nuxt.js",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Meta description",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "http://fonts.googleapis.com/css?family=Raleway:400,300,600",
        },
      ],
    },
  },
};
