    <script>
      import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
      import { getTokenFromLocalStorage } from '../../lib/auth.js';
      import { goto } from '$app/navigation';
      export let data;
    
      
      export function selectTop(tops) {
        sessionStorage.clear
        sessionStorage.setItem("tops", tops)
        console.log(tops)
      }

      // const top = sessionStorage.getItem()

      // Modify the selectTop function to store the selected top in session storage
  // export function selectTop(tops) {
  // Store the selected top in session storage
    // sessionStorage.setItem("selectedTop", JSON.stringify(tops));

  // Navigate to the new page
    // goto('/outfit');
// }


  </script>



  
    <a href="/tops/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
      Upload New Top
    </a>


<div id="tops-list" class="flex flex-wrap">
  
  {#each data.tops as tops}
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

