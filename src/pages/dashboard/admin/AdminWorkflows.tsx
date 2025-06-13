import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, GitBranch, Calendar, Award } from "lucide-react";

// Demo Data (in a real app, this would come from your API)
const mockInterviews = [
  {
    id: "int-01",
    candidateName: "Alice Johnson",
    jobTitle: "Senior Science Teacher",
    collegeName: "Springfield University",
    interviewDate: "2024-11-05 at 10:00 AM",
  },
  {
    id: "int-02",
    candidateName: "Charlie Brown",
    jobTitle: "Mathematics Dept. Head",
    collegeName: "Greenwood College",
    interviewDate: "2024-11-06 at 2:30 PM",
  },
];

const mockOffers = [
  {
    id: "off-01",
    candidateName: "Bob Williams",
    jobTitle: "Physics Lab Assistant",
    collegeName: "Oakridge Academy",
    salary: "$52,000 / year",
  },
];

const AdminWorkflows = () => {
  const [activeTab, setActiveTab] = useState("interviews");

  const renderContent = () => {
    const items = activeTab === "interviews" ? mockInterviews : mockOffers;
    const type = activeTab === "interviews" ? "Interview" : "Offer";

    if (items.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No pending {type.toLowerCase()}s to review.</p>
          <p className="text-sm">You're all caught up!</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {item.candidateName}
                </p>
                <p className="text-sm text-muted-foreground">
                  For:{" "}
                  <span className="font-medium text-foreground">
                    {item.jobTitle}
                  </span>{" "}
                  at {item.collegeName}
                </p>
                <p className="text-sm mt-1 flex items-center gap-2">
                  {type === "Interview" ? (
                    <Calendar className="h-4 w-4" />
                  ) : (
                    <Award className="h-4 w-4" />
                  )}
                  {type === "Interview" ? item.interviewDate : item.salary}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" /> Confirm & Forward
                </Button>
                <Button size="sm" variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" /> Reject
                </Button>
              </div>
            </div>
            {index < items.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <GitBranch /> Workflows
        </h2>
        <p className="text-muted-foreground">
          Review and confirm critical hiring steps submitted by colleges.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Management</CardTitle>
          <CardDescription>
            Approve interview schedules and offer letters before they are sent
            to candidates.
          </CardDescription>
          <div className="mt-4 flex border-b">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("interviews")}
              className={`rounded-none border-b-2 ${activeTab === "interviews" ? "border-primary text-primary" : "border-transparent"}`}
            >
              Pending Interviews
              <Badge variant="secondary" className="ml-2">
                {mockInterviews.length}
              </Badge>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("offers")}
              className={`rounded-none border-b-2 ${activeTab === "offers" ? "border-primary text-primary" : "border-transparent"}`}
            >
              Pending Offers
              <Badge variant="secondary" className="ml-2">
                {mockOffers.length}
              </Badge>
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
};

export default AdminWorkflows;
