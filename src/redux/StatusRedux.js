
//selectors
export const getStatus = (state) => state.status;

//actions 
const createActionName = actionName => `app/status/${actionName}`;
const TABLE_STATUS = createActionName('TABLE_STATUS');

// action creator

export const tableStatus  = payload => ({type: TABLE_STATUS, payload});

export const fetchStatus = () => {
    return(dispatch) => {
        fetch( 'http://localhost:3131/status')
        .then(res => res.json())
        .then(status => dispatch(tableStatus(status)))
    }
}

const statusReducer = (statePart = [], action) => {
    switch (action.type) {
      case TABLE_STATUS:
        return [...action.payload];
      default:
        return statePart
    };
};

export default statusReducer;