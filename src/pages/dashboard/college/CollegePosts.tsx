
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Users, Calendar, MapPin } from 'lucide-react';

const CollegePosts = () => {
  const jobPosts = [
    {
      id: 1,
      title: 'Mathematics Teacher',
      department: 'Mathematics Department',
      type: 'Full-time',
      status: 'Active',
      applications: 15,
      posted: '2024-01-15',
      deadline: '2024-02-15',
      location: 'Springfield Campus',
      salary: '$45,000 - $55,000',
      views: 89
    },
    {
      id: 2,
      title: 'Science Teacher',
      department: 'Science Department',
      type: 'Full-time',
      status: 'Under Review',
      applications: 8,
      posted: '2024-01-10',
      deadline: '2024-02-10',
      location: 'Main Campus',
      salary: '$50,000 - $65,000',
      views: 56
    },
    {
      id: 3,
      title: 'English Literature Teacher',
      department: 'English Department',
      type: 'Part-time',
      status: 'Draft',
      applications: 0,
      posted: '2024-01-20',
      deadline: '2024-02-20',
      location: 'Downtown Campus',
      salary: '$35,000 - $45,000',
      views: 12
    },
    {
      id: 4,
      title: 'Art Teacher',
      department: 'Fine Arts Department',
      type: 'Full-time',
      status: 'Closed',
      applications: 23,
      posted: '2023-12-15',
      deadline: '2024-01-15',
      location: 'Arts Campus',
      salary: '$42,000 - $52,000',
      views: 134
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Manage Job Posts</h2>
          <p className="text-muted-foreground">View and manage your posted positions</p>
        </div>
        <Button>Create New Post</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">4</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-muted-foreground">Active Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">46</div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">291</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Job Posts List */}
      <div className="space-y-4">
        {jobPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{post.title}</CardTitle>
                  <CardDescription className="text-base">
                    {post.department}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {new Date(post.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{post.applications} Applications</span>
                  </div>
                </div>

                {/* Salary and Type */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium">Salary: </span>
                    <span className="text-foreground">{post.salary}</span>
                  </div>
                  <div>
                    <span className="font-medium">Type: </span>
                    <Badge variant="outline">{post.type}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Views: </span>
                    <span className="text-foreground">{post.views}</span>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="text-sm text-muted-foreground">
                  Posted on {new Date(post.posted).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Applications ({post.applications})
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Delete
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

export default CollegePosts;
