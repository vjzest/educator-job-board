
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Calendar, 
  MapPin, 
  Building, 
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  MessageSquare
} from 'lucide-react';

const MyApplications = () => {
  const applications = [
    {
      id: 1,
      jobTitle: 'Mathematics Teacher',
      school: 'Springfield Elementary School',
      location: 'Springfield, IL',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
      interviewDate: '2024-01-25',
      interviewTime: '10:00 AM',
      salary: '$45,000 - $55,000',
      jobType: 'Full-time',
      applicationProgress: 75,
      nextStep: 'Prepare for interview',
      contactPerson: 'Dr. Sarah Johnson',
      contactEmail: 'sarah.johnson@springfield.edu',
      notes: 'Panel interview with 3 department heads. Bring teaching portfolio and sample lesson plans.'
    },
    {
      id: 2,
      jobTitle: 'Science Teacher',
      school: 'Oak Hill High School',
      location: 'Madison, WI',
      appliedDate: '2024-01-10',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      salary: '$50,000 - $65,000',
      jobType: 'Full-time',
      applicationProgress: 50,
      nextStep: 'Waiting for employer response',
      contactPerson: 'Mr. David Wilson',
      contactEmail: 'david.wilson@oakhill.edu',
      notes: 'Application submitted with all required documents. Expected response within 2 weeks.'
    },
    {
      id: 3,
      jobTitle: 'English Teacher',
      school: 'Central Middle School',
      location: 'Chicago, IL',
      appliedDate: '2024-01-05',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      salary: '$35,000 - $45,000',
      jobType: 'Part-time',
      applicationProgress: 25,
      nextStep: 'Apply to similar positions',
      rejectionReason: 'Position filled by internal candidate',
      notes: 'Feedback: Strong application, consider applying for full-time positions when available.'
    },
    {
      id: 4,
      jobTitle: 'Art Teacher',
      school: 'Riverside Academy',
      location: 'Milwaukee, WI',
      appliedDate: '2024-01-20',
      status: 'Offer Extended',
      statusColor: 'bg-green-100 text-green-800',
      salary: '$42,000 - $52,000',
      jobType: 'Full-time',
      applicationProgress: 100,
      nextStep: 'Review and respond to offer',
      offerDeadline: '2024-02-05',
      startDate: '2024-03-01',
      contactPerson: 'Ms. Emily Carter',
      contactEmail: 'emily.carter@riverside.edu',
      notes: 'Offer includes benefits package. Response required by February 5th.'
    },
    {
      id: 5,
      jobTitle: 'Physical Education Teacher',
      school: 'Lincoln Elementary',
      location: 'Detroit, MI',
      appliedDate: '2024-01-22',
      status: 'Application Submitted',
      statusColor: 'bg-gray-100 text-gray-800',
      salary: '$38,000 - $48,000',
      jobType: 'Full-time',
      applicationProgress: 25,
      nextStep: 'Wait for initial screening',
      contactPerson: 'Coach Mike Thompson',
      contactEmail: 'mike.thompson@lincoln.edu',
      notes: 'New application. Expected response within 1-2 weeks.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Offer Extended':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Interview Scheduled':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'Under Review':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => ['Application Submitted', 'Under Review'].includes(app.status)).length,
    interviews: applications.filter(app => app.status === 'Interview Scheduled').length,
    offers: applications.filter(app => app.status === 'Offer Extended').length,
    rejected: applications.filter(app => app.status === 'Rejected').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">My Applications</h2>
        <p className="text-muted-foreground">Track your job applications and manage your career progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.interviews}</div>
            <div className="text-sm text-muted-foreground">Interviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.offers}</div>
            <div className="text-sm text-muted-foreground">Job Offers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{application.jobTitle}</CardTitle>
                  <CardDescription className="text-base flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {application.school}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {application.location}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(application.status)}
                  <Badge className={application.statusColor}>
                    {application.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Application Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Application Progress</span>
                    <span>{application.applicationProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(application.applicationProgress)}`}
                      style={{ width: `${application.applicationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Next step: {application.nextStep}</p>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Salary: </span>
                    <span className="text-foreground">{application.salary}</span>
                  </div>
                  <div>
                    <span className="font-medium">Type: </span>
                    <Badge variant="outline">{application.jobType}</Badge>
                  </div>
                  <div>
                    <span className="font-medium">Applied: </span>
                    <span className="text-muted-foreground">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Special Information */}
                {application.status === 'Interview Scheduled' && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Interview Details
                    </h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Date:</strong> {new Date(application.interviewDate!).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {application.interviewTime}</p>
                      <p><strong>Contact:</strong> {application.contactPerson} ({application.contactEmail})</p>
                    </div>
                  </div>
                )}

                {application.status === 'Offer Extended' && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Job Offer Details
                    </h4>
                    <div className="text-sm text-green-800 space-y-1">
                      <p><strong>Start Date:</strong> {new Date(application.startDate!).toLocaleDateString()}</p>
                      <p><strong>Response Deadline:</strong> {new Date(application.offerDeadline!).toLocaleDateString()}</p>
                      <p><strong>Contact:</strong> {application.contactPerson} ({application.contactEmail})</p>
                    </div>
                  </div>
                )}

                {application.status === 'Rejected' && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Application Status
                    </h4>
                    <div className="text-sm text-red-800">
                      <p><strong>Reason:</strong> {application.rejectionReason}</p>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {application.notes && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">Notes:</h5>
                    <p className="text-sm text-muted-foreground">{application.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Application
                  </Button>
                  {application.status !== 'Rejected' && (
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Contact Employer
                    </Button>
                  )}
                  {application.status === 'Offer Extended' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Respond to Offer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
