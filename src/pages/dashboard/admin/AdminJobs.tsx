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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Search,
  PlusCircle,
  CheckCircle,
  XCircle,
  Trash2,
  Pencil,
  Eye,
} from "lucide-react";

const mockJobs = [
  {
    id: "job-001",
    title: "Senior Math Teacher",
    collegeName: "Springfield University",
    datePosted: "2024-10-28",
    status: "pending",
  },
  {
    id: "job-002",
    title: "Physics Lab Assistant",
    collegeName: "Oakridge Academy",
    datePosted: "2024-10-27",
    status: "active",
  },
  {
    id: "job-003",
    title: "History Department Head",
    collegeName: "Greenwood College",
    datePosted: "2024-10-26",
    status: "active",
  },
  {
    id: "job-004",
    title: "Librarian",
    collegeName: "City Central Institute",
    datePosted: "2024-10-25",
    status: "rejected",
  },
  {
    id: "job-005",
    title: "Art Instructor",
    collegeName: "Creative Minds School",
    datePosted: "2024-10-24",
    status: "pending",
  },
  {
    id: "job-006",
    title: "Sports Coach",
    collegeName: "Springfield University",
    datePosted: "2024-10-22",
    status: "closed",
  },
];

// === THIS FUNCTION HAS BEEN CORRECTED ===
const getStatusVariant = (status) => {
  switch (status) {
    case "active":
      return "default"; // Using the primary theme color for 'active'
    case "pending":
      return "secondary"; // 'secondary' is good for statuses needing attention
    case "rejected":
      return "destructive"; // This is correct
    case "closed":
      return "outline"; // 'outline' is good for neutral, historical statuses
    default:
      return "secondary";
  }
};
// =========================================

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesTab = activeTab === "all" || job.status === activeTab;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.collegeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Manage Jobs</h2>
        <p className="text-muted-foreground">
          Approve, reject, and oversee all job postings on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>
                Oversee all job postings from colleges.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs or colleges..."
                  className="pl-8 sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Job
              </Button>
            </div>
          </div>
          <div className="mt-4 flex border-b">
            <Button
              variant={activeTab === "all" ? "ghost" : "ghost"}
              onClick={() => setActiveTab("all")}
              className={`rounded-none border-b-2 ${activeTab === "all" ? "border-primary text-primary" : "border-transparent"}`}
            >
              All
            </Button>
            <Button
              variant={activeTab === "pending" ? "ghost" : "ghost"}
              onClick={() => setActiveTab("pending")}
              className={`rounded-none border-b-2 ${activeTab === "pending" ? "border-primary text-primary" : "border-transparent"}`}
            >
              Pending
            </Button>
            <Button
              variant={activeTab === "active" ? "ghost" : "ghost"}
              onClick={() => setActiveTab("active")}
              className={`rounded-none border-b-2 ${activeTab === "active" ? "border-primary text-primary" : "border-transparent"}`}
            >
              Active
            </Button>
            <Button
              variant={activeTab === "rejected" ? "ghost" : "ghost"}
              onClick={() => setActiveTab("rejected")}
              className={`rounded-none border-b-2 ${activeTab === "rejected" ? "border-primary text-primary" : "border-transparent"}`}
            >
              Rejected
            </Button>
            <Button
              variant={activeTab === "closed" ? "ghost" : "ghost"}
              onClick={() => setActiveTab("closed")}
              className={`rounded-none border-b-2 ${activeTab === "closed" ? "border-primary text-primary" : "border-transparent"}`}
            >
              Closed
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Date Posted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {job.collegeName}
                    </TableCell>
                    <TableCell>{job.datePosted}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(job.status)}
                        className="capitalize"
                      >
                        {job.status}
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
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          {job.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />{" "}
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500 hover:text-red-500 focus:text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
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
                    No jobs found for the selected filter.
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

export default AdminJobs;
