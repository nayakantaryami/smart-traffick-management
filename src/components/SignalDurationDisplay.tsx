import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp } from "lucide-react";

const SignalDurationDisplay = ({ durations }: { durations: Record<string, number> }) => {
  const directions = [
    { key: "north", label: "North", icon: "↑", color: "bg-blue-500", textColor: "text-blue-600" },
    { key: "south", label: "South", icon: "↓", color: "bg-green-500", textColor: "text-green-600" },
    { key: "east", label: "East", icon: "→", color: "bg-yellow-500", textColor: "text-yellow-600" },
    { key: "west", label: "West", icon: "←", color: "bg-purple-500", textColor: "text-purple-600" }
  ];

  const totalCycle = Object.values(durations).reduce((sum: number, duration: number) => sum + duration, 0);
  const averageDuration = Math.round(totalCycle / 4);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Signal Durations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Duration Cards */}
        {directions.map((direction) => (
          <div key={direction.key} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${direction.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {direction.icon}
                </div>
                <span className="font-medium text-gray-700">{direction.label}</span>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${direction.textColor}`}>
                  {durations[direction.key] || 0}s
                </div>
                <div className="text-xs text-gray-500">Green Duration</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${direction.color} transition-all duration-1000`}
                style={{ width: `${((durations[direction.key] || 0) / Math.max(...Object.values(durations).map(d => Number(d)))) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {/* Summary Stats */}
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Total Cycle Time</span>
            </div>
            <span className="font-semibold text-gray-800">{totalCycle}s</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-600">Average Duration</span>
            <span className="font-semibold text-gray-800">{averageDuration}s</span>
          </div>
        </div>

        {/* Traffic Light Simulator */}
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-white text-sm mb-2">Current Signal</div>
          <div className="flex justify-center space-x-2">
            <div className="w-4 h-4 bg-traffic-red rounded-full opacity-30"></div>
            <div className="w-4 h-4 bg-traffic-yellow rounded-full opacity-30"></div>
            <div className="w-4 h-4 bg-traffic-green rounded-full animate-pulse"></div>
          </div>
          <div className="text-green-400 text-xs mt-2">Optimized Timing Active</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalDurationDisplay;