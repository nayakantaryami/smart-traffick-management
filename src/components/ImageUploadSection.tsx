import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image, X } from "lucide-react";

const ImageUploadSection = ({ uploadedImages, onImageUpload }: { 
  uploadedImages: Record<string, any>, 
  onImageUpload: (direction: string, file: File | null) => void 
}) => {
  const fileInputRefs = {
    north: useRef<HTMLInputElement>(null),
    south: useRef<HTMLInputElement>(null),
    east: useRef<HTMLInputElement>(null),
    west: useRef<HTMLInputElement>(null)
  };

  const directions = [
    { key: "north", label: "North", icon: "↑", gradient: "bg-gradient-north", color: "border-direction-north/30" },
    { key: "south", label: "South", icon: "↓", gradient: "bg-gradient-south", color: "border-direction-south/30" },
    { key: "east", label: "East", icon: "→", gradient: "bg-gradient-east", color: "border-direction-east/30" },
    { key: "west", label: "West", icon: "←", gradient: "bg-gradient-west", color: "border-direction-west/30" }
  ];

  const handleFileSelect = (direction: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      
      onImageUpload(direction, file);
    }
  };

  const handleRemoveImage = (direction: string) => {
    if (uploadedImages[direction]?.url) {
      URL.revokeObjectURL(uploadedImages[direction].url);
    }
    
    // Clear the file input
    if (fileInputRefs[direction].current) {
      fileInputRefs[direction].current.value = "";
    }
    
    // Remove from state
    onImageUpload(direction, null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {directions.map((direction, index) => (
        <Card 
          key={direction.key} 
          className={`${direction.color} border-2 border-dashed bg-gradient-to-br from-card via-card/80 to-muted/20 backdrop-blur-sm transition-all duration-300 hover:shadow-glow hover:scale-105 animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${direction.gradient} mb-4 shadow-lg animate-float`}>
                <span className="text-2xl font-bold text-white drop-shadow-md">
                  {direction.icon}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-4 text-card-foreground bg-gradient-to-r from-card-foreground to-muted-foreground bg-clip-text text-transparent">
                {direction.label}
              </h3>
              
              {!uploadedImages[direction.key] ? (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-xl p-6 border border-border/50 backdrop-blur-sm hover:bg-muted/40 transition-all duration-300">
                    <Image className="h-16 w-16 mx-auto text-muted-foreground mb-3 animate-pulse" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                  </div>
                  <Button
                    onClick={() => fileInputRefs[direction.key].current?.click()}
                    className={`w-full ${direction.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                    variant="default"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRefs[direction.key]}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(direction.key, e)}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group">
                    <img
                      src={uploadedImages[direction.key].url}
                      alt={`${direction.label} junction`}
                      className="w-full h-40 object-cover rounded-xl border border-border/50 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button
                      onClick={() => handleRemoveImage(direction.key)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 border border-border/50 backdrop-blur-sm">
                    <p className="text-xs text-muted-foreground truncate">
                      {uploadedImages[direction.key].file?.name}
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRefs[direction.key].current?.click()}
                    variant="outline"
                    size="sm"
                    className="w-full border-border/50 bg-background/50 hover:bg-muted/50 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                  >
                    Change Image
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageUploadSection;