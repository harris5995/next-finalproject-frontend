<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  export let data;

  let selectedColor = '';
  let selectedName = '';
  let selectedOccasion = ''; 
  let selectedBrand = '';
  let selectedDescription = '';
  let selectedSize = '';
  let selectedMaterial = '';
  let showSuccessAlert = false; // New variable to control the visibility of the success alert

  function filterShoesByUser() {
  const userId = getUserId();
  data.shoes = data.shoes.filter((shoes) => {
    const colorCondition = !selectedColor || shoes.color.toLowerCase() === selectedColor.toLowerCase();
    const nameCondition = !selectedName || shoes.name.toLowerCase().includes(selectedName.toLowerCase());
    const occasionCondition = !selectedOccasion || shoes.occasion.toLowerCase() === selectedOccasion.toLowerCase();
    const brandCondition = !selectedBrand || shoes.brand.toLowerCase() === selectedBrand.toLowerCase();
    const descriptionCondition = !selectedDescription || shoes.description.toLowerCase().includes(selectedDescription.toLowerCase());
    const sizeCondition = !selectedSize || shoes.size.toLowerCase() === selectedSize.toLowerCase();
    const materialCondition = !selectedMaterial || shoes.material.toLowerCase() === selectedMaterial.toLowerCase();

    return shoes.user_id === userId && colorCondition && nameCondition && occasionCondition && brandCondition && descriptionCondition && sizeCondition && materialCondition;
  });
}
  
  onMount(filterShoesByUser);
  
  export function selectShoes(shoes) {
    sessionStorage.clear();
    sessionStorage.setItem('shoes', shoes);
    console.log(shoes);

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
  selectedOccasion = '';
  selectedBrand = '';
  selectedDescription = '';
  selectedSize = '';
  selectedMaterial = '';
  filterShoesByUser();
  location.reload();
}
</script>

<div class="flex">
  <!-- Left side: Search bar -->


  <div id="search-bar" class="p-4 rounded-md justify-center w-1/6" style="background-color:#000000; padding: 10px; border: 1px solid #ccc;">
    
    <div>

      <div class="mb-6 mt-4">
      <a href="/shoes/new" class="px-5 py-3 mb-10 rounded-full text-base btn-primary ">
        Upload New Footwear
      </a>
    </div>
    
      
    <div class="mb-4">
      <input class="input" bind:value={selectedName} placeholder="Search By Name" />
    </div>
    
    <div class="mb-4">
      <input class="input" bind:value={selectedBrand} placeholder="Search By Brand" />
    </div>

    <div class="mb-4">
      <input class="input" bind:value={selectedColor} placeholder="Search By Color" />
    </div>

    <div class="mb-4">
      <input class="input" bind:value={selectedDescription} placeholder="Search By Description" />
    </div>

    <div class="mb-4">
      <input class="input" bind:value={selectedMaterial} placeholder="Search By Material" />
    </div>
    
    <div class="mb-4">
      <input class="input" bind:value={selectedOccasion} placeholder="Search By Occasion" />
    </div>
      
    <div class="mb-4">
        <input class="input" bind:value={selectedSize} placeholder="Search By Size" />
      </div>



    </div>

    <div class="flex items-center">
      <button class="btn-primary rounded-full px-4 py-2 text-lg mr-2" on:click={filterShoesByUser}>Search</button>
      <button class="btn-primary rounded-full px-4 py-2 text-lg" on:click={resetFilter}>Reset</button>
    </div>
  </div>

  <!-- Right side: Tops list -->
  <div id="shoes-list" class="ml-10 grid grid-cols-3 gap-4 w-3/4 mt-4">
    {#each data.shoes as shoes}
      <div class="border border-gray-300 p-4 text-center flex-shrink-0">
        <button class="btn" on:click={() => selectShoes(shoes.name)}>Select</button>
        <a class="font-bold text-2xl block mt-2" href="/shoes/{shoes.id}">{shoes.name}</a>
        <img class="w-32 h-32 mx-auto mb-2" src={shoes.url} alt={shoes.url} />
        <p>{shoes.description}</p>
        <p>{shoes.brand}</p>
        <p>{shoes.color}</p>
        <p>{shoes.size}</p>
        <p>{shoes.occasion}</p>
        <p>{shoes.material}</p>
      </div>
    {/each}
  </div>


  <!-- Success alert -->
  {#if showSuccessAlert}
  <div class="fixed top-1/10 left-1/2 transform  p-4 bg-green-500 text-white max-w-2xl mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="inline-block align-middle">Clothing item has been selected</span>
  </div>
{/if}
</div>
















