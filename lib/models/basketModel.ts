import { Methods } from "@/ZSchemas/UserSchema"
import { Model, Schema, model, models } from "mongoose"

const BasketsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    basket: {
        type: [],
    },
    sell: {
        type: [],
    },
    wishList: {
        type: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Baskets = models.baskets || model("baskets", BasketsSchema)

export default Baskets

// export default Baskets as Model<BasketsDocument, {}, Methods>