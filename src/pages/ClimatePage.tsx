
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Thermometer, Fan, Droplets } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClimatePage = () => {
  const [temperature, setTemperature] = useState(72);
  const [mode, setMode] = useState("cool");
  const [fanSpeed, setFanSpeed] = useState(2);

  const increaseTemp = () => {
    if (temperature < 90) {
      setTemperature(temperature + 1);
      toast.success(`Temperature set to ${temperature + 1}°F`);
    }
  };

  const decreaseTemp = () => {
    if (temperature > 60) {
      setTemperature(temperature - 1);
      toast.success(`Temperature set to ${temperature - 1}°F`);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Climate Control</h1>
          <p className="text-muted-foreground">Manage temperature and humidity throughout your home</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle>Main Thermostat</CardTitle>
              <CardDescription>Living Room</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-2">
              <div className="flex items-center justify-center w-48 h-48 rounded-full border-8 border-primary/20 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold">{temperature}°F</div>
                  <div className="text-sm text-muted-foreground mt-1">Current: 73°F</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 w-full">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full" 
                  onClick={decreaseTemp}
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full" 
                  onClick={increaseTemp}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2">
              <Tabs defaultValue={mode} className="w-full" onValueChange={setMode}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="cool">Cool</TabsTrigger>
                  <TabsTrigger value="heat">Heat</TabsTrigger>
                  <TabsTrigger value="auto">Auto</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fan Speed</CardTitle>
              <CardDescription>Set circulation strength</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <Fan className="h-12 w-12 text-primary mb-4" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((speed) => (
                  <Button 
                    key={speed} 
                    variant={fanSpeed === speed ? "default" : "outline"}
                    className={cn(
                      "flex-1",
                      fanSpeed === speed && "border-primary"
                    )}
                    onClick={() => {
                      setFanSpeed(speed);
                      toast.success(`Fan speed set to ${speed === 0 ? 'Auto' : speed}`);
                    }}
                  >
                    {speed === 0 ? 'Auto' : speed}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
              <CardDescription>Current indoor humidity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <Droplets className="h-12 w-12 text-primary mb-4" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">42%</div>
                <div className="text-sm text-muted-foreground mt-2">Optimal range: 30-50%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Zones</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Living Room", temp: 72, current: 73 },
              { name: "Kitchen", temp: 72, current: 72 },
              { name: "Master Bedroom", temp: 70, current: 70 },
              { name: "Guest Room", temp: 68, current: 69 },
              { name: "Office", temp: 73, current: 72 },
              { name: "Basement", temp: 68, current: 67 }
            ].map((zone, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{zone.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 mr-2 text-primary" />
                      <span>Set: {zone.temp}°F</span>
                    </div>
                    <div className="text-muted-foreground">Current: {zone.current}°F</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClimatePage;
