
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  school: string;
  location: string;
  appliedDate: string;
  status: 'Application Submitted' | 'Under Review' | 'Interview Scheduled' | 'Offer Extended' | 'Rejected';
  interviewDate?: string;
  interviewTime?: string;
  notes?: string;
  documents: string[];
}

interface ApplicationState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  stats: {
    total: number;
    pending: number;
    interviews: number;
    offers: number;
    rejected: number;
  };
}

const initialState: ApplicationState = {
  applications: [],
  isLoading: false,
  error: null,
  stats: {
    total: 0,
    pending: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  },
};

export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async () => {
    const response = await fetch('/api/applications');
    if (!response.ok) throw new Error('Failed to fetch applications');
    return await response.json();
  }
);

export const submitApplication = createAsyncThunk(
  'applications/submitApplication',
  async ({ jobId, applicationData }: { jobId: string; applicationData: any }) => {
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, ...applicationData }),
    });
    if (!response.ok) throw new Error('Failed to submit application');
    return await response.json();
  }
);

export const withdrawApplication = createAsyncThunk(
  'applications/withdrawApplication',
  async (applicationId: string) => {
    const response = await fetch(`/api/applications/${applicationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to withdraw application');
    return applicationId;
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    updateApplicationStatus: (state, action) => {
      const { applicationId, status } = action.payload;
      const application = state.applications.find(app => app.id === applicationId);
      if (application) {
        application.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
        
        // Calculate stats
        state.stats.total = action.payload.length;
        state.stats.pending = action.payload.filter((app: Application) => 
          ['Application Submitted', 'Under Review'].includes(app.status)
        ).length;
        state.stats.interviews = action.payload.filter((app: Application) => 
          app.status === 'Interview Scheduled'
        ).length;
        state.stats.offers = action.payload.filter((app: Application) => 
          app.status === 'Offer Extended'
        ).length;
        state.stats.rejected = action.payload.filter((app: Application) => 
          app.status === 'Rejected'
        ).length;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch applications';
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter(app => app.id !== action.payload);
      });
  },
});

export const { updateApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
