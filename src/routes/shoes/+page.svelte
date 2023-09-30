<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { getTokenFromLocalStorage,getUserId } from '../../lib/auth.js';
    export let data;
  
    function filterShoesByUser () {
      const userId = getUserId();
      data.shoes = data.shoes.filter((shoe) => shoe.user_id === userId);
    }
onMount(filterShoesByUser);  
    export function selectTop(shoes) {
      sessionStorage.clear
sessionStorage.setItem("shoes", shoes)
console.log(shoes)
    }

    // const top = sessionStorage.getItem()


</script>




  <a href="/shoes/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
    Upload New Shoes
  </a>


<div id="shoes-list" class="flex flex-wrap justify-center">

{#each data.shoes as shoes}
    <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
      <button class="btn" on:click={() => selectTop(shoes.name)}>Select</button>
        <a class="font-bold text-2xl" href="/shoes/{shoes.id}">{shoes.name}</a>
        <img class="max-w-xs max-h-xs mx-auto mb-2" src={shoes.url} alt={shoes.url} />
        <p>{shoes.description}</p>
        <p>{shoes.brand}</p>
        <p>{shoes.color}</p>
        <p>{shoes.size}</p>
        <p>{shoes.occasion}</p>
        <p>{shoes.material}</p>
      </div>
{/each}
</div>

