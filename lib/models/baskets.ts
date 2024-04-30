import { Model, Schema, model, models } from "mongoose"
import { BasketsDocument, Methods, } from "@/type"

const BasketsSchema = new Schema<BasketsDocument, {}, Methods>({
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
    }

})

const Baskets = models.baskets || model("baskets", BasketsSchema)

export default Baskets as Model<BasketsDocument, {}, Methods>