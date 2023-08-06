export type Response<T> = {
    isSuccess: boolean;
    error?: string;
    data: T extends true ? any : T | undefined;
};