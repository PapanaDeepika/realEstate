import axios from "axios";

const Upload = async (imageFile, onProgress) => {
  const cloudName ="dtizik6uc";
  const uploadPreset = "propertymb";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error("Upload error details:", error.response?.data || error.message);
    throw new Error("Failed to upload image");
  }
};

export default Upload;
