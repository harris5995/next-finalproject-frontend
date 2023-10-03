<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    let formErrors = {};
    import { getTokenFromLocalStorage, getUserId } from '../../../lib/auth.js';
    import { goto } from '$app/navigation'
    import { uploadMedia } from '../../../lib/s3-uploader.js'

    function postSignUp() {
        goto('/');
    } 

    async function uploadImages(evt) {
        const accessToken = getTokenFromLocalStorage()
        const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
        const imageData = {
            name: evt.target['name'].value,
            description: evt.target['description'].value, 
            brand: evt.target['brand'].value,
            color: evt.target['color'].value,
            size: evt.target['size'].value,
            occasion: evt.target['occasion'].value,
            material: evt.target['material'].value,
            url: fileUrl,
        };

      
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/shoes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(imageData)
      });
  
      
      if (resp.status == 200) {
        postSignUp();
      } else {
      const res = await resp.json();
      if (res.error)
      console.log(res.error)
      formErrors = res.error;
    }
}

</script>



<h1 class="text-center text-3xl font-bold">Upload Your Shoes Here</h1>

<div class="flex justify-center items-center mt-8">
    <form on:submit={uploadImages} class="w-1/3">

        <div class="form-control w-full">
            <label class="label" for="file">
                <span class="label-text">Upload Image</span>
            </label>
            <div class="relative">
                <input type="file" name="file" class="file-input file-input-bordered file-input-accent w-full max-w-xs" />
            </div>
            {#if 'file' in formErrors}
            <label class="label" for="file">
                <span class="label-text-alt text-red-500">{formErrors['file'].message}</span>
            </label>
            {/if}
        </div>
        
        <div class="form-control w-full">
            <label class="label" for="name">
                <span class="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="Running Shoes" class="input input-bordered w-full" required />
            {#if 'name' in formErrors}
            <label class="label" for="name">
                <span class="label-text-alt text-red-500">{formErrors['name'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="brand">
                <span class="label-text">Brand</span>
            </label>
            <input type="input" name="brand" placeholder="Nike" class="input input-bordered w-full" required />
            {#if 'brand' in formErrors}
            <label class="label" for="brand">
                <span class="label-text-alt text-red-500">{formErrors['brand'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="color">
                <span class="label-text">Primary Color</span>
            </label>
            <select name="color" class="input input-bordered w-full" required>
                <option value="" disabled selected>Select a color</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="Brown">Brown</option>
                <option value="Gold">Gold</option>
                <option value="Green">Green</option>
                <option value="Grey">Grey</option>
                <option value="Orange">Orange</option>
                <option value="Pink">Pink</option>
                <option value="Purple">Purple</option>
                <option value="Red">Red</option>
                <option value="Silver">Silver</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Mixed Colors">Mixed Colors</option>
                <option value="Other">Other</option>
                <!-- Add more color options as needed -->
            </select>
            {#if 'color' in formErrors}
            <label class="label" for="color">
                <span class="label-text-alt text-red-500">{formErrors['color'].message}</span>
            </label>
            {/if}
        </div>


        <div class="form-control w-full">
            <label class="label" for="material">
                <span class="label-text">Material</span>
            </label>
            <select name="material" class="input input-bordered w-full" required>
                <option value="" disabled selected>Select a material</option>
                <option value="Canvas">Cotton</option>
                <option value="Cotton">Cotton</option>
                <option value="Denim">Denim</option>
                <option value="Flannel">Flannel</option>
                <option value="Fleece">Fleece</option>
                <option value="Gingham">Gingham</option>
                <option value="Jersey">Jersey</option>
                <option value="Lace">Lace</option>
                <option value="Leather">Leather</option>
                <option value="Linen">Linen</option>
                <option value="Metal">Metal/Alloys</option>
                <option value="Polyester">Polyester</option>
                <option value="Precious Stones">Precious Stones</option>
                <option value="Rayon">Rayon</option>
                <option value="Rubber">Rubber</option>
                <option value="Satin">Satin</option>
                <option value="Silk">Silk</option>
                <option value="Spandex">Spandex</option>
                <option value="Suede">Suede</option>
                <option value="Synthetic Fiber">Synthetic Fiber</option>
                <option value="Tweed">Tweed</option>
                <option value="Twill">Twill</option>
                <option value="Wool">Wool</option>
                <option value="Other Materials">Other Materials</option>
            </select>
            {#if 'material' in formErrors}
            <label class="label" for="material">
                <span class="label-text-alt text-red-500">{formErrors['material'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="occasion">
                <span class="label-text">Occasion</span>
            </label>
            <input type="input" name="occasion" placeholder="Formal Events/Sports/Dates etc" class="input input-bordered w-full" required />
            {#if 'color' in formErrors}
            <label class="label" for="occasion">
                <span class="label-text-alt text-red-500">{formErrors['occasion'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="size">
                <span class="label-text">Size</span>
            </label>
            <input type="input" name="size" placeholder="S/M/L/XL or Shoe Size: 8" class="input input-bordered w-full" required />
            {#if 'color' in formErrors}
            <label class="label" for="size">
                <span class="label-text-alt text-red-500">{formErrors['size'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="description">
                <span class="label-text">Description</span>
            </label>
            <input type="input" name="description" placeholder="Additional Information" class="input input-bordered w-full" required />
            {#if 'description' in formErrors}
            <label class="label" for="description">
                <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
            </label>
            {/if}
        </div>

        
        <div class="form-control w-full mt-8">
            <button class="btn btn-md bg-white text-black">
                Submit
            </button>
        </div>
    </form>
</div>
