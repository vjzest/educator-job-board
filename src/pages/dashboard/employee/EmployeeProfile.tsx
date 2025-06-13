
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  GraduationCap, 
  Award, 
  BookOpen,
  Edit,
  Upload,
  FileText,
  Star
} from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuth();

  const profileData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    dateOfBirth: '1990-05-15',
    profileImage: '',
    bio: 'Passionate educator with 5+ years of experience in teaching mathematics and science. Committed to creating engaging learning environments that foster student growth and academic excellence.',
    experience: '5 years',
    education: [
      {
        degree: 'Master of Education',
        institution: 'Columbia University',
        year: '2019',
        gpa: '3.8'
      },
      {
        degree: 'Bachelor of Science in Mathematics',
        institution: 'New York University',
        year: '2017',
        gpa: '3.6'
      }
    ],
    certifications: [
      'Teaching License - New York State',
      'TESOL Certification',
      'Google Certified Educator Level 2',
      'First Aid & CPR Certified'
    ],
    subjects: ['Mathematics', 'Physics', 'Algebra', 'Geometry', 'Calculus'],
    languages: ['English (Native)', 'Spanish (Conversational)', 'French (Basic)'],
    availability: 'Full-time',
    salaryExpectation: '$45,000 - $65,000'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and professional details</p>
        </div>
        <Button className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profileData.profileImage} />
                <AvatarFallback className="text-2xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="mt-4 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2">{profileData.name}</h3>
              <p className="text-muted-foreground mb-4">{profileData.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Badge variant="secondary">{profileData.availability}</Badge>
                <Badge variant="outline">{profileData.experience} Experience</Badge>
                <Badge variant="outline">{profileData.salaryExpectation}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">{edu.year}</span>
                  <Badge variant="outline">GPA: {edu.gpa}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teaching Subjects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Teaching Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profileData.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profileData.languages.map((language, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span className="text-sm">{language}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your profile to increase your chances of getting hired</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Profile completeness</span>
              <Badge className="bg-green-100 text-green-800">85%</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Add teaching portfolio and upload CV to reach 100%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeProfile;
