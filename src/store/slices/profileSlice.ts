
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  experience?: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  certifications: string[];
  subjects: string[];
  languages: string[];
  profileImage?: string;
  resume?: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  updateSuccess: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
  updateSuccess: false,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await fetch('/api/profile');
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: Partial<Profile>) => {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return await response.json();
  }
);

export const uploadProfileImage = createAsyncThunk(
  'profile/uploadImage',
  async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/profile/image', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return await response.json();
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.updateSuccess = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.profileImage = action.payload.imageUrl;
        }
      });
  },
});

export const { clearUpdateSuccess } = profileSlice.actions;
export default profileSlice.reducer;
