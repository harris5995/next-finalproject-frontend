import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {
  const data = {
    tops: [],
    bottoms: [],
    shoes: [],
    accs: [],
    outfits: []
  };

  try {
    const [topsResp, bottomsResp, shoesResp, accessoriesResp, outfitsResp] = await Promise.all([
      fetch(PUBLIC_BACKEND_BASE_URL + `/tops/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      fetch(PUBLIC_BACKEND_BASE_URL + `/bottoms/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      fetch(PUBLIC_BACKEND_BASE_URL + `/shoes/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      fetch(PUBLIC_BACKEND_BASE_URL + `/accs/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      fetch(PUBLIC_BACKEND_BASE_URL + `/outfits/${params.slug}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    ]);

    if (topsResp.status === 200) {
      data.tops = await topsResp.json();
    }

    if (bottomsResp.status === 200) {
      data.bottoms = await bottomsResp.json();
    }

    if (shoesResp.status === 200) {
      data.shoes = await shoesResp.json();
    }

    if (accessoriesResp.status === 200) {
      data.accs = await accessoriesResp.json();
    }

    if (outfitsResp.status === 200) {
        data.outfits = await outfitsResp.json();
      }

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return data;
}