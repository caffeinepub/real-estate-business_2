import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Property {
    id: bigint;
    title: string;
    featured: boolean;
    propertyType: string;
    beds: bigint;
    sqft: bigint;
    address: string;
    baths: bigint;
    price: bigint;
}
export interface backendInterface {
    getAllProperties(): Promise<Array<Property>>;
    getFeaturedProperties(): Promise<Array<Property>>;
}
