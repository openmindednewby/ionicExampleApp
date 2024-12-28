
import { Photo } from "@capacitor/camera";

/**
 * Converts a Photo object to a Blob.
 *
 * This function takes a Photo object from the Capacitor Camera plugin and converts it to a Blob.
 * It uses either the base64String or dataUrl property of the Photo object to create the Blob.
 *
 * @param {Photo} photo - The Photo object to convert.
 * @returns {Blob} - The resulting Blob containing the image data.
 * @throws {Error} - Throws an error if no valid image data is found in the Photo object.
 */
function photoToBlob(photo: Photo): Blob {
  // Use base64String or dataUrl to create the Blob
  if (photo.base64String) {
    // Decode the base64 string
    const byteCharacters = atob(photo.base64String);
    const byteNumbers = new Array(byteCharacters.length).map((_, i) =>
      byteCharacters.charCodeAt(i)
    );
    const byteArray = new Uint8Array(byteNumbers);

    // Create Blob with the image data
    return new Blob([byteArray], { type: `image/${photo.format}` });
  } else if (photo.dataUrl) {
    // Extract the base64 part from dataUrl and convert it to a Blob
    const base64Data = photo.dataUrl.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).map((_, i) =>
      byteCharacters.charCodeAt(i)
    );
    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: `image/${photo.format}` });
  }

  throw new Error("No valid image data found in the Photo object.");
}

export default photoToBlob;
