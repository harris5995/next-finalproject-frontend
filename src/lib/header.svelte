<script>

    import { LoggedIn, isLoggedIn } from "./auth.js";
    import { logOut } from "./auth.js";
  
</script> 


<nav class="bg-primary text-white p-4 flex justify-between items-center">
  <a href="/" class="text-4xl font-semibold">
    Style Vault
  </a>
  <div class="flex-1"></div>
  <div class="flex items-center space-x-4">
    <div class="flex space-x-4 items-center">
      {#if $LoggedIn}
      <a href="/" class="nav-link">Closet</a>
      <a href="/outfits" class="nav-link">Outfit</a>
      <a href="/calendar" class="nav-link">Calendar</a>
      <button on:click={logOut} class="nav-button">Log Out</button>
      {:else}
      <a href="/users/new" class="nav-link">Register</a>
      <a href="/login" class="nav-link">Log In</a>
      {/if}
    </div>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #8D0327(0, 0, 0, 0.45); 
  }
  
  .nav-link {
    padding: 15px 20px;
    text-decoration: none;
    font-size: 17px;
    color: #fff;
    transition: background-color 0.3s, color 0.3s;
    border-radius: 20px;
  }
  
  .nav-link:hover {
    background-color: #B7410E;
    opacity: 0.8;
    color: #000;
  }
  
  .nav-button {
    padding: 10px 10px;
    font-size: 17px;
    background-color: #fff;
    color: #000;
    opacity: 0.8;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .nav-button:hover {
    background-color: #B7410E;
    opacity: 0.5;
    color: #000;

  }
  </style>