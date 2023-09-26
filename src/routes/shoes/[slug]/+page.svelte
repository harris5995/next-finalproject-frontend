<script>
	import { getUserId, LoggedIn } from '../../../lib/auth.js';
    import { getTokenFromLocalStorage } from '../../../lib/auth.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { goto } from '$app/navigation';

    export let data;

    async function deletePost(id) {
        const accessToken = getTokenFromLocalStorage();

        // try {
            console.log(1)
            const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/shoes/${data.shoes.id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({id})
                })
        // },
            console.log(2)
            if (response.status == 200) {
                goto('/');
            }
        // } catch (error) {
        //     console.error('An error occurred while deleting the post:', error);
        // }
    }



</script>

{#if $LoggedIn && getUserId() == data.shoes.user_id}
    <div>
        <!-- <button class="btn">
            <a href = '/images/${data.images.id}/editForm'>Edit Post</a> 
        </button> -->
        <button class="btn" on:click={deletePost(data.shoes.id)}>
            Delete Post
        </button>      
    </div>
    {/if }

    <div id="shoes-list" class="flex flex-wrap">
            <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
                <a class="font-bold text-2xl" href="/shoes/{data.shoes.id}">{data.shoes.name}</a>
                <img class="max-w-xs max-h-xs mx-auto mb-2" src={data.shoes.url} alt={data.shoes.url} />
                <p>{data.shoes.description}</p>
                <p>{data.shoes.brand}</p>
                <p>{data.shoes.color}</p>
                <p>{data.shoes.size}</p>
                <p>{data.shoes.occasion}</p>
                <p>{data.shoes.material}</p>
        </div>
    </div>


