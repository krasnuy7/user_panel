export function addUserToArray(state = [], action) {
    switch (action.type) {
      case 'USERS_ADD':
        return [...state, ...action.payload]
      case 'PAGINATION_ARR':
        const newpayload = action.payload.users.filter((item, idx) => {
            let amount = 5;
            if(amount * action.payload.page > idx) {
                return item
            }
        })
        console.log('newpayload' , newpayload)
        return newpayload
      default:
        return state
    }
  }