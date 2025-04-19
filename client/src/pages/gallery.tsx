import React, { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/utils";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Server <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out screenshots from our Rust server showcasing epic builds, raids, and events
            </p>
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div 
                key={image.id}
                className="aspect-video bg-card rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="w-full h-full bg-card flex items-center justify-center">
                  <i className="fas fa-image text-4xl text-muted-foreground"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Image Modal Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-card">
          <div className="relative">
            <div className="aspect-video bg-card flex items-center justify-center">
              <i className="fas fa-image text-6xl text-muted-foreground"></i>
            </div>
            <DialogClose className="absolute top-2 right-2 bg-background/80 rounded-full p-2 hover:bg-background text-foreground">
              <i className="fas fa-times"></i>
            </DialogClose>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {selectedImage && galleryImages.find(img => img.id === selectedImage)?.title}
            </h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
                  const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                  setSelectedImage(galleryImages[prevIndex].id);
                }}
              >
                <i className="fas fa-chevron-left mr-1"></i> Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
                  const nextIndex = (currentIndex + 1) % galleryImages.length;
                  setSelectedImage(galleryImages[nextIndex].id);
                }}
              >
                Next <i className="fas fa-chevron-right ml-1"></i>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Submit Your Screenshots */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Share Your Screenshots</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Have an amazing base, epic raid, or cool event screenshot? Share it with the community!
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <i className="fas fa-upload mr-2"></i>
            <span>Submit Screenshots</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
