declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): Promise<{
        googleId: any;
        email: any;
        displayName: any;
        accessToken: string;
    }>;
}
export {};
