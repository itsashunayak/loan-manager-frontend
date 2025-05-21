import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserLoans = createAsyncThunk(
  "loan/fetchUserLoans",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getState().auth;
      if (!token || !userId) throw new Error("Authentication required");

      const { data } = await axios.get(`http://localhost:8080/loan/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Unexpected error");
    }
  }
);

export const applyForLoan = createAsyncThunk(
  "loan/applyForLoan",
  async ({ loanType, duration, loanAmount, monthlyEmi, interest }, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getState().auth;
      if (!token) throw new Error("Authentication token missing");

      await axios.post(
        `http://localhost:8080/loan/apply/${userId}`,
        {
          loanType,
          duration: parseInt(duration, 10),
          loanAmount: parseFloat(loanAmount),
          monthlyEmi: parseFloat(monthlyEmi),
          interest: interest ? parseFloat(interest) : null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return { success: true, message: "Loan application submitted successfully." };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Unexpected error");
    }
  }
);

const initialState = {
  loans: [],
  loading: false,
  error: null,
  formData: {
    loanType: "",
    duration: "",
    loanAmount: "",
    monthlyEmi: "",
    interest: "",
  },
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
  extraReducers: (builder) => {
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
      })
      .addCase(fetchLoansByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoansByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoansByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyForLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyForLoan.fulfilled, (state) => {
        state.loading = false;
        // Optionally clear the form here if needed
      })
      .addCase(applyForLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFormField, resetForm } = loanSlice.actions;

export default loanSlice.reducer;
