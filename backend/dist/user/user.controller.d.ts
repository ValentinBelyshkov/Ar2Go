import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateUser(req: any, newName: string): Promise<void>;
    getUser(req: any): Promise<{
        name: string;
        email: string;
    }>;
}
