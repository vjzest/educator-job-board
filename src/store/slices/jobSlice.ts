
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Job {
  id: string;
  title: string;
  school: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  experience: string;
  salary: string;
  subjects: string[];
  requirements: string;
  description: string;
  postedDate: string;
  applicationDeadline: string;
}

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    type: string[];
    location: string[];
    experience: string[];
  };
}

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: {
    type: [],
    location: [],
    experience: [],
  },
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ query, filters }: { query?: string; filters?: any }) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          params.append(key, value.join(','));
        }
      });
    }
    
    const response = await fetch(`/api/jobs?${params}`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return await response.json();
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (jobId: string) => {
    const response = await fetch(`/api/jobs/${jobId}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    return await response.json();
  }
);

export const applyToJob = createAsyncThunk(
  'jobs/applyToJob',
  async ({ jobId, applicationData }: { jobId: string; applicationData: any }) => {
    const response = await fetch(`/api/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
    if (!response.ok) throw new Error('Failed to apply to job');
    return await response.json();
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { type: [], location: [], experience: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.currentJob = action.payload;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        // Handle successful application
      });
  },
});

export const { setSearchQuery, setFilters, clearFilters } = jobSlice.actions;
export default jobSlice.reducer;
