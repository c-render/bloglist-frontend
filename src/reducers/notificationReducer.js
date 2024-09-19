const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      case 'CLEAR_NOTIFICATION':
        return null
      default:
        return state
    }
  }

export const setNotificationMessage = (message) => {
    return {
      type: 'SET_NOTIFICATION',
      data: message
    }
  }

export const clearNotificationMessage = () => {
    return {
      type: 'CLEAR_NOTIFICATION'
    }
  }
  
export default notificationReducer