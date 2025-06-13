import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  FileText,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

// Demo Data (in a real app, this would come from your API)
const jobPostings = [
  { id: "job1", title: "Senior Science Teacher" },
  { id: "job2", title: "Mathematics Department Head" },
  { id: "job3", title: "Art Instructor" },
];

const applications = [
  {
    id: "app1",
    name: "Alice Johnson",
    jobAppliedFor: "Senior Science Teacher",
    applicationDate: "2024-10-28",
    status: "New Application",
  },
  {
    id: "app2",
    name: "Bob Williams",
    jobAppliedFor: "Senior Science Teacher",
    applicationDate: "2024-10-27",
    status: "Shortlisted",
  },
  {
    id: "app3",
    name: "Charlie Brown",
    jobAppliedFor: "Mathematics Department Head",
    applicationDate: "2024-10-26",
    status: "New Application",
  },
  {
    id: "app4",
    name: "Diana Miller",
    jobAppliedFor: "Art Instructor",
    applicationDate: "2024-10-25",
    status: "Interview Scheduled",
  },
  {
    id: "app5",
    name: "Ethan Davis",
    jobAppliedFor: "Senior Science Teacher",
    applicationDate: "2024-10-24",
    status: "Rejected",
  },
  {
    id: "app6",
    name: "Fiona Garcia",
    jobAppliedFor: "Mathematics Department Head",
    applicationDate: "2024-10-23",
    status: "Shortlisted",
  },
  {
    id: "app7",
    name: "George Harris",
    jobAppliedFor: "Art Instructor",
    applicationDate: "2024-10-22",
    status: "New Application",
  },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Shortlisted":
      return "default";
    case "Interview Scheduled":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};

const CollegeApplications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesJob =
      selectedJob === "all" ||
      app.jobAppliedFor ===
        jobPostings.find((j) => j.id === selectedJob)?.title;
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesJob && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          View Applications
        </h2>
        <p className="text-muted-foreground">
          Review all applications submitted for your job posts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Received Applications</CardTitle>
          <CardDescription>
            Filter and search through all applications to find the best
            candidates.
          </CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by candidate name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobPostings.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New Application">New Application</SelectItem>
                <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                <SelectItem value="Interview Scheduled">
                  Interview Scheduled
                </SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.jobAppliedFor}
                    </TableCell>
                    <TableCell>{app.applicationDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                            Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 hover:text-red-500">
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No applications match your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeApplications;
