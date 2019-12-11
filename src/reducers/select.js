
const initialState = {
    heros: []
}
const selectReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SELECT_HERO":
            return {
                ...state,
                heros: state.heros.concat(action.payload)
            }
        default: 
            return state
    }
}

export default selectReducer  