<script>
    let texts = ["tops", "bottoms", "shoes", "accessories"];
    let links = [
      "http://127.0.0.1:5173/tops",
      "https://example.com/bottoms",
      "https://example.com/shoes",
      "https://example.com/accessories"
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
  
  <div class="container">
    <div class="grid">
      {#each links as link, index}
        <a href={link} class="square" key={index}>
          <p>{texts[index]}</p>
        </a>
      {/each}
    </div>
  </div>