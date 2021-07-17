export class AddOrder {
    Code
    CountryId
    Address
    RecipientName
    RegioName
    RegionId
    ClientNote
    Cost
    DateTime: Date
    OrderItem: OrderItem[]
    RecipientPhones: string[]
    monePlaced
    orderplaced
}
export class OrderItem {
    OrderTypeName
    OrderTypeId
    Count:number
}
