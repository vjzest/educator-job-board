
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Award, 
  Plus, 
  Star, 
  Calendar, 
  MapPin,
  Building,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';

const EmployeeSkills = () => {
  const skillsData = {
    teachingSkills: [
      { name: 'Classroom Management', level: 90, experience: '5 years' },
      { name: 'Curriculum Development', level: 85, experience: '4 years' },
      { name: 'Student Assessment', level: 88, experience: '5 years' },
      { name: 'Differentiated Instruction', level: 82, experience: '3 years' },
      { name: 'Educational Technology', level: 78, experience: '3 years' },
      { name: 'Parent Communication', level: 85, experience: '4 years' }
    ],
    technicalSkills: [
      { name: 'Google Classroom', level: 95 },
      { name: 'Microsoft Office Suite', level: 90 },
      { name: 'Zoom/Online Teaching', level: 88 },
      { name: 'Interactive Whiteboards', level: 75 },
      { name: 'Educational Apps', level: 80 },
      { name: 'Learning Management Systems', level: 85 }
    ],
    workExperience: [
      {
        position: 'Mathematics Teacher',
        school: 'Lincoln High School',
        location: 'New York, NY',
        duration: 'Sep 2021 - Present',
        type: 'Full-time',
        responsibilities: [
          'Teach Algebra II and Geometry to 120+ students across 5 classes',
          'Develop engaging lesson plans using interactive teaching methods',
          'Coordinate with parents and administrators on student progress',
          'Lead after-school tutoring program for struggling students'
        ],
        achievements: [
          'Improved student test scores by 15% in first year',
          'Teacher of the Month - March 2023'
        ]
      },
      {
        position: 'Science Teacher',
        school: 'Roosevelt Middle School',
        location: 'Brooklyn, NY',
        duration: 'Aug 2019 - Aug 2021',
        type: 'Full-time',
        responsibilities: [
          'Taught 8th grade Physical Science to 90+ students',
          'Organized science fair and laboratory experiments',
          'Mentored new teachers in the science department',
          'Integrated technology into daily lesson plans'
        ],
        achievements: [
          'Science Department Innovation Award 2020',
          'Successfully launched school-wide STEM program'
        ]
      },
      {
        position: 'Substitute Teacher',
        school: 'Various Schools - NYC Department of Education',
        location: 'New York, NY',
        duration: 'Jan 2019 - Jul 2019',
        type: 'Part-time',
        responsibilities: [
          'Provided temporary instruction across multiple grade levels',
          'Adapted quickly to different classroom environments',
          'Maintained classroom discipline and followed lesson plans'
        ],
        achievements: [
          'Highly requested substitute teacher',
          'Perfect attendance record'
        ]
      }
    ],
    qualifications: [
      {
        title: 'Master of Education (M.Ed.)',
        institution: 'Columbia University Teachers College',
        year: '2019',
        gpa: '3.8/4.0',
        specialization: 'Mathematics Education'
      },
      {
        title: 'Bachelor of Science in Mathematics',
        institution: 'New York University',
        year: '2017',
        gpa: '3.6/4.0',
        specialization: 'Applied Mathematics'
      }
    ],
    certifications: [
      {
        name: 'New York State Teaching License',
        issuer: 'NYS Education Department',
        issued: '2019',
        expires: '2024',
        status: 'Active'
      },
      {
        name: 'TESOL Certification',
        issuer: 'TESOL International',
        issued: '2020',
        expires: 'Lifetime',
        status: 'Active'
      },
      {
        name: 'Google Certified Educator Level 2',
        issuer: 'Google for Education',
        issued: '2022',
        expires: '2025',
        status: 'Active'
      },
      {
        name: 'First Aid & CPR Certification',
        issuer: 'American Red Cross',
        issued: '2023',
        expires: '2025',
        status: 'Active'
      }
    ]
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Skills & Qualifications</h2>
          <p className="text-muted-foreground">Manage your professional skills, experience, and certifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload CV
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Teaching Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Teaching Skills
          </CardTitle>
          <CardDescription>Your core teaching competencies and experience levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.teachingSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{skill.experience}</Badge>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Technical Skills
          </CardTitle>
          <CardDescription>Your proficiency with educational technology and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.technicalSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Work Experience
          </CardTitle>
          <CardDescription>Your professional teaching experience and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {skillsData.workExperience.map((exp, index) => (
            <div key={index} className="border-l-2 border-primary pl-6 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{exp.position}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {exp.school}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{exp.type}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{exp.duration}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-2">Key Responsibilities:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-sm mb-2">Achievements:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Award className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Education Qualifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillsData.qualifications.map((qual, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-foreground">{qual.title}</h4>
                <p className="text-sm text-muted-foreground">{qual.institution}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">Graduated: {qual.year}</span>
                  <Badge variant="outline">GPA: {qual.gpa}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Specialization: {qual.specialization}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Professional Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillsData.certifications.map((cert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{cert.name}</h4>
                  <Badge className={getStatusColor(cert.status)}>
                    {cert.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>Issued: {cert.issued}</span>
                  <span>Expires: {cert.expires}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeSkills;
