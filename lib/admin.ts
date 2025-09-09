import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_31WIhnPfS3XArZESzsSqJSuwyqC",
];

export const getIsAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}