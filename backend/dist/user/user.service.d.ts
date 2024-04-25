import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    updateUser(userId: string, newName: string): Promise<void>;
    getUser(userId: string): Promise<{
        name: string;
        email: string;
    }>;
}
