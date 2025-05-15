
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LightbulbIcon, Thermometer, DoorOpen, Lock, Fan, Tv } from "lucide-react";

export interface DeviceProps {
  id: string;
  name: string;
  type: "light" | "thermostat" | "door" | "lock" | "fan" | "tv";
  status: boolean;
  location: string;
  value?: number | string;
  icon?: React.ReactNode;
}

const getDeviceIcon = (type: DeviceProps["type"], status: boolean) => {
  const commonClasses = cn("h-8 w-8", status ? "text-primary" : "text-muted-foreground");
  
  switch (type) {
    case "light":
      return <LightbulbIcon className={commonClasses} />;
    case "thermostat":
      return <Thermometer className={commonClasses} />;
    case "door":
      return <DoorOpen className={commonClasses} />;
    case "lock":
      return <Lock className={commonClasses} />;
    case "fan":
      return <Fan className={commonClasses} />;
    case "tv":
      return <Tv className={commonClasses} />;
    default:
      return <LightbulbIcon className={commonClasses} />;
  }
};

const DeviceCard = ({ id, name, type, status, location, value, icon }: DeviceProps) => {
  const [isOn, setIsOn] = useState(status);
  
  const handleToggle = () => {
    setIsOn(!isOn);
    
    toast(`${name} turned ${!isOn ? "on" : "off"}`, {
      description: `Location: ${location}`,
      duration: 2000,
    });
  };

  return (
    <Card className={cn(
      "transition-all duration-300 overflow-hidden",
      isOn ? "border-primary/50 shadow-md" : "border-border shadow-sm"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              {icon || getDeviceIcon(type, isOn)}
              <h3 className="font-semibold">{name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{location}</p>
            {value && <p className="text-lg font-medium">{value}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              isOn 
                ? "bg-primary animate-pulse-slow" 
                : "bg-muted-foreground"
            )} />
            <span className="text-xs">{isOn ? "ON" : "OFF"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <span className="text-sm text-muted-foreground capitalize">{type}</span>
        <Switch
          checked={isOn}
          onCheckedChange={handleToggle}
          aria-label={`Toggle ${name}`}
        />
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
