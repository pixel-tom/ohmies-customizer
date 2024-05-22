self.onmessage = async (event) => {
  const { selectedParts } = event.data;

  const canvas = new OffscreenCanvas(1000, 1000);
  const context = canvas.getContext("2d");
  const selectedPartKeys = Object.keys(selectedParts);

  try {
    const imagePromises = selectedPartKeys.map(async (category) => {
      const part = selectedParts[category];
      const response = await fetch(part.image, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to load image');
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);
      return imageBitmap;
    });

    const images = await Promise.all(imagePromises);
    canvas.width = images[0].width;
    canvas.height = images[0].height;

    images.forEach((image) => {
      context.drawImage(image, 0, 0);
    });

    const blob = await canvas.convertToBlob({ type: 'image/png' });
    self.postMessage({ blob });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
