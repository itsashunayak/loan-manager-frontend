import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register a new user
export const registerUser = createAsyncThunk('auth/register', async (customerData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', customerData);
        return response.data;
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

        const { token, userId, firstName, role } = response.data;

        // Persist in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('role', role);

        return { userId, token, firstName, role };
    } catch (error) {
        return rejectWithValue('Invalid credentials, please try again.');
    }
});

// Fetch a particular user's details
export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user details.');
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        token: null,
        role: null,
        firstName: null,
        userDetails: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userId = null;
            state.token = null;
            state.role = null;
            state.firstName = null;

            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            localStorage.removeItem('role');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.id;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.userId;
                state.firstName = action.payload.firstName;
                state.token = action.payload.token;
                state.role = action.payload.role;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
