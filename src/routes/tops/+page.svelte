    <script>
      import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
      import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
      import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
      export let data;
    
      
  function filterTopsByUser () {
      const userId = getUserId();
      data.tops = data.tops.filter((top) => top.user_id === userId);
    }
onMount(filterTopsByUser);

      export function selectTop(tops) {
        sessionStorage.clear
        sessionStorage.setItem("tops", tops)
        console.log(tops)
      }

      let filtering = false;

// Define a variable to store the filtered tops
let filteredTops = [];

// Define a variable to keep track of the selected color
let selectedColor = '';



// Function to filter tops by color
function filterByColor() {
  if (selectedColor === '') {
    // If no color is selected, reset the filter to show all tops
    filtering = false;
    filteredTops = [];
  } else {
    // If a color is selected, filter the tops by that color
    filtering = true;
    filteredTops = data.tops.filter(tops => tops.color === selectedColor);
  }
}
</script>

<select bind:value={selectedColor}>
  <option value="">All Colors</option>
  <option value="white">White</option>
  <option value="black">Black</option>
  <option value="blue">Blue</option>
  <!-- Add more color options as needed -->
</select>



  
    <a href="/tops/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
      Upload New Top
    </a>

    <button class="btn" on:click={filterByColor}>Apply Filter</button>


    <div id="tops-list" class="flex flex-wrap">
      {#each (filtering ? filteredTops : data.tops) as tops}
        <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
        <button class="btn" on:click={() => selectTop(tops.name)}>Select</button>
          <a class="font-bold text-2xl" href="/tops/{tops.id}">{tops.name}</a>
          <img class="max-w-xs max-h-xs mx-auto mb-2" src={tops.url} alt={tops.url} />
          <p>{tops.description}</p>
          <p>{tops.brand}</p>
          <p>{tops.color}</p>
          <p>{tops.size}</p>
          <p>{tops.occasion}</p>
          <p>{tops.material}</p>
        </div>
  {/each}
</div>

