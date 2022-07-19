export default(state = [], action) => {
    switch (action.type) {
        case 'get':
            return action.payload;
        default:
            return state;
    }
};