
// Utility functions for the FYP page

// Get color based on rating
export const getRatingColor = (rating: number) => {
  if (rating >= 80) return "#4ADE80"; // Green for good ratings
  if (rating >= 60) return "#22C55E"; // Lower green
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  if (rating >= 20) return "#FB923C"; // Orange for fair
  return "#F87171"; // Red for poor ratings
};

// Get background color for the rating
export const getRatingBgColor = (rating: number) => {
  if (rating >= 80) return "#ECFDF5"; // Light green bg
  if (rating >= 60) return "#F0FDF4"; // Lower light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  if (rating >= 20) return "#FFF7ED"; // Light orange bg
  return "#FEF2F2"; // Light red bg
};

// Get rating label based on rating
export const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

// Format analysis text for display
export const formatAnalysisText = (text: string | undefined) => {
  if (!text) return null;
  
  // First, preserve line breaks but convert double line breaks to HTML breaks
  let formattedText = text.replace(/\n\n/g, '<br/><br/>');
  
  // Make emojis stand out more
  formattedText = formattedText.replace(/🔮|🧬|🌫️|🔥|🌿|🧘‍♀️|⚡|🌊|💫|🌀/g, '<span class="text-xl">$&</span>');
  
  // Make headings slightly larger and bolder
  formattedText = formattedText.replace(/^(.*?\:)/gm, '<strong class="text-md">$1</strong>');
  
  return { __html: formattedText };
};

// Process and optimize image before sending to API
export const processImage = async (imageDataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Check dimensions and resize if needed
      const maxDimension = 2048;
      let width = img.width;
      let height = img.height;
      let needsResize = false;
      
      if (width > maxDimension || height > maxDimension) {
        needsResize = true;
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }
      
      // If we don't need to resize, just return the original
      if (!needsResize) {
        resolve(imageDataUrl);
        return;
      }
      
      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with reasonable quality to reduce size
      try {
        const resizedImageData = canvas.toDataURL('image/jpeg', 0.85);
        resolve(resizedImageData);
      } catch (err) {
        reject(new Error('Failed to resize image'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageDataUrl;
  });
};

// Generate sample data for skin history
export const generateSkinHistoryData = () => {
  const today = new Date();
  
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return Array(7).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    // Generate a random rating between 50 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 50 + 1)) + 50;
    return {
      day: getDayName(date),
      date: getDateString(date),
      rating: rating
    };
  });
};
