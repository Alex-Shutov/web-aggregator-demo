export interface IBadge {
  number: number;
  boldText?:string,
  defaultText:string
  urlImage:string
  className?:string
}

export interface IBadgeList {
  badges: IBadge[];
}