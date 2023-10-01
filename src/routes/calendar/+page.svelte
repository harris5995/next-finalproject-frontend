<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
  import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
  export let data;
  import { onMount } from 'svelte';

  function filterOutfitsByUser () {
      const userId = getUserId();
      data.outfits = data.outfits.filter((outfits) => outfits.user_id === userId);
    }
onMount(filterOutfitsByUser);

</script>

<div id="outfits-list" class="flex flex-wrap justify-center">

  {#each data.outfits as outfits}
    <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
        <a class="font-bold text-2xl" href="/outfits/{outfits.id}">{outfits.date}</a>

 

      </div>
  {/each}
  </div>