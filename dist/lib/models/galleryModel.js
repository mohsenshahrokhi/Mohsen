import { Schema, model, models } from "mongoose";
const GallerySchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
});
const PublicGallery = models.PublicGalleries || model("PublicGalleries", GallerySchema);
export default PublicGallery;
//# sourceMappingURL=galleryModel.js.map