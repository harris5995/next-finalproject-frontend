<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  export let data;

  let selectedColor = '';
  let selectedName = '';
  let selectedOccasion = ''; 
  let showSuccessAlert = false; // New variable to control the visibility of the success alert

  function filterTopsByUser() {
    const userId = getUserId();
    data.tops = data.tops.filter((top) => {
      const colorCondition = !selectedColor || top.color.toLowerCase() === selectedColor.toLowerCase();
      const nameCondition = !selectedName || top.name.toLowerCase().includes(selectedName.toLowerCase());
      const occasionCondition = !selectedOccasion || top.occasion.toLowerCase() === selectedOccasion.toLowerCase();
      return top.user_id === userId && colorCondition && nameCondition && occasionCondition;
    });
  }
  
  onMount(filterTopsByUser);
  
  export function selectTop(tops) {
    sessionStorage.clear();
    sessionStorage.setItem('tops', tops);
    console.log(tops);

    // Set showSuccessAlert to true to display the alert
    showSuccessAlert = true;

    // Hide the alert after a certain period (e.g., 3 seconds)
    setTimeout(() => {
      showSuccessAlert = false;
    }, 3000);
  }
  
  function resetFilter() {
    selectedColor = '';
    selectedName = '';
    selectedOccasion = ''; // Reset the selected occasion
    filterTopsByUser();
    location.reload();
  }
</script>

<div class="flex">
  <!-- Left side: Search bar -->
  <div id="search-bar" class="p-4 bg-gray-100 rounded-md justify-center w-1/6">
    <div class="mb-4">
      <input class="input" bind:value={selectedName} placeholder="Enter name" />
    </div>
    <div class="mb-4">
      <input class="input" bind:value={selectedColor} placeholder="Enter color" />
    </div>
    <div class="mb-4">
      <input class="input" bind:value={selectedOccasion} placeholder="Enter occasion" />
    </div>

    <div class="flex items-center">
      <button class="btn-primary rounded-full px-4 py-2 text-lg mr-2" on:click={filterTopsByUser}>Search</button>
      <button class="btn-primary rounded-full px-4 py-2 text-lg" on:click={resetFilter}>Reset</button>
    </div>
  </div>

  <!-- Right side: Tops list -->
  <div id="tops-list" class="ml-10 grid grid-cols-3 gap-4 w-3/4 mt-4">
    {#each data.tops as tops}
      <div class="border border-gray-300 p-4 text-center flex-shrink-0">
        <button class="btn" on:click={() => selectTop(tops.name)}>Select</button>
        <a class="font-bold text-2xl block mt-2" href="/tops/{tops.id}">{tops.name}</a>
        <img class="max-w-xs max-h-xs mx-auto mb-2" src={tops.url} alt={tops.url} />
        <p class="text-gray-600">{tops.description}</p>
        <p class="text-gray-600">{tops.brand}</p>
        <p class="text-gray-600">{tops.color}</p>
        <p class="text-gray-600">{tops.size}</p>
        <p class="text-gray-600">{tops.occasion}</p>
        <p class="text-gray-600">{tops.material}</p>
      </div>
    {/each}
  </div>

  <!-- Success alert -->
  {#if showSuccessAlert}
  <div class="fixed top-1/10 left-1/3 transform  p-4 bg-green-500 text-white max-w-2xl mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="inline-block align-middle">Clothing item has been selected</span>
  </div>
{/if}
</div>















