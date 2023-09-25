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

      
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/tops', {
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



<h1 class="text-center text-3xl font-bold">Upload Your Clothes Here</h1>

<div class="flex justify-center items-center mt-8">
    <form on:submit={uploadImages} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="name">
                <span class="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="White Dress Shirt" class="input input-bordered w-full" required />
            {#if 'name' in formErrors}
            <label class="label" for="name">
                <span class="label-text-alt text-red-500">{formErrors['name'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="description">
                <span class="label-text">Description</span>
            </label>
            <input type="input" name="description" placeholder="Additional information about your clothing item to improve searchability" class="input input-bordered w-full" required />
            {#if 'description' in formErrors}
            <label class="label" for="description">
                <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="file">
                <span class="label-text">Upload File</span>
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
            <label class="label" for="brand">
                <span class="label-text">Brand</span>
            </label>
            <input type="input" name="brand" placeholder="Uniqlo" class="input input-bordered w-full" required />
            {#if 'brand' in formErrors}
            <label class="label" for="brand">
                <span class="label-text-alt text-red-500">{formErrors['brand'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="color">
                <span class="label-text">Color</span>
            </label>
            <input type="input" name="color" placeholder="Red/Blue/Green/Yellow" class="input input-bordered w-full" required />
            {#if 'color' in formErrors}
            <label class="label" for="color">
                <span class="label-text-alt text-red-500">{formErrors['color'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="size">
                <span class="label-text">Size</span>
            </label>
            <input type="input" name="size" placeholder="S/M/L/XL etc" class="input input-bordered w-full" required />
            {#if 'color' in formErrors}
            <label class="label" for="size">
                <span class="label-text-alt text-red-500">{formErrors['size'].message}</span>
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
            <label class="label" for="material">
                <span class="label-text">Material</span>
            </label>
            <input type="input" name="material" placeholder="Cotton/Denim/Wool etc" class="input input-bordered w-full" required />
            {#if 'color' in formErrors}
            <label class="label" for="material">
                <span class="label-text-alt text-red-500">{formErrors['material'].message}</span>
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






