import axios from "axios";
import { useState } from "react";

export const ImageUpload = () => {
   const [preview, setPreview] = useState(null);
   const [imageFile, setImageFile] = useState(null);
   const [result, setResult] = useState(null);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setImageFile(file);
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreview(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleUpload = async () => {
      if (!imageFile) {
         alert("Silakan pilih gambar terlebih dahulu!");
         return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      try {
         const response = await axios.post(
            `${import.meta.env.VITE_API}predict`,
            formData,
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            }
         );

         setResult(response.data.disease);
      } catch (error) {
         console.error("Error:", error);
         alert("Terjadi kesalahan saat mengupload gambar.");
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
            <label
               className="block mb-2 text-sm font-medium text-gray-900"
               htmlFor="image_input"
            >
               Upload file
            </label>
            <input
               className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
               id="image_input"
               type="file"
               onChange={handleImageChange}
            />
            <button
               onClick={handleUpload}
               className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
               Scan
            </button>

            <h3 className="mt-4">Preview:</h3>
            {preview && (
               <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 max-w-full rounded-md"
               />
            )}

            {result && (
               <div className="mt-4">
                  <h3>Hasil Prediksi:</h3>
                  <p className="text-2xl text-red-500">{result}</p>
               </div>
            )}
         </div>
      </div>
   );
};
