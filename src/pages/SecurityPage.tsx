
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, DoorOpen, Bell, AlertTriangle, Camera, PlayCircleIcon, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SecurityPage = () => {
  const [securityMode, setSecurityMode] = useState<"armed" | "home" | "disarmed">("home");
  
  const handleSecurityChange = (mode: "armed" | "home" | "disarmed") => {
    setSecurityMode(mode);
    
    toast.success(`Security system ${mode}`, {
      description: mode === "armed" ? "Full security enabled" : 
                  mode === "home" ? "Home monitoring active" : 
                  "System disarmed"
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Security</h1>
          <p className="text-muted-foreground">Monitor and manage your home security system</p>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Security System</CardTitle>
                <CardDescription>Current status: 
                  <Badge 
                    className={cn(
                      "ml-2",
                      securityMode === "armed" ? "bg-destructive" : 
                      securityMode === "home" ? "bg-primary" : 
                      "bg-muted"
                    )}
                  >
                    {securityMode === "armed" ? "Armed Away" : 
                    securityMode === "home" ? "Armed Home" : 
                    "Disarmed"}
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex">
                <Shield className={cn(
                  "h-12 w-12",
                  securityMode === "armed" ? "text-destructive" : 
                  securityMode === "home" ? "text-primary" : 
                  "text-muted-foreground"
                )} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Button 
                variant={securityMode === "armed" ? "destructive" : "outline"} 
                className="w-full"
                onClick={() => handleSecurityChange("armed")}
              >
                Arm Away
              </Button>
              <Button 
                variant={securityMode === "home" ? "default" : "outline"} 
                className="w-full"
                onClick={() => handleSecurityChange("home")}
              >
                Arm Home
              </Button>
              <Button 
                variant={securityMode === "disarmed" ? "secondary" : "outline"} 
                className="w-full"
                onClick={() => handleSecurityChange("disarmed")}
              >
                Disarm
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Door Status</CardTitle>
              <CardDescription>Monitor entry points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Front Door", status: "locked" },
                { name: "Back Door", status: "locked" },
                { name: "Garage Door", status: "locked" },
                { name: "Patio Door", status: "unlocked" }
              ].map((door, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center">
                    {door.status === "locked" ? 
                      <Lock className="h-4 w-4 mr-2 text-green-500" /> : 
                      <DoorOpen className="h-4 w-4 mr-2 text-amber-500" />
                    }
                    <span>{door.name}</span>
                  </div>
                  <Badge variant={door.status === "locked" ? "outline" : "secondary"}>
                    {door.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { time: "10:23 AM", description: "Motion detected - Front Yard", type: "motion" },
                { time: "8:45 AM", description: "Patio Door unlocked", type: "door" },
                { time: "Yesterday, 11:52 PM", description: "Front Door locked", type: "door" },
                { time: "Yesterday, 9:30 PM", description: "System armed (Away)", type: "system" }
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center">
                    {alert.type === "motion" ? (
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    ) : alert.type === "door" ? (
                      <Lock className="h-4 w-4 mr-2 text-blue-500" />
                    ) : (
                      <Bell className="h-4 w-4 mr-2 text-primary" />
                    )}
                    <div>
                      <p className="text-sm">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Cameras</h2>
          
          <Tabs defaultValue="live" className="mb-4">
            <TabsList>
              <TabsTrigger value="live">Live View</TabsTrigger>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
            </TabsList>
            <TabsContent value="live" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {["Front Door", "Back Yard", "Driveway", "Living Room"].map((camera, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-muted relative flex items-center justify-center">
                      <Camera className="h-12 w-12 text-muted-foreground/50" />
                      <div className="absolute top-2 left-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                        {camera}
                      </div>
                      <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 rounded-full">
                        <PlayCircleIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recordings">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {[
                    { time: "10:23 AM", camera: "Front Yard", duration: "00:32" },
                    { time: "9:45 AM", camera: "Driveway", duration: "01:17" },
                    { time: "8:30 AM", camera: "Back Yard", duration: "00:45" },
                    { time: "Yesterday, 10:15 PM", camera: "Front Door", duration: "02:03" }
                  ].map((recording, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <History className="h-4 w-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{recording.camera}</p>
                          <p className="text-xs text-muted-foreground">{recording.time} • {recording.duration}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <PlayCircleIcon className="h-4 w-4 mr-1" /> Play
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityPage;
