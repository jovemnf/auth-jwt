declare module "auth-jwt" {
    export interface RequestLike {
        headers?: Record<string, string | undefined>;
        token?: string;
        [key: string]: any;
    }

    export type DecodedToken = Record<string, unknown>;

    export function checkToken<T = DecodedToken>(token: string, secret: string): Promise<T>;
    export function verify<T = DecodedToken>(req: RequestLike, secret: string): Promise<T>;
    export function getToken(req: RequestLike): Promise<string>;
}
