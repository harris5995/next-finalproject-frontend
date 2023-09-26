<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { getTokenFromLocalStorage } from '../../lib/auth.js';

  export let data;

  export function selectAccessories(accessories) {
      // Clear sessionStorage
      sessionStorage.clear();

      // Store the selected accessory in sessionStorage
      sessionStorage.setItem("selectedAccessories", JSON.stringify(accessories));

      console.log(accessories);
  }

  // export const context = {
  //   preloads: false
  // };
</script>

<a href="/accessories/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
  Upload New Accessory
</a>

<div id="accessories-list" class="flex flex-wrap">
  {#each data.accessories as accessories}
      <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
          <button class="btn" on:click={() => selectAccessories(accessories)}>Select</button>
          <a class="font-bold text-2xl" href="/accessories/{accessories.id}">{accessories.name}</a>
          <img class="max-w-xs max-h-xs mx-auto mb-2" src={accessories.url} alt={accessories.url} />
          <p>{accessories.description}</p>
          <p>{accessories.brand}</p>
          <p>{accessories.color}</p>
          <p>{accessories.size}</p>
          <p>{accessories.occasion}</p>
          <p>{accessories.material}</p>
      </div>
  {/each}
</div>
