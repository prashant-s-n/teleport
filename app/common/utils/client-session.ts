import { Roles } from "../enums/roles.enum";

export default function isUserAdmin(user: any) {
    return user?.user_metadata?.role?.role != Roles.ADMIN
}