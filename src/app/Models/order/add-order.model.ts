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
    isSend
}
export class OrderItem {
    OrderTypeName
    OrderTypeId
    Count: number
    orderTpye
    count: number
}
export class orderTpye {
    id
    name
}
