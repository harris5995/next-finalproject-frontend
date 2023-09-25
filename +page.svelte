<!-- src/routes/Wardrobe.svelte -->

    <!-- Homepage of Ecomm -->
    <script>
        import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
        import { getTokenFromLocalStorage } from '../../lib/auth.js';
        export let data;
      
      
      // Sample wardrobe data
      let wardrobe = [
        {
          id: 1,
          name: 'Blue Jeans',
          category: 'Bottoms',
          color: 'Blue',
          size: 'Medium',
          image: 'jeans.jpg',
        },
        {
          id: 2,
          name: 'White T-Shirt',
          category: 'Tops',
          color: 'White',
          size: 'Large',
          image: 'tshirt.jpg',
        },
        // Add more clothing items as needed
      ];
    
      // Filter and sort options
      let selectedCategory = 'All';
      let sortBy = 'name';
      let sortOrder = 'asc';
    
      // Sample categories and outfits
      let categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];
      let outfits = [
        {
          id: 1,
          name: 'Casual Day Outfit',
          items: [1, 2], // IDs of clothing items
        },
        // Add more outfits as needed
      ];
    
      // Function to filter clothing items
      function filterItems(item) {
        return selectedCategory === 'All' || item.category === selectedCategory;
      }
    
      // Function to sort clothing items
      function sortItems(a, b) {
        const order = sortOrder === 'asc' ? 1 : -1;
        return (a[sortBy] < b[sortBy] ? -1 : 1) * order;
      }
    
      // Function to delete a clothing item
      function deleteItem(id) {
        wardrobe = wardrobe.filter((item) => item.id !== id);
      }
    </script>
  
  
    
    <main class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-4">Your Wardrobe</h1>
    
      <!-- Filters and Sorting -->
      <div class="flex flex-wrap mb-4 space-x-2">
        <label for="category" class="font-semibold">Category:</label>
        <select
          id="category"
          bind:value={selectedCategory}
          class="p-2 rounded-md border border-gray-300"
        >
          {#each categories as cat (cat)}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
    
        <label for="sort" class="font-semibold">Sort by:</label>
        <select
          id="sort"
          bind:value={sortBy}
          class="p-2 rounded-md border border-gray-300"
        >
          <option value="name">Name</option>
          <option value="color">Color</option>
        </select>
    
        <label for="order" class="font-semibold">Order:</label>
        <select
          id="order"
          bind:value={sortOrder}
          class="p-2 rounded-md border border-gray-300"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    
      <!-- Clothing Items -->
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each wardrobe.filter(filterItems).sort(sortItems) as item (item.id)}
          <li
            class="bg-white rounded-md p-4 shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2 relative"
          >
            <h2 class="text-lg font-semibold">{item.name}</h2>
            <p class="text-gray-600">Category: {item.category}</p>
            <p class="text-gray-600">Color: {item.color}</p>
            <p class="text-gray-600">Size: {item.size}</p>
            <img
              src={`images/${item.image}`}
              alt={item.name}
              class="w-full mt-2 rounded-md"
            />
            <button
              class="absolute top-2 right-2 bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
              on:click={() => deleteItem(item.id)}
            >
              Delete
            </button>
            <!-- Add Edit button and modal for editing here -->
          </li>
        {/each}
      </ul>
  
      <a href="/tops/new" class="text-white border border-white px-4 py-2 rounded-full text-sm btn">
        Upload New Top
      </a>
  
  
  <div id="tops-list" class="flex flex-wrap">
    {#each data.tops as tops}
        <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
            <a class="font-bold text-2xl" href="/tops/{tops.id}">{tops.title}</a>
            <img class="max-w-xs max-h-xs mx-auto mb-2" src={tops.url} alt={tops.url} />
            <p>{tops.description}</p>
            <p>{tops.brand}</p>
            <p>{tops.color}</p>
            <p>{tops.size}</p>
            <p>{tops.occasion}</p>
            <p>{tops.material}</p>
          </div>
    {/each}
  </div>
  
    </main>