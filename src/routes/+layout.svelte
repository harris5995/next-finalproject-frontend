<script>
    import "../app.css";
    import Header from "../lib/header.svelte";

    import { LoggedIn } from "../lib/auth.js"


  </script>

<style>
  main {
    padding-top: 8rem; /* Increase this value as needed */
    font-style: Arial;
    font-size: 10;
  }
</style>
  
  <Header/>
  <main/>
  <slot />

  <div>
    <Header {loggedIn} />
    <!-- The rest of your layout content goes here -->
  </div>