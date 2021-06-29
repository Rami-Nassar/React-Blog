import _ from 'lodash';
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

//ACTION CREATORS:

export const fetchPostsAndUsers = () => async (dispatch, getState) => { 
    await dispatch(fetchPosts());    

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

// export const fetchPostsAndUsers = () => async (dispatch, getState) => { 
//     await dispatch(fetchPosts());    

//     const userIds = _.uniq(_.map(getState().posts, 'userId'));
//     //console.log(userIds);
//     userIds.forEach(id => dispatch(fetchUser(id)));    
// };

//Defining a function that returns a function
export const fetchPosts = () =>  async (dispatch) => {
    const response = await jsonPlaceHolder.get('/posts');     
    
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};


// lodash memoization implementation to avoid duplication of calls

// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });


