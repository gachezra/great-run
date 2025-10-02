import axios from 'axios';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'events'); // your unsigned preset

  const response = await axios.post('https://api.cloudinary.com/v1_1/dykwdjdaf/image/upload', formData);
  return response.data.secure_url;
};
