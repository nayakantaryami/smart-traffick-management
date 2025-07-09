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
    { key: "north", label: "North", icon: "↑", color: "bg-blue-100 border-blue-300" },
    { key: "south", label: "South", icon: "↓", color: "bg-green-100 border-green-300" },
    { key: "east", label: "East", icon: "→", color: "bg-yellow-100 border-yellow-300" },
    { key: "west", label: "West", icon: "←", color: "bg-purple-100 border-purple-300" }
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {directions.map((direction) => (
        <Card key={direction.key} className={`${direction.color} border-2 border-dashed transition-all hover:shadow-md`}>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-4xl mb-2 font-bold text-gray-600">
                {direction.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3">{direction.label}</h3>
              
              {!uploadedImages[direction.key] ? (
                <div className="space-y-3">
                  <div className="bg-white/60 rounded-lg p-4 border border-gray-300">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                  </div>
                  <Button
                    onClick={() => fileInputRefs[direction.key].current?.click()}
                    className="w-full"
                    variant="outline"
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
                <div className="space-y-3">
                  <div className="relative">
                    <img
                      src={uploadedImages[direction.key].url}
                      alt={`${direction.label} junction`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() => handleRemoveImage(direction.key)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="bg-white/60 rounded p-2">
                    <p className="text-xs text-gray-600 truncate">
                      {uploadedImages[direction.key].file?.name}
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRefs[direction.key].current?.click()}
                    variant="outline"
                    size="sm"
                    className="w-full"
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