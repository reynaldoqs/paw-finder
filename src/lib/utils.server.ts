import sizeOf from "buffer-image-size";

const FIXED_WIDTH = 200;
export const getImageSize = (bufferImage: Buffer<ArrayBuffer>) => {
  try {
    const dimensions = sizeOf(bufferImage);
    const width = dimensions.width;
    const height = dimensions.height;

    return {
      width,
      height,
    };
  } catch (error) {
    console.error("Error getting image size:", error);
    return {
      width: FIXED_WIDTH,
      height: FIXED_WIDTH * 1.2,
    };
  }
};
