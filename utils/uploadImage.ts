const CLOUDINARY_CLOUD_NAME = 'dj2dysx1c';
const UPLOAD_PRESET = 'e45jlk34';

export const uploadImage = async (base64Image: any) => {
    try {
        const formData = new FormData();

        formData.append("file", base64Image);
        formData.append("upload_preset", UPLOAD_PRESET);

        formData.append("public_id", `profile_pic_${Date.now()}`);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error("Cloudinary upload failed: " + JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};