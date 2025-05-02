
export const login = async (form) => {
    const data = new FormData(form);
    let res = await fetch( 'https://app-loove-api.local/login', {
        method: 'POST',
        body: data,
    });

    console.log(await res.json());
}