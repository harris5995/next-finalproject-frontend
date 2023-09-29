<script>
    import { LoggedIn, isLoggedIn } from "./auth.js";
    import { logOut } from "./auth.js";

  // const accessToken = localStorage.getItem("auth.accessToken");
  // LoggedIn.set(!!accessToken);
  
</script> 

<nav class="bg-gray-900 text-white p-4 flex justify-between items-center">

  <a href="/" class=" text-3xl rounded-full px-4 py-2 font-semibold btn-accent">
    Outfit Catalog
  </a>
  
  <div class="flex-1"></div>

  <div class="flex items-center space-x-4">

    <div class="flex space-x-4 items-center">
      {#if $LoggedIn}
      <a href="/" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
        Closet
      </a>
      <a href="/outfit" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
        Outfit
      </a>

        <button on:click={logOut} class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Log Out
        </button>
 
      {:else}
        <a href="/users/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Register
        </a>
        <a href="/login" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
          Log In
        </a>

      {/if}
      <!-- {#if $LoggedIn}
      <button class="btn mr-6 btn-primary hover:btn-accent" on:click={logOut}>Log Out</button>
  {:else}
      <a href="/login" class="btn mr-6 btn-primary hover:btn-accent">Log In</a>
  {/if} -->
    </div>

    
  
   
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>