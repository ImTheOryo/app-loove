
export const login = async (form) => {
    const data = new FormData(form);
    return await fetch( 'https://app-loove-api.local/login', {
        method: 'POST',
        body: data,
    });
}