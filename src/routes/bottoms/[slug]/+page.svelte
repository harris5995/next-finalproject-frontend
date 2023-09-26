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
            const response = await fetch(PUBLIC_BACKEND_BASE_URL + `/bottoms/${data.bottoms.id}`, {
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

{#if $LoggedIn && getUserId() == data.bottoms.user_id}
    <div>
        <!-- <button class="btn">
            <a href = '/images/${data.images.id}/editForm'>Edit Post</a> 
        </button> -->
        <button class="btn" on:click={deletePost(data.bottoms.id)}>
            Delete Post
        </button>      
    </div>
    {/if }

    <div id="bottoms-list" class="flex flex-wrap">
            <div class="border border-gray-300 p-4 m-4 text-center flex-shrink-0">
                <a class="font-bold text-2xl" href="/bottoms/{data.bottoms.id}">{data.bottoms.name}</a>
                <img class="max-w-xs max-h-xs mx-auto mb-2" src={data.bottoms.url} alt={data.bottoms.url} />
                <p>{data.bottoms.description}</p>
                <p>{data.bottoms.brand}</p>
                <p>{data.bottoms.color}</p>
                <p>{data.bottoms.size}</p>
                <p>{data.bottoms.occasion}</p>
                <p>{data.bottoms.material}</p>
        </div>
    </div>


