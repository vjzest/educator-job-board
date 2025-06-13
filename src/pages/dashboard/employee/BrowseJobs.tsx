
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Clock, GraduationCap, Search, Filter, Briefcase } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchJobs, setSearchQuery, applyToJob } from '@/store/slices/jobSlice';
import { useToast } from '@/hooks/use-toast';

const BrowseJobs = () => {
  const dispatch = useAppDispatch();
  const { jobs, isLoading, searchQuery } = useAppSelector(state => state.jobs);
  const { toast } = useToast();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    dispatch(fetchJobs({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearchQuery));
    dispatch(fetchJobs({ query: localSearchQuery }));
  };

  const handleApply = async (jobId: string, jobTitle: string) => {
    try {
      await dispatch(applyToJob({ jobId, applicationData: {} })).unwrap();
      toast({
        title: "Application Submitted",
        description: `Your application for ${jobTitle} has been submitted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Browse Jobs</h2>
          <p className="text-muted-foreground">Find and apply to teaching positions</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
        
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-3">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Browse Jobs</h2>
        <p className="text-muted-foreground">Find and apply to teaching positions</p>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by job title, school, or subject..." 
                  className="pl-10"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="grid gap-6">
        {jobs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or check back later for new opportunities.</p>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground">
                      {job.school}
                    </CardDescription>
                  </div>
                  <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <span className="text-lg font-semibold text-foreground">{job.salary}</span>
                    <span className="text-sm text-muted-foreground ml-2">per year</span>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.subjects.map((subject, index) => (
                        <Badge key={index} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Requirements:</p>
                    <p className="text-sm text-muted-foreground">{job.requirements}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => handleApply(job.id, job.title)}
                    >
                      Apply Now
                    </Button>
                    <Button variant="outline">Save Job</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {jobs.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="w-full md:w-auto">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;
