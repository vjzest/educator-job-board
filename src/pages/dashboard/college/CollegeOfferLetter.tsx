import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MoreHorizontal,
  PlusCircle,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

// Demo data - in a real app, this would come from your API
const offerData = [
  {
    id: "OL-001",
    candidateName: "Jane Doe",
    jobTitle: "Senior Science Teacher",
    dateSent: "2024-10-25",
    status: "Accepted",
  },
  {
    id: "OL-002",
    candidateName: "John Smith",
    jobTitle: "Mathematics Department Head",
    dateSent: "2024-10-22",
    status: "Sent",
  },
  {
    id: "OL-003",
    candidateName: "Emily White",
    jobTitle: "Art Instructor",
    dateSent: "2024-10-20",
    status: "Declined",
  },
  {
    id: "OL-004",
    candidateName: "Michael Brown",
    jobTitle: "Sports Coach",
    dateSent: "2024-10-18",
    status: "Pending Admin Approval",
  },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Accepted":
      return "success";
    case "Sent":
      return "default";
    case "Declined":
      return "destructive";
    case "Pending Admin Approval":
      return "warning";
    default:
      return "secondary";
  }
};

const CollegeOfferLetter = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // In a real app, this function would handle form submission to the API
  const handleSendOffer = (e) => {
    e.preventDefault();
    console.log("Sending offer...");
    // Here you would collect form data and send it to your backend
    setIsDialogOpen(false); // Close the dialog on submission
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Offer Letters
        </h2>
        <p className="text-muted-foreground">
          Finalize hiring decisions and manage official offers for your college.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Offer Letter Management</CardTitle>
            <CardDescription>
              Create, send, and track offer letters to selected candidates.
            </CardDescription>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create Offer Letter</DialogTitle>
                <DialogDescription>
                  Fill in the details below. The offer will be sent to the Admin
                  for final approval before reaching the candidate.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSendOffer}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="candidate" className="text-right">
                      Candidate
                    </Label>
                    <Input
                      id="candidate"
                      placeholder="e.g., Jane Doe"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-title" className="text-right">
                      Job Title
                    </Label>
                    <Input
                      id="job-title"
                      placeholder="e.g., Senior Science Teacher"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="salary" className="text-right">
                      Salary ($)
                    </Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="e.g., 55000"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-date" className="text-right">
                      Start Date
                    </Label>
                    <Input id="start-date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="notes" className="text-right pt-2">
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional terms or comments..."
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Send to Admin for Approval</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offerData.length > 0 ? (
                offerData.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">
                      {offer.candidateName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {offer.jobTitle}
                    </TableCell>
                    <TableCell>{offer.dateSent}</TableCell>
                    <TableCell>
                      {/* <Badge variant={getStatusVariant(offer.status)}>
                        {offer.status}
                      </Badge> */}
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
                            <Eye className="mr-2 h-4 w-4" />
                            View Offer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 hover:text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Revoke Offer
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
                    No offer letters have been sent yet.
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

export default CollegeOfferLetter;
