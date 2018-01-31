export function itemHasErrored(state=false,action) {
    switch (action.type){
        case "HAS_ERROR":
            return action.hasError;
        default:
            return state;
    }
}

export function itemIsLoading(state=false,action) {
    switch (action.type){
        case "IS_LOADING":
            return action.isLoading;
        default:
            return state;
    }
}

export function displayModal(state = false,action) {
    switch (action.type){
        case "DISPLAY_MODAL":
            return action.displayModal;
        default:
            return state;
    }
}

// export function displaySearchInput(state = false,action) {
//     switch (action.type){
//         case "DISPLAY_SEARCH_INPUT":
//             return state.displaySearchInput;
//         default:
//             return state;
//     }
// }