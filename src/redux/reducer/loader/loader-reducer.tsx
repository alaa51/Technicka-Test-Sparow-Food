import {HIDE_LOADER, SHOW_LOADER} from '../../action/loader/loader.tsx';

interface LoaderState {
    isLoading: boolean;
}

const initialState: LoaderState = {
    isLoading: false,
};

const loaderReducer = (state = initialState, action: {type: string}) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, isLoading: true};
        case HIDE_LOADER:
            return {...state, isLoading: false};
        default:
            return state;
    }
};

export default loaderReducer;
