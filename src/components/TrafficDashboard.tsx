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
    <div className="min-h-screen bg-dashboard-bg p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-dashboard-header to-primary rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Smart Traffic Management</h1>
                <p className="text-white/80">AI-Powered Junction Optimization System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-white" />
              <span className="text-white font-medium">System Active</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Image Upload Section */}
          <div className="xl:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Junction Images</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Control Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={isProcessing}
                  className="w-full bg-traffic-green hover:bg-traffic-green/90"
                >
                  {isProcessing ? "Processing..." : "Analyze Traffic"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                >
                  Reset Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Signal Duration Display */}
            {signalDurations && (
              <SignalDurationDisplay durations={signalDurations} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficDashboard;