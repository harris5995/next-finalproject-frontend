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
      justify-content: center;
      align-items: center;
      height: 100vh; /* Set the container height to the full viewport height */
    }
  
    .grid {
      display: grid;
      grid-template-columns: repeat(2, var(--square-width, 100px));
      grid-template-rows: repeat(2, var(--square-height, 100px));
      gap: 10px;
    }
  
    .square {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
    }
  </style>


<h1 class=justify-center>My Closet</h1>

<a href="/outfit" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
  My Outfit
</a>
  
  <div class="container">
    <div class="grid">
      {#each links as link, index}
        <a href={link} class="square" key={index}>
          <p>{texts[index]}</p>
        </a>
      {/each}
    </div>
  </div>