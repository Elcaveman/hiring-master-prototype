export type PositiveNumber = number & ( number extends 0? never:number);
export type NegativeNumber = number & ( number extends 0? number:never);