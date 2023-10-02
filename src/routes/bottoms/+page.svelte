<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
  import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
  export let data;
  import { onMount } from 'svelte';

  function filterBottomsByUser () {
      const userId = getUserId();
      data.bottoms = data.bottoms.filter((bottom) => bottom.user_id === userId);
    }
onMount(filterBottomsByUser);
  
  export function selectBottoms(bottoms) {
    sessionStorage.clear
    sessionStorage.setItem("bottoms", bottoms)
    console.log(bottoms)
  }

  // const top = sessionStorage.getItem()

</script>

<a href="/bottoms/new" class="px-6 py-3 rounded-full text-lg btn-primary">
  Upload New Bottom
</a>


<div id="bottoms-list" class="flex flex-wrap justify-center">

{#each data.bottoms as bottoms}
  <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
    <button class="btn" on:click={() => selectBottoms(bottoms.name)}>Select</button>
      <a class="font-bold text-2xl" href="/bottoms/{bottoms.id}">{bottoms.name}</a>
      <img class="max-w-xs max-h-xs mx-auto mb-2" src={bottoms.url} alt={bottoms.url} />
      <p>{bottoms.description}</p>
      <p>{bottoms.brand}</p>
      <p>{bottoms.color}</p>
      <p>{bottoms.size}</p>
      <p>{bottoms.occasion}</p>
      <p>{bottoms.material}</p>
    </div>
{/each}
</div>

