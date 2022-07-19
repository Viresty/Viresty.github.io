export const getCardDetail = (item) => {
    console.log('viewing item:', item);
    return {
        type: 'get',
        payload: item,
    };
}