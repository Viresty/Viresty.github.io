export const changeBanner = (item) => {
    console.log('changing item:', item);
    return {
        type: 'change',
        payload: item,
    };
}