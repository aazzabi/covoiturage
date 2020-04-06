import Axios from "axios";
export const GET_PACKAGES_SUCCESS = "GET_PACKAGES_SUCCESS";
export const GET_PACKAGES_ERROR = "GET_PACKAGES_ERROR";

export const getPackages = () => {
    return async (dispatch) => {
        try {
            const result = await Axios.get('http://localhost:3000/packages/All');
            dispatch({ type: GET_PACKAGES_SUCCESS, payload: result.data })
        }
        catch (error) {
            dispatch({ type: GET_PACKAGES_ERROR, error })
        }
    }
}
