
import { Schema, model, models } from "mongoose"

const GallerySchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }

})

const PublicGallery = models.publicGalleries || model("publicGalleries", GallerySchema)

export default PublicGallery