import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserLoans = createAsyncThunk(
    "loan/fetchUserLoans",
    async (_, { getState, rejectWithValue }) => {
        try {
            console.log("Fetching loan data from API...");
            const { token, userId } = getState().auth;

            if (!token || !userId) throw new Error("Authentication required");

            const { data } = await axios.get(`http://localhost:8080/loan/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("API Response (Loan Data):", data); // ✅ Debugging output
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message || "Unexpected error");
        }
    }
);

export const fetchLoansByUserId = createAsyncThunk(
    "loan/fetchLoansByUserId",
    async (userId, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;

            if (!token) throw new Error("Authentication required");

            const { data } = await axios.get(`http://localhost:8080/loan/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Redux saving loan data:", data); // ✅ Debugging output
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message || "Unexpected error");
        }
    }
);

const loanSlice = createSlice({
    name: "loan",
    initialState: { loans: [], loading: false, error: null },
    extraReducers: (builder) =>
        builder
            .addCase(fetchUserLoans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserLoans.fulfilled, (state, action) => {
                console.log("Updating Redux State with Loans:", action.payload); // ✅ Debugging output
                state.loading = false;
                state.loans = action.payload;
            })
            .addCase(fetchUserLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchLoansByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLoansByUserId.fulfilled, (state, action) => {
                console.log("Updating Redux State with Loans by userId:", action.payload); // ✅ Debugging output
                state.loading = false;
                state.loans = action.payload;
            })
            .addCase(fetchLoansByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }),
});

export default loanSlice.reducer;
