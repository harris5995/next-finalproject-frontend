<script>
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { getTokenFromLocalStorage, getUserId } from '../../lib/auth.js';
export let data;

let showSuccessAlert = false;


const selectedTops = sessionStorage.getItem("tops");
const selectedBottoms = sessionStorage.getItem("bottoms");
const selectedShoes = sessionStorage.getItem("shoes");
const selectedAccs = sessionStorage.getItem("accs")

const filteredTops = data.tops.filter(item => item.name === selectedTops);
const filteredBottoms = data.bottoms.filter(item => item.name === selectedBottoms);
const filteredShoes = data.shoes.filter(item => item.name === selectedShoes);
const filteredAccs = data.accs.filter(item => item.name === selectedAccs);

const getTopsID = filteredTops[0]
const getBottomsID = filteredBottoms[0]
const getShoesID = filteredShoes[0]
const getAccsID = filteredAccs[0]


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



let selectedDate = ""; 


function handleDateChange(evt) {
  selectedDate = evt.target.value;
}

export async function saveOutfit(evt) {
  const accessToken = getTokenFromLocalStorage();

  if (!selectedDate) {
    alert('Please select a date before saving the outfit.');
    return; 
  }

  const outfitData = {
    user_id: getUserId(),
    tops: getTopsID,
    bottoms: getBottomsID,
    shoes: getShoesID,
    accs: getAccsID,
    date: selectedDate,
  };

  console.log('Shoes ID:', getShoesID)

  console.log('Outfit Data:', outfitData);

   for (const key in outfitData) {
      if (outfitData[key] === undefined) {
        alert(`Please complete your outfit. You need to select 1 top, 1 bottom, 1 pair of footwear and 1 accessory.`);
        return;
      }}

  try {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/outfits', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(outfitData),
    });

    if (resp.status === 200) {
      showSuccessAlert = true; 
        setTimeout(() => {
          showSuccessAlert = false; 
        }, 3000);
    } else {
      const res = await resp.json();
      if (res.error) {
        console.log(res.error);
      }
    }
  } catch (error) {
    console.error('Error saving outfit:', error);
  }
  
}

  </script>
  
  <h1 class="text-2xl font-bold mb-4 text-center">Selected Outfit</h1>

  <h2 class="text-sm font-bold mb-4 text-center">Please choose a date and then save your outfit.</h2>

  <div class="flex items-center justify-center space-x-4 mb-10"> <!-- Adjusted the justify-between class -->

    <div class="relative max-w-sm">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
      </div>
      <input datepicker type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" id="datePicker" bind:value={selectedDate} on:change={handleDateChange}>
    </div>
    
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={saveOutfit}>Save Outfit</button>
    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" on:click={clearSessionStorage}>Clear Selection</button>
  </div>
  



{#if filteredTops.length > 0 || filteredBottoms.length > 0 || filteredShoes.length > 0 || filteredAccs.length > 0}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each filteredTops as tops}
    <div class="border border-gray-300 p-4 text-center">
      <a class="font-bold text-lg" href="/tops/">{tops.name}</a>
      <img class="max-w-xs max-h-xs mx-auto my-2" src={tops.url} alt={tops.url} />
    </div>
    {/each}
  
    {#each filteredBottoms as bottoms}
    <div class="border border-gray-300 p-4 text-center">
      <a class="font-bold text-lg" href="/bottoms/">{bottoms.name}</a>
      <img class="max-w-xs max-h-xs mx-auto my-2" src={bottoms.url} alt={bottoms.url} />
    </div>
    {/each}
  
    {#each filteredShoes as shoes}
    <div class="border border-gray-300 p-4 text-center">
      <a class="font-bold text-lg" href="/shoes/">{shoes.name}</a>
      <img class="max-w-xs max-h-xs mx-auto my-2" src={shoes.url} alt={shoes.url} />
    </div>
    {/each}
  
    {#each filteredAccs as accs}
    <div class="border border-gray-300 p-4 text-center">
      <a class="font-bold text-lg" href="/accs/">{accs.name}</a>
      <img class="max-w-xs max-h-xs mx-auto my-2" src={accs.url} alt={accs.url} />
    </div>
    {/each}
  </div>

  {:else}
  <p>No clothing item selected.</p>
  {/if}

   <!-- Success alert -->
   {#if showSuccessAlert}
   <div class="alert alert-success">
     <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
     </svg>
     <span>Your outfit has been saved successfully!</span>
   </div>
 {/if}

 <style>
  .alert-success {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  }
</style>