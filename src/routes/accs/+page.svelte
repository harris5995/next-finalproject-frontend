<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
    import { goto } from '$app/navigation';
    export let data;
  
    function filterAccsByUser () {
      const userId = getUserId();
      data.accs = data.accs.filter((acc) => acc.user_id === userId);
    }
onMount(filterAccsByUser);
    export function selectAccs(accs) {
      sessionStorage.clear
      sessionStorage.setItem("accs", accs)
      console.log(accs)
    }

    // const top = sessionStorage.getItem()

    // Modify the selectTop function to store the selected top in session storage
// export function selectTop(accs) {
// Store the selected top in session storage
  // sessionStorage.setItem("selectedTop", JSON.stringify(accs));

// Navigate to the new page
  // goto('/outfit');
// }


</script>




  <a href="/accs/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
    Upload New Accessory
  </a>


<div id="accs-list" class="flex flex-wrap">

{#each data.accs as accs}
    <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
      <button class="btn" on:click={() => selectAccs(accs.name)}>Select</button>
        <a class="font-bold text-2xl" href="/accs/{accs.id}">{accs.name}</a>
        <img class="max-w-xs max-h-xs mx-auto mb-2" src={accs.url} alt={accs.url} />
        <p>{accs.description}</p>
        <p>{accs.brand}</p>
        <p>{accs.color}</p>
        <p>{accs.size}</p>
        <p>{accs.occasion}</p>
        <p>{accs.material}</p>
      </div>
{/each}
</div>

