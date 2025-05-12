import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register a new user
export const registerUser = createAsyncThunk('auth/register', async (customerData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', customerData);
        return response.data; // Assuming the response contains the registered user
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Registration failed.');
    }
});

// Login 
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
          const response = await axios.post('http://localhost:8080/auth/login', {
            email, 
            password
        });
        const { token, userId,firstName } = response.data; // Assuming the response contains `token` and `userId`
        
        // Save the token in localStorage for persistence across sessions
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        return { userId, token,firstName }; // Return both userId and token to store in Redux
    } catch (error) {
        return rejectWithValue('Invalid credentials, please try again.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        token: null,
        loading: false,
        firstName:null,
        error: null,
    },
    reducers: {
        // Optional: A reducer to log out the user (clear token and userId)
        logout: (state) => {
            state.userId = null;
            state.token = null;
            localStorage.removeItem('token'); // Remove token from localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.id;
               
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.userId;
                 state.firstName=action.payload.firstName;
                state.token = action.payload.token; // Store the token in the state
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
