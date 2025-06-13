import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
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
  Briefcase,
  FileText,
  Globe,
  KeyRound,
  Mail,
  MapPin,
  Pencil,
  Phone,
} from "lucide-react";

// In a real app, this detailed info would also come from your Auth context or a separate API call.
const mockCollegeData = {
  description:
    "Springfield University is a leading institution dedicated to fostering the next generation of educators. We pride ourselves on innovation, community, and academic excellence.",
  website: "https://springfield.edu",
  phone: "(555) 123-4567",
  address: "123 College Ave, Springfield, IL 62704",
};

const stats = {
  jobsPosted: 25,
  activeOpenings: 4,
  totalApplications: 312,
};

const CollegeProfile = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // States for the edit form
  const [editedName, setEditedName] = useState(user?.name);
  const [editedWebsite, setEditedWebsite] = useState(mockCollegeData.website);
  const [editedPhone, setEditedPhone] = useState(mockCollegeData.phone);
  const [editedAddress, setEditedAddress] = useState(mockCollegeData.address);
  const [editedDescription, setEditedDescription] = useState(
    mockCollegeData.description
  );

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedData = {
      name: editedName,
      website: editedWebsite,
      phone: editedPhone,
      address: editedAddress,
      description: editedDescription,
    };
    // In a real app, you'd send this to your API
    console.log("Saving changes:", updatedData);
    setIsDialogOpen(false); // Close the dialog
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          College Profile
        </h2>
        <p className="text-muted-foreground">
          View and manage your institution's public profile and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={`https://logo.clearbit.com/${mockCollegeData.website}`}
                  alt={user?.name}
                />
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <CardDescription>
                  Your institution's public information.
                </CardDescription>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Institution Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveChanges} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Institution Name</Label>
                    <Input
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={editedWebsite}
                      onChange={(e) => setEditedWebsite(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              <p className="text-muted-foreground">
                {mockCollegeData.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Contact Email
                  </p>
                  <a
                    href={`mailto:${user?.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {user?.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {mockCollegeData.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Website</p>
                  <a
                    href={mockCollegeData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {mockCollegeData.website}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {mockCollegeData.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Cards */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Your activity at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">Jobs Posted</span>
                </div>
                <span className="font-bold text-lg">{stats.jobsPosted}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    Active Openings
                  </span>
                </div>
                <span className="font-bold text-lg">
                  {stats.activeOpenings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    Total Applications
                  </span>
                </div>
                <span className="font-bold text-lg">
                  {stats.totalApplications}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account security.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <KeyRound className="mr-2 h-4 w-4" /> Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;
