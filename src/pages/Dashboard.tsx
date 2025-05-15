
import { 
  LightbulbIcon, 
  ThermometerIcon, 
  ShieldIcon, 
  BatteryMediumIcon, 
  ActivityIcon,
  UsersIcon,
} from "lucide-react";
import Layout from "../components/Layout";
import DeviceCard, { DeviceProps } from "@/components/DeviceCard";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const topDevices: DeviceProps[] = [
  { 
    id: "1", 
    name: "Living Room Light", 
    type: "light", 
    status: true, 
    location: "Living Room" 
  },
  { 
    id: "2", 
    name: "Kitchen Thermostat", 
    type: "thermostat", 
    status: true, 
    location: "Kitchen", 
    value: "72°F" 
  },
  { 
    id: "3", 
    name: "Front Door", 
    type: "lock", 
    status: true, 
    location: "Entrance" 
  },
  { 
    id: "4", 
    name: "Bedroom Fan", 
    type: "fan", 
    status: false, 
    location: "Bedroom" 
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome home! Your smart home at a glance.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Active Devices" 
            value="12 / 15" 
            description="80% of devices online" 
            icon={<LightbulbIcon className="h-4 w-4" />} 
          />
          <StatsCard 
            title="Temperature" 
            value="72°F" 
            description="Optimal range: 68-75°F" 
            icon={<ThermometerIcon className="h-4 w-4" />} 
          />
          <StatsCard 
            title="Security" 
            value="Secure" 
            description="All entry points locked" 
            icon={<ShieldIcon className="h-4 w-4" />} 
          />
          <StatsCard 
            title="Energy Usage" 
            value="7.2 kWh" 
            description="12% less than yesterday" 
            icon={<BatteryMediumIcon className="h-4 w-4" />} 
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full md:col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Energy Consumption</CardTitle>
              <CardDescription>Your energy usage over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="text-center">
                <ActivityIcon className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Energy usage visualization</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Home Occupancy</CardTitle>
              <CardDescription>People currently at home</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center pt-4">
                <div className="text-center">
                  <UsersIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-4xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground mt-1">Family members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Access</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {topDevices.map((device) => (
              <DeviceCard
                key={device.id}
                {...device}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
