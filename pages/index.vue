<template>
  <div class="main-categorias">
    <h1 class="main-titulo">Explora el Mundo del Cine</h1>

    <div class="categorias-grid">
      <!-- Películas -->
      <NuxtLink to="/cine/Peliculas" class="card-categoria">
        <img class="card-categoria__imagen" src="/images/peliculas/mainpage.jpg" alt="Películas" />
        <div class="card-categoria__contenido">
          <h2>Películas</h2>
          <p>Explora todas las películas disponibles.</p>
          <span class="btn-enlace">Ver Películas →</span>
        </div>
      </NuxtLink>

      <!-- Directores -->
      <NuxtLink to="/cine/Directores" class="card-categoria">
        <img class="card-categoria__imagen" src="/images/directores/mainpage.jpg" alt="Directores" />
        <div class="card-categoria__contenido">
          <h2>Directores</h2>
          <p>Explora todos los directores.</p>
          <span class="btn-enlace">Ver Directores →</span>
        </div>
      </NuxtLink>

      <!-- Productoras -->
      <NuxtLink to="/cine/Productoras" class="card-categoria">
        <img class="card-categoria__imagen" src="/images/productoras/mainpage.jpg" alt="Productoras" />
        <div class="card-categoria__contenido">
          <h2>Productoras</h2>
          <p>Explora todas las productoras.</p>
          <span class="btn-enlace">Ver Productoras →</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.main-categorias {
  padding: 3rem 1.5rem;
  background: #0f172a;
  min-height: 100vh;
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-titulo {
  text-align: center;
  font-size: 2.5rem;
  color: #f87171;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 3px #000;
}

/* Grid para las 3 secciones grandes */
.categorias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

/* Tarjeta de categoría grande */
.card-categoria {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.35);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  min-height: 380px;
}
.card-categoria:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
}

/* Imagen de fondo */
.card-categoria__imagen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5);
  z-index: 0;
}

/* Contenido encima de la imagen */
.card-categoria__contenido {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  text-align: center;
}

.card-categoria__contenido h2 {
  font-size: 2rem;
  color: #34d399;
  margin-bottom: 0.5rem;
}

.card-categoria__contenido p {
  font-size: 1rem;
  color: #e5e7eb;
  margin-bottom: 1rem;
}

/* Botón */
.btn-enlace {
  display: inline-block;
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  transition: background 0.2s, transform 0.2s;
}
.btn-enlace:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}
</style>
