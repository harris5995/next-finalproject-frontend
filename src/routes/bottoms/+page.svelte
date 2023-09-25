<!-- src/routes/ClothingBrowsing.svelte -->
<script>
    // Sample clothing data
    let clothingItems = [
      {
        id: 1,
        name: 'Blue Shirt',
        color: 'Blue',
        size: 'M',
        price: '$25.99',
        imageUrl: 'blue-shirt.jpg',
      },
      {
        id: 2,
        name: 'Red Dress',
        color: 'Red',
        size: 'S',
        price: '$39.99',
        imageUrl: 'red-dress.jpg',
      },
      // Add more clothing items as needed
    ];
  
    // Sort and filter options
    let sortBy = 'color'; // Default sorting by color
    let filterByColor = '';
    let filterBySize = '';
  
    // Function to sort clothing items
    function sortItems(a, b) {
      if (sortBy === 'color') {
        return a.color.localeCompare(b.color);
      } else if (sortBy === 'size') {
        return a.size.localeCompare(b.size);
      }
    }
  </script>
  
  <main class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-4">Browse Clothing</h1>
  
    <!-- Sorting and Filtering Options -->
    <div class="mb-4">
      <label class="font-semibold mr-2">Sort by:</label>
      <select bind:value={sortBy} class="p-2 rounded-md border border-gray-300">
        <option value="color">Color</option>
        <option value="size">Size</option>
      </select>
      
      <label class="font-semibold mx-2">Filter by color:</label>
      <input
        type="text"
        bind:value={filterByColor}
        placeholder="Enter color"
        class="p-2 rounded-md border border-gray-300"
      />
  
      <label class="font-semibold mx-2">Filter by size:</label>
      <input
        type="text"
        bind:value={filterBySize}
        placeholder="Enter size"
        class="p-2 rounded-md border border-gray-300"
      />
    </div>
  
    <!-- Clothing Items -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {#each clothingItems.filter(item => {
        const colorMatch = !filterByColor || item.color.toLowerCase().includes(filterByColor.toLowerCase());
        const sizeMatch = !filterBySize || item.size.toLowerCase().includes(filterBySize.toLowerCase());
        return colorMatch && sizeMatch;
      }).sort(sortItems) as item (item.id)}
        <div
          class="bg-white rounded-md p-4 shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-2"
        >
          <img
            src={`images/${item.imageUrl}`}
            alt={item.name}
            class="w-full h-48 object-cover rounded-md mb-2"
          />
          <h2 class="text-lg font-semibold">{item.name}</h2>
          <p class="text-gray-600">Color: {item.color}</p>
          <p class="text-gray-600">Size: {item.size}</p>
          <p class="text-gray-600">Price: {item.price}</p>
          <button class="mt-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Add to Cart</button>
        </div>
      {/each}
    </div>
  </main>