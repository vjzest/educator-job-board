import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  ToggleRight,
  Tags,
  Send,
  FileClock,
  Database,
  PlusCircle,
  X,
} from "lucide-react";

const AdminControlPanel = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [categories, setCategories] = useState([
    "Mathematics",
    "Science",
    "History",
    "Physical Education",
    "Arts",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("all");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  const handleSendMessage = () => {
    if (!broadcastMessage) {
      alert("Message cannot be empty.");
      return;
    }
    // In a real app, this would trigger a backend process
    console.log(`Sending message to ${broadcastTarget}: "${broadcastMessage}"`);
    alert(`Message sent to ${broadcastTarget}.`);
    setBroadcastMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Shield /> Control Panel
        </h2>
        <p className="text-muted-foreground">
          Manage system-wide settings, content, and platform integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ToggleRight /> System Status
            </CardTitle>
            <CardDescription>
              Control the global status of the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="maintenance-mode" className="font-semibold">
                  Maintenance Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable access for non-admins.
                </p>
              </div>
              <Switch
                id="maintenance-mode"
                checked={isMaintenanceMode}
                onCheckedChange={setIsMaintenanceMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Management Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags /> Content Management
            </CardTitle>
            <CardDescription>Manage global job categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <Label>Existing Categories</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[40px]">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {cat}
                    <button
                      onClick={() => handleRemoveCategory(cat)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button onClick={handleAddCategory}>
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Broadcast Message Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send /> Broadcast Message
            </CardTitle>
            <CardDescription>
              Send an announcement to all users or a specific group.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={broadcastTarget} onValueChange={setBroadcastTarget}>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="colleges">All Colleges</SelectItem>
                <SelectItem value="teachers">All Teachers</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Type your message here..."
              rows={4}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSendMessage} className="w-full">
              Send Broadcast
            </Button>
          </CardFooter>
        </Card>

        {/* System Integrity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database /> System Integrity & Data
            </CardTitle>
            <CardDescription>
              Monitor logs and manage system data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">System Health</p>
              <div className="flex items-center gap-2 text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                Operational
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Audit Log</p>
              <Button variant="outline" size="sm">
                <FileClock className="mr-2 h-4 w-4" /> View Full Log
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Database Backup</p>
                <p className="text-sm text-muted-foreground">
                  Last backup: 2 hours ago
                </p>
              </div>
              <Button variant="secondary">Trigger Manual Backup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminControlPanel;
