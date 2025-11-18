<template>
  <div class="container">
    <HeaderView />

    <div class="row">
      <div class="three columns">
        <img :src="'/images/' + book.image" class="u-max-full-width" />
      </div>

      <div class="six columns">
        <h4>{{ book.title }}</h4>

        <p>
          by
          <NuxtLink :to="'/authors/' + book.authorId">{{
            book.author
          }}</NuxtLink>
        </p>

        <p>Edition: {{ book.edition }} | Pages: {{ book.pages }}</p>

        <h5>Description</h5>
        <p>{{ book.description }}</p>

        <!-- Botón de compra -->
        <button
          class="snipcart-add-item button-primary"
          :data-item-id="book.id"
          :data-item-price="book.price"
          :data-item-description="book.description"
          :data-item-image="'/images/' + book.image"
          :data-item-name="book.title"
        >
          Buy Me!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const book = await $content("books", params.slug).fetch();
    return { book };
  },
};
</script>
