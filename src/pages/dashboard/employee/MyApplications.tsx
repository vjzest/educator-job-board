
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchApplications, withdrawApplication } from '@/store/slices/applicationSlice';
import { useToast } from '@/components/ui/use-toast';

const MyApplications = () => {
  const dispatch = useAppDispatch();
  const { applications, stats, isLoading } = useAppSelector(state => state.applications);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Offer Extended':
        return 'bg-green-100 text-green-800';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleWithdrawApplication = async (applicationId: string) => {
    try {
      await dispatch(withdrawApplication(applicationId)).unwrap();
      toast({
        title: "Application Withdrawn",
        description: "Your application has been withdrawn successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to withdraw application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">My Applications</h2>
          <p className="text-muted-foreground">Track your job applications and manage your career progress</p>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

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
        {applications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
              <p className="text-muted-foreground">Start applying to jobs to track your progress here.</p>
            </CardContent>
          </Card>
        ) : (
          applications.map((application) => (
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
                    <Badge className={getStatusColor(application.status)}>
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
                      <span>
                        {application.status === 'Offer Extended' ? '100' : 
                         application.status === 'Interview Scheduled' ? '75' :
                         application.status === 'Under Review' ? '50' :
                         application.status === 'Rejected' ? '25' : '25'}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(
                          application.status === 'Offer Extended' ? 100 : 
                          application.status === 'Interview Scheduled' ? 75 :
                          application.status === 'Under Review' ? 50 : 25
                        )}`}
                        style={{ 
                          width: `${
                            application.status === 'Offer Extended' ? 100 : 
                            application.status === 'Interview Scheduled' ? 75 :
                            application.status === 'Under Review' ? 50 : 25
                          }%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Applied: </span>
                      <span className="text-muted-foreground">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Documents: </span>
                      <span className="text-muted-foreground">{application.documents.length} files</span>
                    </div>
                  </div>

                  {/* Special Information */}
                  {application.status === 'Interview Scheduled' && application.interviewDate && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Interview Details
                      </h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Date:</strong> {new Date(application.interviewDate).toLocaleDateString()}</p>
                        {application.interviewTime && (
                          <p><strong>Time:</strong> {application.interviewTime}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {application.status === 'Offer Extended' && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Job Offer Extended
                      </h4>
                      <div className="text-sm text-green-800">
                        <p>Congratulations! You have received a job offer.</p>
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
                        <p>Unfortunately, your application was not successful this time.</p>
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
                    {application.status !== 'Rejected' && application.status !== 'Offer Extended' && (
                      <>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Contact Employer
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleWithdrawApplication(application.id)}
                        >
                          Withdraw
                        </Button>
                      </>
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
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;
