import * as types from '../types'

export const fetchUser = (data : any) => async (dispatch  :any) => {
    dispatch({
        type : types.Get_User,
        payload : data
    })
}