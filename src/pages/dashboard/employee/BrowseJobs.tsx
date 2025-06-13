
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, GraduationCap, Search, Filter } from 'lucide-react';

const BrowseJobs = () => {
  const jobListings = [
    {
      id: 1,
      title: 'Mathematics Teacher',
      school: 'Springfield Elementary School',
      location: 'Springfield, IL',
      type: 'Full-time',
      experience: '2-5 years',
      salary: '$45,000 - $55,000',
      posted: '2 days ago',
      subjects: ['Mathematics', 'Algebra', 'Geometry'],
      requirements: 'Bachelor\'s degree in Mathematics or Education'
    },
    {
      id: 2,
      title: 'Science Teacher',
      school: 'Oak Hill High School',
      location: 'Madison, WI',
      type: 'Full-time',
      experience: '3-7 years',
      salary: '$50,000 - $65,000',
      posted: '5 days ago',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      requirements: 'Master\'s degree in Science Education preferred'
    },
    {
      id: 3,
      title: 'English Teacher',
      school: 'Central Middle School',
      location: 'Chicago, IL',
      type: 'Part-time',
      experience: '1-3 years',
      salary: '$35,000 - $45,000',
      posted: '1 week ago',
      subjects: ['English Literature', 'Creative Writing'],
      requirements: 'Bachelor\'s degree in English or Literature'
    },
    {
      id: 4,
      title: 'Art Teacher',
      school: 'Riverside Academy',
      location: 'Milwaukee, WI',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '$42,000 - $52,000',
      posted: '3 days ago',
      subjects: ['Visual Arts', 'Drawing', 'Painting'],
      requirements: 'Bachelor\'s degree in Fine Arts or Art Education'
    }
  ];

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

      {/* Job Listings */}
      <div className="grid gap-6">
        {jobListings.map((job) => (
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
                    <span>Posted {job.posted}</span>
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
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline">Save Job</Button>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="w-full md:w-auto">
          Load More Jobs
        </Button>
      </div>
    </div>
  );
};

export default BrowseJobs;
