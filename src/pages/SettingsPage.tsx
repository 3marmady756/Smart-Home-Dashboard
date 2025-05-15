
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const SettingsPage = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your smart home preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your home preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="homeName">Home Name</Label>
                  <Input id="homeName" defaultValue="My Smart Home" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>America/New_York (Eastern Time)</option>
                    <option>America/Chicago (Central Time)</option>
                    <option>America/Denver (Mountain Time)</option>
                    <option>America/Los_Angeles (Pacific Time)</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoAway">Auto-Away Mode</Label>
                      <p className="text-sm text-muted-foreground">Automatically switch to Away mode when no one is home</p>
                    </div>
                    <Switch id="autoAway" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="energySaving">Energy Saving Mode</Label>
                      <p className="text-sm text-muted-foreground">Optimize device usage to save energy</p>
                    </div>
                    <Switch id="energySaving" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="vacationMode">Vacation Mode</Label>
                      <p className="text-sm text-muted-foreground">Simulate presence when you're away</p>
                    </div>
                    <Switch id="vacationMode" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="securityAlerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notifications about security events</p>
                    </div>
                    <Switch id="securityAlerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="deviceStatus">Device Status Changes</Label>
                      <p className="text-sm text-muted-foreground">Notifications when devices go online/offline</p>
                    </div>
                    <Switch id="deviceStatus" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="energyReports">Energy Reports</Label>
                      <p className="text-sm text-muted-foreground">Weekly energy consumption reports</p>
                    </div>
                    <Switch id="energyReports" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="firmware">Firmware Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications about device updates</p>
                    </div>
                    <Switch id="firmware" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataCollection">Usage Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve services</p>
                    </div>
                    <Switch id="dataCollection" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Enable additional security layer</p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>System configurations for advanced users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex">
                    <Input id="apiKey" defaultValue="sk_test_4eC39HqLyjWDarjtT1zdp7dc" className="rounded-r-none" />
                    <Button className="rounded-l-none">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Used for third-party integrations</p>
                </div>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="developerMode">Developer Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable advanced debugging features</p>
                    </div>
                    <Switch id="developerMode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="betaFeatures">Beta Features</Label>
                      <p className="text-sm text-muted-foreground">Try experimental features before release</p>
                    </div>
                    <Switch id="betaFeatures" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="destructive">
                    Factory Reset
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Warning: This will reset all devices and settings to factory defaults</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
