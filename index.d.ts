declare module "auth-jwt" {
    export function verify(req: any, secret: string): object;
    export function getToken(req: string): object;
}