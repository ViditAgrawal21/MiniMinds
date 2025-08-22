// Action creators and helpers

// Async action creator example
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Make API call here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      dispatch(loginSuccess(data.user));
    } else {
      dispatch(loginFailure(data.message || 'Login failed'));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Add more action creators as needed
