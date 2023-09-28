<script>
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { getTokenFromLocalStorage } from '../../lib/auth.js';
export let data;

const selectedTops = sessionStorage.getItem("tops");
const selectedBottoms = sessionStorage.getItem("bottoms");
const selectedShoes = sessionStorage.getItem("shoes");
const selectedAccs = sessionStorage.getItem("accs")

const filteredTops = data.tops.filter(item => item.name === selectedTops);
const filteredBottoms = data.bottoms.filter(item => item.name === selectedBottoms);
const filteredShoes = data.shoes.filter(item => item.name === selectedShoes);
const filteredAccs = data.accs.filter(item => item.name === selectedAccs);



const getTopsID = filteredTops[0].id
const getBottomsID = filteredBottoms[0].id
const getShoesID = filteredShoes[0].id
const getAccsID = filteredAccs[0].id

 console.log(getTopsID)
 console.log(getBottomsID)
 console.log(getShoesID)
console.log(getAccsID)

// console.log("tops id " +filteredTops[0].id)

function clearSessionStorage() {
    sessionStorage.removeItem("selectedTops");
    sessionStorage.removeItem("selectedBottoms");
    sessionStorage.removeItem("selectedShoes");
    sessionStorage.removeItem("selectedAccs");
    sessionStorage.clear();
    location.reload(true);
  }

function storeDataInSessionStorage(tops, bottoms, shoes, accs) {
  // Store the values in session storage
  sessionStorage.setItem("tops", tops);
  sessionStorage.setItem("bottoms", bottoms);
  sessionStorage.setItem("shoes", shoes);
  sessionStorage.setItem("accs", accs);
}

let selectedDate = ""; // Initialize the selectedDate variable

// Function to handle date selection
function handleDateChange(event) {
  selectedDate = event.target.value;
}

export async function saveOutfit(evt) {
  const accessToken = getTokenFromLocalStorage()
  const outfitData = {
    tops_id: getTopsID,
    bottoms_id: getBottomsID,
    shoes_id: getShoesID,
    accs_id: getAccsID,
    date: evt.target['date'].value,
  };

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/outfits', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(outfitData)
      });

      if (resp.status == 200) {
      
      } else {
      const res = await resp.json();
      if (res.error)
      console.log(res.error)
      formErrors = res.error;
    }
}

  </script>
  
  <h1 class="text-2xl font-bold mb-4">Selected Outfit</h1>

<button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
on:click={clearSessionStorage}>Clear Selection</button>

<button class="bg-blue-500 btn hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
on:click={storeDataInSessionStorage}>Save Outfit</button>

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

  <div>
    <label for="datePicker">Select a date:</label>
    <input
      type="date"
      id="datePicker"
      bind:value={selectedDate}
      on:change={handleDateChange}
    />
    <p>Selected Date: {selectedDate}</p>
  </div>