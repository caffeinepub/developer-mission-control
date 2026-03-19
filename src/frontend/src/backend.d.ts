import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    addProfileLink(key: string, link: string): Promise<void>;
    deleteProfileLink(key: string): Promise<void>;
    getAllProfileLinks(): Promise<Array<[string, string]>>;
    getProfileLink(key: string): Promise<string>;
}
