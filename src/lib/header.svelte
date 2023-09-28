<!-- File creates navbar for website -->

<script>
  import { LoggedIn } from "./auth.js";
  import { logOut } from "./auth.js";
  // import Theme from "./Theme.svelte";

</script> 


<nav class="bg-black text-white p-4 flex justify-between items-center"> 

<a href="/" class="text-4xl bg-black text-white p-4 flex justify-between items-center">
  Style Vault
</a> 

<div class="flex-1"></div>

<div class="flex items-center space-x-4">

  <div class="flex space-x-4 items-center">
    {#if $LoggedIn == true}
    <a href="/outfit" class="text-black border border-white px-2 py-1 rounded-full text-sm btn">
      My Outfit
    </a>
      <a href="/images/new" class="text-black border border-white px-2 py-1 rounded-full text-sm btn">
        Create New Listing
      </a>
      <button on:click={logOut} class="text-black border border-white px- py-1 rounded-full text-sm btn">
        Log Out
      </button>
      
      <!-- <Theme/> -->
    {:else}
      <a href="/users/new" class="text-black border border-white px-3 py-1 rounded-full text-sm btn">
        Sign Up
      </a>
      <a href="/login" class="text-black border border-white px-3 py-1 rounded-full text-sm btn">
        Log In
      </a>
      <!-- <Theme/> -->
    {/if}
  </div>
 
</nav>

<style>
nav {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
