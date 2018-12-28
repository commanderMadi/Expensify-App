export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
        return {
            //empty object obviously.. :D
        }
        default:
        return state;
    }
}