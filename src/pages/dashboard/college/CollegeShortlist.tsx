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
import {
  MoreHorizontal,
  FileText,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

const jobPostings = [
  { id: "job1", title: "Senior Science Teacher" },
  { id: "job2", title: "Mathematics Department Head" },
  { id: "job3", title: "Art Instructor" },
];

const candidates = [
  {
    id: "cand1",
    name: "Alice Johnson",
    jobAppliedFor: "Senior Science Teacher",
    applicationDate: "2024-10-28",
    status: "New Application",
    resumeUrl: "#",
  },
  {
    id: "cand2",
    name: "Bob Williams",
    jobAppliedFor: "Senior Science Teacher",
    applicationDate: "2024-10-27",
    status: "Shortlisted",
    resumeUrl: "#",
  },
  {
    id: "cand3",
    name: "Charlie Brown",
    jobAppliedFor: "Mathematics Department Head",
    applicationDate: "2024-10-26",
    status: "New Application",
    resumeUrl: "#",
  },
  {
    id: "cand4",
    name: "Diana Miller",
    jobAppliedFor: "Art Instructor",
    applicationDate: "2024-10-25",
    status: "Interview Scheduled",
    resumeUrl: "#",
  },
  {
    id: "cand5",
    name: "Ethan Davis",
    jobAppliedFor: "Senior Science Teacher",
    applicationDate: "2024-10-24",
    status: "Rejected",
    resumeUrl: "#",
  },
  {
    id: "cand6",
    name: "Fiona Garcia",
    jobAppliedFor: "Mathematics Department Head",
    applicationDate: "2024-10-23",
    status: "Shortlisted",
    resumeUrl: "#",
  },
];

// === THIS FUNCTION HAS BEEN CORRECTED ===
const getStatusVariant = (status) => {
  switch (status) {
    case "Shortlisted":
      return "default"; // Using the primary color for positive status
    case "Interview Scheduled":
      return "secondary";
    case "Rejected":
      return "destructive";
    case "New Application":
    default:
      return "outline"; // Outline is great for neutral/pending status
  }
};
// =========================================

const CollegeShortlist = () => {
  const [selectedJob, setSelectedJob] = useState("all");

  const filteredCandidates = candidates.filter(
    (candidate) =>
      selectedJob === "all" ||
      candidate.jobAppliedFor ===
        jobPostings.find((job) => job.id === selectedJob)?.title
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Shortlist Candidates
        </h2>
        <p className="text-muted-foreground">
          Review, shortlist, and manage applicants for your job openings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Candidate Management</CardTitle>
              <CardDescription>
                Review applicants and move them through the hiring pipeline.
              </CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by job..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Posts</SelectItem>
                  {jobPostings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">
                      {candidate.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {candidate.jobAppliedFor}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(candidate.status)}>
                        {candidate.status}
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
                            <FileText className="mr-2 h-4 w-4" /> View Profile /
                            CV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                            Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4 text-blue-500" />{" "}
                            Schedule Interview
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
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No applicants found for this job.
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

export default CollegeShortlist;
