import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Make sure you have this utility function

// Note: For the Date Picker to work, you need to have installed:
// npm install date-fns react-day-picker

const CollegePostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [deadline, setDeadline] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      jobTitle,
      jobType,
      location,
      salary,
      description,
      responsibilities,
      qualifications,
      deadline: deadline ? format(deadline, "yyyy-MM-dd") : null,
    };

    // In a real application, you would send this data to your API
    console.log("Job Data Submitted:", jobData);

    // Here you can add logic to show a success message or redirect the user
    alert("Job submitted for admin approval!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Post a New Job
        </h2>
        <p className="text-muted-foreground">
          Create a new job listing for your college. It will be sent for admin
          approval upon submission.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job Posting Form</CardTitle>
            <CardDescription>
              Fill in the details below to create a new job opening.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Section 1: Core Job Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., Senior English Teacher"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select onValueChange={setJobType} value={jobType}>
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section 2: Description and Responsibilities */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the role..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="List the main responsibilities, one per line..."
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="qualifications">Required Qualifications</Label>
                <Textarea
                  id="qualifications"
                  placeholder="List required skills and qualifications, one per line..."
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Section 3: Location, Salary, and Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Springfield, IL"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="salary">Salary Range (Annual)</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $50,000 - $65,000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? (
                        format(deadline, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Submission Button */}
            <div className="flex justify-end">
              <Button type="submit">Submit for Admin Approval</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CollegePostJob;
