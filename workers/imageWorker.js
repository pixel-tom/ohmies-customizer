self.onmessage = async (event) => {
    const { selectedParts } = event.data;
  
    const canvas = new OffscreenCanvas(1000, 1000);
    const context = canvas.getContext("2d");
    const selectedPartKeys = Object.keys(selectedParts);
  
    try {
      const imagePromises = selectedPartKeys.map((category) => {
        const part = selectedParts[category];
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = part.image;
        return new Promise((resolve, reject) => {
          image.onload = () => resolve(image);
          image.onerror = reject;
        });
      });
  
      const images = await Promise.all(imagePromises);
      canvas.width = images[0].width;
      canvas.height = images[0].height;
  
      images.forEach((image) => {
        context.drawImage(image, 0, 0);
      });
  
      const blob = await canvas.convertToBlob({ type: "image/png" });
      self.postMessage({ blob });
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  };
  