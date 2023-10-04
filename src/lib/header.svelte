<script>

    import { LoggedIn, isLoggedIn } from "./auth.js";
    import { logOut } from "./auth.js";
  
</script> 


<nav class="bg-black text-white p-4 flex justify-between items-center"> 

<a href="/" id="home" class="text-4xl bg-black text-white p-4 flex justify-between items-center">
  Style Vault
</a> 

<div class="flex-1"></div>

<div class="flex items-center space-x-4">

    <div class="flex space-x-4 items-center">
      {#if $LoggedIn}
      <a href="/" class="px-6 py-3 rounded-full text-lg btn-primary">
        Closet
      </a>
      <a href="/outfits" class="px-6 py-3 rounded-full text-lg btn-primary">
        Outfit
      </a>

      <a href="/calendar" class="px-6 py-3 rounded-full text-lg btn-primary">
        Calendar
      </a>

        <button on:click={logOut} class="px-6 py-3 rounded-full text-lg btn-primary">
          Log Out
        </button>
 
      {:else}
        <a href="/users/new" class="px-6 py-3 rounded-full text-lg btn-primary">
          Register
        </a>
        <a href="/login" class="px-6 py-3 rounded-full text-lg btn-primary">
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

#home {
        animation: color-change 7s infinite;
      }
      @keyframes color-change {
      0% { color: #b59687; }
      50% { color: #bb8169; }
      50% { color: #93573d; }
      50% { color: #B7410E; }
      100% { color: rgb(189, 147, 113); }
    }
    @keyframes hover-color {
  0% { color: inherit; }
  100% { color: #556B2F; }
}
#home:hover {
  animation: none; 
  color: #556B2F;
}
</style>
