import axios from 'axios';

const Upload = async (imageFile, onProgress) => {
  const url = `https://api.cloudinary.com/v1_1/ddv2y93jq/image/upload`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "sni4p6lt");

  try {
    const response = await axios.post(url, formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.log("Upload error:", error);
  }
  return "uploaded-image-url"; // Return the URL after successful upload

};

export default Upload;
