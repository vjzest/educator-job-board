
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Shield,
  MoreHorizontal
} from 'lucide-react';

const AdminUsers = () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      role: 'employee',
      status: 'Active',
      joinDate: '2023-08-15',
      lastActive: '2024-01-25',
      location: 'New York, NY',
      phone: '+1 (555) 123-4567',
      profileImage: '',
      stats: {
        applications: 8,
        interviews: 3,
        offers: 1
      },
      verified: true,
      completeness: 85
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@springfield.edu',
      role: 'college',
      status: 'Active',
      joinDate: '2023-06-10',
      lastActive: '2024-01-24',
      location: 'Springfield, IL',
      phone: '+1 (555) 234-5678',
      profileImage: '',
      stats: {
        jobPosts: 12,
        applications: 156,
        hires: 8
      },
      verified: true,
      completeness: 92
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@gmail.com',
      role: 'employee',
      status: 'Inactive',
      joinDate: '2023-09-22',
      lastActive: '2024-01-10',
      location: 'Chicago, IL',
      phone: '+1 (555) 345-6789',
      profileImage: '',
      stats: {
        applications: 3,
        interviews: 0,
        offers: 0
      },
      verified: false,
      completeness: 60
    },
    {
      id: 4,
      name: 'Emily Carter',
      email: 'emily.carter@riverside.edu',
      role: 'college',
      status: 'Active',
      joinDate: '2023-07-18',
      lastActive: '2024-01-25',
      location: 'Milwaukee, WI',
      phone: '+1 (555) 456-7890',
      profileImage: '',
      stats: {
        jobPosts: 8,
        applications: 89,
        hires: 5
      },
      verified: true,
      completeness: 88
    },
    {
      id: 5,
      name: 'David Thompson',
      email: 'david.thompson@gmail.com',
      role: 'employee',
      status: 'Suspended',
      joinDate: '2023-11-05',
      lastActive: '2024-01-15',
      location: 'Boston, MA',
      phone: '+1 (555) 567-8901',
      profileImage: '',
      stats: {
        applications: 15,
        interviews: 2,
        offers: 0
      },
      verified: true,
      completeness: 75,
      suspensionReason: 'Inappropriate behavior reported'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@centralcollege.edu',
      role: 'college',
      status: 'Pending Review',
      joinDate: '2024-01-20',
      lastActive: '2024-01-25',
      location: 'Seattle, WA',
      phone: '+1 (555) 678-9012',
      profileImage: '',
      stats: {
        jobPosts: 0,
        applications: 0,
        hires: 0
      },
      verified: false,
      completeness: 45
    }
  ];

  const adminStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    employees: users.filter(u => u.role === 'employee').length,
    colleges: users.filter(u => u.role === 'college').length,
    pendingReview: users.filter(u => u.status === 'Pending Review').length,
    suspended: users.filter(u => u.status === 'Suspended').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'employee': return <GraduationCap className="h-4 w-4" />;
      case 'college': return <Building className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'employee': return 'bg-blue-100 text-blue-800';
      case 'college': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">User Management</h2>
          <p className="text-muted-foreground">Monitor and manage all platform users</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserCheck className="h-4 w-4" />
          Bulk Actions
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{adminStats.totalUsers}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{adminStats.activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{adminStats.employees}</div>
            <div className="text-sm text-muted-foreground">Teachers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{adminStats.colleges}</div>
            <div className="text-sm text-muted-foreground">Colleges</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{adminStats.pendingReview}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{adminStats.suspended}</div>
            <div className="text-sm text-muted-foreground">Suspended</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, or location..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button>Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {user.name}
                      {user.verified && (
                        <UserCheck className="h-4 w-4 text-green-600" />
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(user.role)} variant="secondary">
                    <span className="flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last Active: {new Date(user.lastActive).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-medium">Profile: </span>
                    <span className="text-foreground">{user.completeness}% Complete</span>
                  </div>
                </div>

                {/* Profile Completeness */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Profile Completeness</span>
                    <span>{user.completeness}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${user.completeness}%` }}
                    ></div>
                  </div>
                </div>

                {/* User Stats */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Activity Statistics:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {user.role === 'employee' ? (
                      <>
                        <div>
                          <span className="font-medium">Applications: </span>
                          <span className="text-foreground">{user.stats.applications}</span>
                        </div>
                        <div>
                          <span className="font-medium">Interviews: </span>
                          <span className="text-foreground">{user.stats.interviews}</span>
                        </div>
                        <div>
                          <span className="font-medium">Offers: </span>
                          <span className="text-foreground">{user.stats.offers}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="font-medium">Job Posts: </span>
                          <span className="text-foreground">{user.stats.jobPosts}</span>
                        </div>
                        <div>
                          <span className="font-medium">Applications Received: </span>
                          <span className="text-foreground">{user.stats.applications}</span>
                        </div>
                        <div>
                          <span className="font-medium">Successful Hires: </span>
                          <span className="text-foreground">{user.stats.hires}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Suspension Info */}
                {user.status === 'Suspended' && user.suspensionReason && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-900 mb-1">Suspension Reason:</h5>
                    <p className="text-sm text-red-800">{user.suspensionReason}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit User
                  </Button>
                  {user.status === 'Active' ? (
                    <Button variant="outline" size="sm" className="flex items-center gap-2 text-red-600">
                      <UserX className="h-4 w-4" />
                      Suspend
                    </Button>
                  ) : user.status === 'Suspended' ? (
                    <Button variant="outline" size="sm" className="flex items-center gap-2 text-green-600">
                      <UserCheck className="h-4 w-4" />
                      Reactivate
                    </Button>
                  ) : null}
                  {user.status === 'Pending Review' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Reject
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MoreHorizontal className="h-4 w-4" />
                    More Actions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
