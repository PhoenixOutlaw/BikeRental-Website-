export declare class Create_Bikedto {
    name: string;
    model: string;
    color: string;
    location: string;
}
declare const Update_Bikedto_base: import("@nestjs/mapped-types").MappedType<Partial<Create_Bikedto>>;
export declare class Update_Bikedto extends Update_Bikedto_base {
}
export {};
