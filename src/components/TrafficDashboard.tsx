import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Navigation, Clock, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUploadSection from "./ImageUploadSection";
import SignalDurationDisplay from "./SignalDurationDisplay";

const TrafficDashboard = () => {
  const [uploadedImages, setUploadedImages] = useState<Record<string, any>>({
    north: null,
    south: null,
    east: null,
    west: null
  });
  
  const [signalDurations, setSignalDurations] = useState<Record<string, number> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (direction: string, file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages(prev => ({
        ...prev,
        [direction]: { file, url: imageUrl }
      }));
      
      toast({
        title: `${direction.charAt(0).toUpperCase() + direction.slice(1)} image uploaded`,
        description: "Image uploaded successfully"
      });
    } else {
      // Handle removal case
      setUploadedImages(prev => ({
        ...prev,
        [direction]: null
      }));
    }
  };

  const handleAnalyze = async () => {
    const allImagesUploaded = Object.values(uploadedImages).every(img => img !== null);
    
    if (!allImagesUploaded) {
      toast({
        title: "Missing images",
        description: "Please upload images for all 4 directions",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setSignalDurations({
        north: Math.floor(Math.random() * 60) + 30,
        south: Math.floor(Math.random() * 60) + 30,
        east: Math.floor(Math.random() * 60) + 30,
        west: Math.floor(Math.random() * 60) + 30
      });
      
      setIsProcessing(false);
      toast({
        title: "Analysis complete!",
        description: "Optimal signal durations calculated"
      });
    }, 3000);
  };

  const handleReset = () => {
    setUploadedImages({
      north: null,
      south: null,
      east: null,
      west: null
    });
    setSignalDurations(null);
    
    // Clean up object URLs
    Object.values(uploadedImages).forEach(img => {
      if (img?.url) {
        URL.revokeObjectURL(img.url);
      }
    });
    
    toast({
      title: "Dashboard reset",
      description: "All data cleared"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-bg via-dashboard-bg to-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-header rounded-2xl shadow-glow border border-white/10 backdrop-blur-sm p-6 mb-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/30 animate-float">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Smart Traffic Management
                </h1>
                <p className="text-white/80">AI-Powered Junction Optimization System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-traffic-green rounded-full animate-pulse"></div>
              <Activity className="h-5 w-5 text-white" />
              <span className="text-white font-medium">System Active</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Image Upload Section */}
          <div className="xl:col-span-2">
            <Card className="bg-gradient-card shadow-elevated border-border/50 backdrop-blur-sm animate-slide-up">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Upload Junction Images
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ImageUploadSection
                  uploadedImages={uploadedImages}
                  onImageUpload={handleImageUpload}
                />
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Control Buttons */}
            <Card className="bg-gradient-card shadow-elevated border-border/50 backdrop-blur-sm animate-slide-up">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Control Panel
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Button
                  onClick={handleAnalyze}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-traffic-green to-traffic-green/80 hover:from-traffic-green/90 hover:to-traffic-green/70 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-in"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Analyze Traffic"
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full border-border/50 bg-background/50 hover:bg-muted/50 text-foreground backdrop-blur-sm hover:border-border transition-all duration-300 hover:scale-105"
                >
                  Reset Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Signal Duration Display */}
            {signalDurations && (
              <div className="animate-bounce-in">
                <SignalDurationDisplay durations={signalDurations} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficDashboard;