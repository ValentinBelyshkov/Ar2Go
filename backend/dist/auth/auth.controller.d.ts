import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    google(): {
        status: string;
    };
    googleCallback(req: any, res: any): Promise<void>;
}
