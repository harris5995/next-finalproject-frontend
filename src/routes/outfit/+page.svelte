<script>
export let data;

const selectedTops = sessionStorage.getItem("tops");
const selectedBottoms = sessionStorage.getItem("bottoms");
const selectedShoes = sessionStorage.getItem("shoes");
const selectedAccs = sessionStorage.getItem("accs")

// console.log(selectedTops)

// console.log("data tops: " + data.tops[1].name)
const filteredTops = data.tops.filter(item => item.name === selectedTops);
const filteredBottoms = data.bottoms.filter(item => item.name === selectedBottoms);
const filteredShoes = data.shoes.filter(item => item.name === selectedShoes);
const filteredAccs = data.accs.filter(item => item.name === selectedAccs);
console.log(data)

// console.log(data.bottoms[0].name)

  function clearSessionStorage() {
    sessionStorage.removeItem("selectedTops");
    sessionStorage.removeItem("selectedBottoms");
    sessionStorage.removeItem("selectedShoes");
    sessionStorage.removeItem("selectedAccs");
    sessionStorage.clear();
    location.reload(true);
  }

  </script>
  
  <h1 class="text-2xl font-bold mb-4">Selected Outfit</h1>

<button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
on:click={clearSessionStorage}>Clear Selection</button>

{#if filteredTops.length > 0 || filteredBottoms.length > 0 || filteredShoes.length > 0 || filteredAccs.length > 0}

  <div class="grid grid-cols-2 gap-4">
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