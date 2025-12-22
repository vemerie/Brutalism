export type Success<T> = {
    data: T;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
};
