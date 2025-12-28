import { useState, useRef, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image, CheckCircle2, X, FileImage, Sparkles } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setUploadState("idle");
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploadState("uploading");
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploadState("success");
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadState("idle");
    setError(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-wider gradient-text">Media Upload</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload and manage your digital assets</p>
        </div>

        <div className="cyber-line" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Zone */}
          <Card variant="neon" className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                  dragActive 
                    ? "border-primary bg-primary/10 shadow-neon" 
                    : "border-border/50 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <FileImage className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium mb-2">
                    {dragActive ? "Drop your file here" : "Drag & drop your image"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse (Max 5MB)
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                  >
                    Select File
                  </Button>
                </div>

                {/* Animated border */}
                {dragActive && (
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 animate-pulse-neon rounded-xl" />
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2 animate-fade-in">
                  <X className="w-4 h-4" />
                  {error}
                </div>
              )}

              {selectedFile && !error && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <Image className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={resetUpload}
                      className="p-1 hover:bg-destructive/20 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>

                  <Button
                    variant="neon"
                    className="w-full"
                    onClick={handleUpload}
                    disabled={uploadState === "uploading" || uploadState === "success"}
                  >
                    {uploadState === "uploading" ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Uploading...
                      </span>
                    ) : uploadState === "success" ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Upload Complete
                      </span>
                    ) : (
                      "Upload File"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview Zone */}
          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/30 border border-border/50">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    {uploadState === "success" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border-2 border-primary mb-4 animate-pulse-neon">
                            <CheckCircle2 className="w-10 h-10 text-primary" />
                          </div>
                          <p className="text-lg font-bold tracking-wider text-primary mb-2">Upload Successful</p>
                          <p className="text-sm text-muted-foreground">File has been uploaded to the matrix</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={resetUpload}
                          >
                            Upload Another
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Image className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-sm">No image selected</p>
                    <p className="text-xs mt-1">Preview will appear here</p>
                  </div>
                )}

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              </div>

              {preview && uploadState === "success" && (
                <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Uploaded Successfully</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your file has been securely stored in the system matrix and is ready for use.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadPage;
