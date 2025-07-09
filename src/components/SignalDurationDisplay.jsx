import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp } from "lucide-react";

const SignalDurationDisplay = ({ durations }) => {
  const directions = [
    { key: "north", label: "North", icon: "↑", gradient: "bg-gradient-north", textColor: "text-direction-north" },
    { key: "south", label: "South", icon: "↓", gradient: "bg-gradient-south", textColor: "text-direction-south" },
    { key: "east", label: "East", icon: "→", gradient: "bg-gradient-east", textColor: "text-direction-east" },
    { key: "west", label: "West", icon: "←", gradient: "bg-gradient-west", textColor: "text-direction-west" }
  ];

  const totalCycle = Object.values(durations).reduce((sum, duration) => sum + duration, 0);
  const averageDuration = Math.round(totalCycle / 4);

  return (
    <Card className="bg-gradient-card shadow-elevated border-border/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center space-x-2 text-card-foreground">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Signal Durations
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Duration Cards */}
        {directions.map((direction, index) => (
          <div 
            key={direction.key} 
            className="bg-gradient-to-r from-card/50 to-muted/20 rounded-xl p-4 border border-border/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${direction.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse`}>
                  {direction.icon}
                </div>
                <span className="font-medium text-card-foreground">{direction.label}</span>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${direction.textColor} drop-shadow-sm`}>
                  {durations[direction.key] || 0}s
                </div>
                <div className="text-xs text-muted-foreground">Green Duration</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3 bg-muted/30 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${direction.gradient} transition-all duration-1000 ease-out shadow-inner animate-shimmer`}
                style={{ 
                  width: `${((durations[direction.key] || 0) / Math.max(...Object.values(durations).map(d => Number(d)))) * 100}%`,
                  backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)',
                  backgroundSize: '20px 20px'
                }}
              />
            </div>
          </div>
        ))}

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-muted/20 to-accent/20 rounded-xl p-4 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Total Cycle Time</span>
            </div>
            <span className="font-semibold text-card-foreground">{totalCycle}s</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Average Duration</span>
            <span className="font-semibold text-card-foreground">{averageDuration}s</span>
          </div>
        </div>

        {/* Traffic Light Simulator */}
        <div className="bg-gradient-to-r from-background to-muted/50 rounded-xl p-6 border border-border/50 backdrop-blur-sm text-center">
          <div className="text-card-foreground text-sm mb-3 font-medium">Current Signal</div>
          <div className="flex justify-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-traffic-red rounded-full opacity-30 shadow-inner"></div>
            <div className="w-6 h-6 bg-traffic-yellow rounded-full opacity-30 shadow-inner"></div>
            <div className="w-6 h-6 bg-traffic-green rounded-full animate-pulse shadow-glow"></div>
          </div>
          <div className="text-traffic-green text-xs font-medium bg-traffic-green/10 px-3 py-1 rounded-full border border-traffic-green/20">
            Optimized Timing Active
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalDurationDisplay;