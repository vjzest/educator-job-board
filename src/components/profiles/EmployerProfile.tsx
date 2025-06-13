
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Calendar, FileText, TrendingUp, Plus, Eye, UserCheck, Clock } from 'lucide-react';

const EmployerProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Active Job Posts', value: '8', icon: FileText, color: 'text-primary', bgColor: 'bg-primary/10', trend: '+2 new' },
    { label: 'Total Applications', value: '124', icon: Users, color: 'text-secondary', bgColor: 'bg-secondary/10', trend: '+15 today' },
    { label: 'Interviews Scheduled', value: '12', icon: Calendar, color: 'text-accent', bgColor: 'bg-accent/10', trend: '3 this week' },
    { label: 'Hired Candidates', value: '23', icon: UserCheck, color: 'text-success', bgColor: 'bg-success/10', trend: '+3 this month' },
  ];

  const recentApplications = [
    { 
      candidate: 'Sarah Johnson', 
      position: 'Mathematics Teacher', 
      appliedDate: '2 hours ago',
      status: 'New Application',
      statusColor: 'bg-primary/20 text-primary',
      experience: '5 years',
      qualification: 'M.Ed Mathematics'
    },
    { 
      candidate: 'Michael Chen', 
      position: 'Science Teacher', 
      appliedDate: '5 hours ago',
      status: 'Under Review',
      statusColor: 'bg-warning/20 text-warning',
      experience: '8 years',
      qualification: 'M.Sc Physics'
    },
    { 
      candidate: 'Emily Davis', 
      position: 'English Teacher', 
      appliedDate: '1 day ago',
      status: 'Shortlisted',
      statusColor: 'bg-secondary/20 text-secondary',
      experience: '3 years',
      qualification: 'M.A English Literature'
    },
  ];

  return (
    <div className="min-h-screen bg-page">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome, {user?.name}! 🏫
              </h1>
              <p className="text-muted-foreground text-lg">
                College Dashboard - Manage job postings and recruit talented educators
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} size="lg">
              Logout
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {stat.trend}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Applications */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Recent Applications
                </CardTitle>
                <CardDescription>
                  Latest applications received for your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{application.candidate}</h4>
                          <Badge className={application.statusColor} variant="secondary">
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{application.position}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <UserCheck className="h-3 w-3" />
                            <span>{application.experience}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{application.qualification}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{application.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Applications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-6 w-6 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Manage your recruitment process efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start h-12 text-left" variant="outline">
                  <Plus className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Post New Job</div>
                    <div className="text-xs text-muted-foreground">Create a new teaching position</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-12 text-left" variant="outline">
                  <Eye className="mr-3 h-5 w-5 text-secondary" />
                  <div>
                    <div className="font-medium">Manage Job Posts</div>
                    <div className="text-xs text-muted-foreground">Edit existing job listings</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-12 text-left" variant="outline">
                  <Calendar className="mr-3 h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Schedule Interviews</div>
                    <div className="text-xs text-muted-foreground">Arrange candidate meetings</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-12 text-left" variant="outline">
                  <UserCheck className="mr-3 h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Review Candidates</div>
                    <div className="text-xs text-muted-foreground">Shortlist and hire teachers</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">College Profile</h3>
                <p className="text-sm text-muted-foreground">Manage your institution's information and branding</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">Track recruitment metrics and performance</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Team Management</h3>
                <p className="text-sm text-muted-foreground">Organize your hiring team and permissions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
