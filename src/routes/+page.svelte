<script>
  let texts = ["tops", "bottoms", "shoes", "accessories"];
  let links = [
    "http://127.0.0.1:5173/tops",
    "http://127.0.0.1:5173/bottoms",
    "http://127.0.0.1:5173/shoes",
    "http://127.0.0.1:5173/accs"
  ];
</script>

<style>
  .container {
    display: flex;
    justify-content: center; /* Center the grid horizontally */
    align-items: center; /* Center the grid vertically */
    height: 100vh; /* Set the container height to the full viewport height */
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, var(--square-width));
    grid-template-rows: repeat(2, var(--square-height));
    gap: 10px;
  }

  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
  }

  :root {
    --square-width: 200px;
    --square-height: 200px;
  }
</style>

<h1 class="text-center">My Closet</h1>



<div class="container">
  <div class="grid">
    {#each links as link, index}
      <a href={link} class="square" key={index}>
        <p>{texts[index]}</p>
      </a>
    {/each}
  </div>
</div>





