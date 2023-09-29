<script>
    import "../app.css";
    import Header from "../lib/header.svelte";
    import { LoggedIn } from "../lib/auth.js"

    const accessToken = localStorage.getItem("auth.accessToken");
  LoggedIn.set(!!accessToken);
  
  </script>

<style>
  main {
    padding-top: 7rem; /* Increase this value as needed */
  }
</style>
  
  <Header/>
  <main/>
  <slot />