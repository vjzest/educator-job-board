
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import EmployeeProfile from '@/components/profiles/EmployeeProfile';
import CollegeProfile from '@/components/profiles/CollegeProfile';
import AdminProfile from '@/components/profiles/AdminProfile';
import Header from '@/components/Header';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Render role-specific profile dashboard
  const renderProfileByRole = () => {
    switch (user.role) {
      case 'employee':
        return <EmployeeProfile />;
      case 'college':
        return <CollegeProfile />;
      case 'admin':
        return <AdminProfile />;
      default:
        return (
          <div className="min-h-screen bg-page">
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-4">
                  Unknown Role
                </h1>
                <p className="text-muted-foreground">
                  Your account role is not recognized. Please contact support.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderProfileByRole();
};

export default Profile;
