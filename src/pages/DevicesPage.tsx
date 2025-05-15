
import { useState } from "react";
import Layout from "../components/Layout";
import DeviceCard, { DeviceProps } from "@/components/DeviceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockDevices: DeviceProps[] = [
  { id: "1", name: "Living Room Light", type: "light", status: true, location: "Living Room" },
  { id: "2", name: "Kitchen Light", type: "light", status: false, location: "Kitchen" },
  { id: "3", name: "Bedroom Light", type: "light", status: true, location: "Bedroom" },
  { id: "4", name: "Kitchen Thermostat", type: "thermostat", status: true, location: "Kitchen", value: "72°F" },
  { id: "5", name: "Bedroom Thermostat", type: "thermostat", status: true, location: "Bedroom", value: "70°F" },
  { id: "6", name: "Front Door", type: "door", status: false, location: "Entrance" },
  { id: "7", name: "Back Door", type: "door", status: true, location: "Back Yard" },
  { id: "8", name: "Front Door Lock", type: "lock", status: true, location: "Entrance" },
  { id: "9", name: "Bedroom Fan", type: "fan", status: false, location: "Bedroom" },
  { id: "10", name: "Living Room TV", type: "tv", status: false, location: "Living Room" },
  { id: "11", name: "Dining Room Light", type: "light", status: false, location: "Dining Room" },
  { id: "12", name: "Office Light", type: "light", status: true, location: "Office" },
];

const DevicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          device.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentTab === "all") {
      return matchesSearch;
    }
    
    return device.type === currentTab && matchesSearch;
  });

  const devicesByType = {
    light: mockDevices.filter(d => d.type === "light").length,
    thermostat: mockDevices.filter(d => d.type === "thermostat").length,
    lock: mockDevices.filter(d => d.type === "lock").length,
    door: mockDevices.filter(d => d.type === "door").length,
    fan: mockDevices.filter(d => d.type === "fan").length,
    tv: mockDevices.filter(d => d.type === "tv").length,
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Devices</h1>
            <p className="text-muted-foreground">
              {mockDevices.length} total devices, {mockDevices.filter(d => d.status).length} active
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="all" 
            className="w-full md:w-auto"
            onValueChange={setCurrentTab}
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-7 w-full md:w-auto">
              <TabsTrigger value="all">
                All ({mockDevices.length})
              </TabsTrigger>
              <TabsTrigger value="light">
                Lights ({devicesByType.light})
              </TabsTrigger>
              <TabsTrigger value="thermostat">
                Climate ({devicesByType.thermostat})
              </TabsTrigger>
              <TabsTrigger value="lock">
                Locks ({devicesByType.lock})
              </TabsTrigger>
              <TabsTrigger value="door">
                Doors ({devicesByType.door})
              </TabsTrigger>
              <TabsTrigger value="fan">
                Fans ({devicesByType.fan})
              </TabsTrigger>
              <TabsTrigger value="tv">
                TVs ({devicesByType.tv})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
          
          {filteredDevices.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No devices found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? `No devices match "${searchQuery}"` : "Add some devices to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DevicesPage;
