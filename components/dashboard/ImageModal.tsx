import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

export const ImageModal = ({
  selectedImage,
  setSelectedImage,
  currentIndex,
  setCurrentIndex,
  images,
}: any) => (
  <AnimatePresence>
    {selectedImage && images.length > 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 cursor-pointer right-4 p-2 text-white hover:bg-white/10 rounded-full z-10"
        >
          <X size={24} />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  setSelectedImage(images[currentIndex - 1]);
                }
              }}
              disabled={currentIndex === 0}
              className="absolute cursor-pointer left-4 p-2 text-white hover:bg-white/10 rounded-full disabled:opacity-50 z-10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex < images.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                  setSelectedImage(images[currentIndex + 1]);
                }
              }}
              disabled={currentIndex === images.length - 1}
              className="absolute right-4 p-2 cursor-pointer text-white hover:bg-white/10 rounded-full disabled:opacity-50 z-10"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}
        <div className="relative max-w-5xl max-h-[90vh]">
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                const response = await fetch(selectedImage);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;

                const fileName =
                  selectedImage.split("/").pop() || `image-${Date.now()}.jpg`;
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Error downloading image:", error);
              }
            }}
            className="absolute bottom-4 text-black cursor-pointer right-4 p-2   hover:bg-white/30 rounded-lg transition-all duration-200"
            title="Download image"
          >
            <Download size={20} />
          </button>
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);
