const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    lastDeletedHeroe: null, // нужен ли этот стейт?
    newHeroe: null, // нужен ли этот стейт?
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HEROE':
            return {
                ...state,
                lastDeletedHeroe: action.payload,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }
        case 'SET_ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'ADD_NEW_HEROE':
            return {
                ...state,
                newHeroe: action.payload,
                heroes: [...state.heroes, action.payload]
            }
        default: return state
    }
}

export default reducer;