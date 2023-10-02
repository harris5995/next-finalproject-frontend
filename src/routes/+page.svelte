<script>
  import BackgroundCircles from './background.svelte';
  import { isDarkMode } from "../utils/darkModeStore";

  let texts = ["tops", "bottoms", "shoes", "accessories"];
  let links = [
    "http://127.0.0.1:5173/tops",
    "http://127.0.0.1:5173/bottoms",
    "http://127.0.0.1:5173/shoes",
    "http://127.0.0.1:5173/accs"
  ];


  function toggleDarkMode() {
    const currentDarkModeValue = $isDarkMode;
    isDarkMode.update(value => !value);
    document.body.classList.toggle("dark", currentDarkModeValue); // Pass a boolean value to toggle
  }
</script>

<style>

  .container {
    display: flex;
    justify-content: center; /* Center the grid horizontally */
    align-items: center; /* Center the grid vertically */
    height: 100vh; /* Set the container height to the full viewport height */
    margin-left: 115px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, var(--square-width));
    grid-template-rows: repeat(2, var(--square-height));
    gap: 20px;
    justify-content: flex-end;
  }

  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    color: #e2d3d3;
    background-color: #677155;
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background-color 0.3s, transform 0.2s;
  }

  .square:hover {
      background-color: #B7410E;
      color: #b9e7c8;
    }

  /* .dark-square {
      background-color: #711c1c; 
      color: #fff; 
} */

  :root {
    --square-width: 300px;
    --square-height: 300px;
  }

  .text-center h1 {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  text-transform:uppercase;
  font-size:26px; letter-spacing:1px;
  
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 16px 0;
  grid-gap: 15px;
}

.text-center h1:after,.text-center h1:before {
  content: " ";
  display: block;
  border-bottom: 2px solid #ccc;
}

</style>


<div class="text-center">
  <h1 style="text-decoration: none; font-size: 30px; font-weight: bold; color: #806919; text-transform: uppercase; margin: 15px 0 0 0 ; padding: 10px 20px; border-radius: 5px;">My Closet</h1>
</div>


<div class="container">
  <div class="grid">
    {#each links as link, index}
      <a href={link} class="square {isDarkMode ? 'dark-square' : ''}" key={index}>
        <p>{texts[index]}</p>
      </a>
    {/each}
  </div>
</div>

<BackgroundCircles {texts} {links} />

<!-- <div class="text-center">
  <a href="/outfit" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
    My Outfit
  </a>
</div> -->




