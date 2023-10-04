<script>
	import { getUserId, LoggedIn } from '../../../lib/auth.js';
    import { getTokenFromLocalStorage } from '../../../lib/auth.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;

    const selectedTops = data.outfits.tops_id
    const selectedBottoms = data.outfits.bottoms_id
    const selectedShoes = data.outfits.shoes_id
    const selectedAccs = data.outfits.accs_id

  
    
    const filteredTops = data.tops.filter(item => item.id === selectedTops);
    const filteredBottoms = data.bottoms.filter(item => item.id === selectedBottoms);
    const filteredShoes = data.shoes.filter(item => item.id === selectedShoes);
    const filteredAccs = data.accs.filter(item => item.id === selectedAccs);

    console.log("Selected Shoes ID:", selectedShoes);
    console.log("Filtered Shoes:", filteredShoes);

    function deleteOutfit() {
        const confirmDelete = confirm('Are you sure you want to delete this outfit?');

        if (confirmDelete) {
            // Make a DELETE request to your backend API to delete the outfit
            fetch(`${PUBLIC_BACKEND_BASE_URL}/outfits/${data.outfits.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            .then(response => {
                if (response.ok) {
                    // Redirect or update the UI as needed after successful deletion
                    goto('/calendar'); // Change this to your desired destination
                } else {
                    // Handle error response
                    console.error('Failed to delete outfit');
                }
            })
            .catch(error => {
                console.error('Error deleting outfit:', error);
            });
        }
    }

    function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  $: formattedDate = formatDate(data.outfits.date);
    
    </script>  

<style>
    #outfits-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
  
    #outfits-list-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      max-width: 800px;
      margin-top: 20px;
    }
  
    .outfit-item {
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;
    }
  
    #delete-button-container {
      position: absolute;
      top: 150px;
      right: 20px;
    }
  </style>
  
  <div id="outfits-container">
    <div class="p-4 m-4 text-center flex-shrink-0">
      <a class="font-bold text-2xl" href="/outfits/{data.outfits.id}">{formattedDate}</a>
    </div>
  
    {#if filteredTops.length > 0 || filteredBottoms.length > 0 || filteredShoes.length > 0 || filteredAccs.length > 0}

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each filteredTops as tops}
      <div class="border border-gray-300 p-4 text-center">
        <a class="font-bold text-lg" href="/tops/{tops.id}">{tops.name}</a>
        <img class="max-w-xs max-h-xs mx-auto my-2" src={tops.url} alt={tops.url} />
      </div>
      {/each}
    
      {#each filteredBottoms as bottoms}
      <div class="border border-gray-300 p-4 text-center">
        <a class="font-bold text-lg" href="/bottoms/{bottoms.id}">{bottoms.name}</a>
        <img class="max-w-xs max-h-xs mx-auto my-2" src={bottoms.url} alt={bottoms.url} />
      </div>
      {/each}
    
      {#each filteredShoes as shoes}
      <div class="border border-gray-300 p-4 text-center">
        <a class="font-bold text-lg" href="/shoes/{shoes.id}">{shoes.name}</a>
        <img class="max-w-xs max-h-xs mx-auto my-2" src={shoes.url} alt={shoes.url} />
      </div>
      {/each}
    
      {#each filteredAccs as accs}
      <div class="border border-gray-300 p-4 text-center">
        <a class="font-bold text-lg" href="/accs/{accs.id}">{accs.name}</a>
        <img class="max-w-xs max-h-xs mx-auto my-2" src={accs.url} alt={accs.url} />
      </div>
      {/each}
    </div>
  
    {:else}
    <p>No clothing item selected.</p>
    {/if}
  
    <!-- Delete Outfit button moved outside the container -->
    <div id="delete-button-container">
      <button on:click={deleteOutfit} class="mt-2 bg-red-500 text-white px-4 py-2 rounded">Delete Outfit</button>
    </div>
  </div>