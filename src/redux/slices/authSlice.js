import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register a new user
export const registerUser = createAsyncThunk('auth/register', async (customerData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8083/customer/register', customerData);
        return response.data; // Assuming the response contains the registered user
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Registration failed.');
    }
});

// Login user
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8083/customer/login', null, { params: { email, password } });
        return response.data;
    } catch (error) {
        return rejectWithValue('Invalid credentials, please try again.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { userId: null, loading: false, error: null },
    reducers: {},
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
                state.userId = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;