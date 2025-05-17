// slices/loanSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserLoans = createAsyncThunk(
    'loan/fetchUserLoans',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token, userId } = getState().auth;

            if (!token || !userId) throw new Error('Authentication required');

            const { data } = await axios.get(`http://localhost:8080/loan/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(data);
            return data; // This should be an array of loan objects
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || 'Unexpected error'
            );
        }
    }
);

const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchUserLoans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserLoans.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload;
            })
            .addCase(fetchUserLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default loanSlice.reducer;
