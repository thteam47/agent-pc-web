import { Permission } from "./permissions";

export interface User {
    type: string;
    password: string;
    full_name: string;
    idUser: string;
    action: string[];
    user_id: string;
    email: string;
    username: string;
    permission_all: boolean;
    role: string[];
    permissions: Permission[];
    status: string;
}