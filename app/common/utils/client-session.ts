import { Roles } from "../enums/roles.enum";

export default function isUserAdmin(user: any) {
    return [Roles.ADMIN, Roles.SUPERADMIN].includes(user?.user?.user_metadata?.role?.role);
}