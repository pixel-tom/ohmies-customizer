const imageCache: { [key: string]: string } = {};

export const getCachedImage = async (url: string): Promise<string> => {
  if (imageCache[url]) {
    return imageCache[url];
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    imageCache[url] = objectUrl;
    return objectUrl;
  } catch (error) {
    console.error("Error caching image:", error);
    return url;
  }
};
