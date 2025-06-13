
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Shield, Mail, Database, Users, Bell } from 'lucide-react';

const AdminSettings = () => {
  const settingsCategories = [
    {
      title: 'Platform Configuration',
      icon: Settings,
      settings: [
        { name: 'Site Name', type: 'input', value: 'TeacherConnect', description: 'The name displayed across the platform' },
        { name: 'Registration Open', type: 'switch', value: true, description: 'Allow new user registrations' },
        { name: 'Maintenance Mode', type: 'switch', value: false, description: 'Put the platform in maintenance mode' },
        { name: 'Job Approval Required', type: 'switch', value: true, description: 'Require admin approval for new job posts' }
      ]
    },
    {
      title: 'User Management',
      icon: Users,
      settings: [
        { name: 'Auto-approve Employers', type: 'switch', value: false, description: 'Automatically approve college registrations' },
        { name: 'Max Applications per User', type: 'input', value: '10', description: 'Maximum job applications per employee' },
        { name: 'Profile Verification Required', type: 'switch', value: true, description: 'Require profile verification for new users' }
      ]
    },
    {
      title: 'Email Notifications',
      icon: Mail,
      settings: [
        { name: 'Welcome Email', type: 'switch', value: true, description: 'Send welcome email to new users' },
        { name: 'Application Notifications', type: 'switch', value: true, description: 'Notify employers of new applications' },
        { name: 'Daily Report Email', type: 'input', value: 'admin@teacherconnect.com', description: 'Email for daily activity reports' }
      ]
    },
    {
      title: 'Security Settings',
      icon: Shield,
      settings: [
        { name: 'Two-Factor Authentication', type: 'switch', value: false, description: 'Require 2FA for admin accounts' },
        { name: 'Session Timeout', type: 'select', value: '24', options: ['1', '8', '24', '72'], description: 'Hours before automatic logout' },
        { name: 'Password Policy', type: 'switch', value: true, description: 'Enforce strong password requirements' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Admin Settings</h2>
        <p className="text-muted-foreground">Configure platform-wide settings</p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">Online</div>
              <div className="text-sm text-muted-foreground">Database Status</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime (30 days)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      {settingsCategories.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <category.icon className="h-5 w-5" />
              {category.title}
            </CardTitle>
            <CardDescription>
              Configure {category.title.toLowerCase()} options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {category.settings.map((setting, settingIndex) => (
              <div key={settingIndex} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">{setting.name}</Label>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <div className="w-64">
                  {setting.type === 'switch' && (
                    <Switch defaultChecked={setting.value as boolean} />
                  )}
                  {setting.type === 'input' && (
                    <Input defaultValue={setting.value as string} />
                  )}
                  {setting.type === 'select' && (
                    <Select defaultValue={setting.value as string}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {setting.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option} hours
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Backup & Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup & Maintenance
          </CardTitle>
          <CardDescription>
            Database and system maintenance options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Last Backup</Label>
              <p className="text-sm text-muted-foreground">2025-01-12 03:00 AM</p>
            </div>
            <Button variant="outline">Create Backup</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">System Logs</Label>
              <p className="text-sm text-muted-foreground">Download system activity logs</p>
            </div>
            <Button variant="outline">Download Logs</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Clear Cache</Label>
              <p className="text-sm text-muted-foreground">Clear system cache and temporary files</p>
            </div>
            <Button variant="outline">Clear Cache</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save All Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
