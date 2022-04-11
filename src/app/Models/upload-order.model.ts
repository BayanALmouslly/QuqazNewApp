import { OrderItem } from "./order/add-order.model"

export class UploadOrder {
    Code
    CountryId
    Address
    RecipientName
    RegioName
    RegionId
    ClientNote
    Cost
    DateTime: Date
    Date: Date
    OrderItem: OrderItem[]
    RecipientPhones: string[]
    ValidationError:boolean;
}
