export default(state = [], action) => {
    switch (action.type) {
        case 'change':
            return action.payload;
        default:
            return state;
    }
};