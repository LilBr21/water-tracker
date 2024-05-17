import { useMutation } from "@tanstack/react-query";
import { createUser, signIn } from "../api/auth";

interface IAuthProps {
    email: string;
    password: string;

}

export const useCreateUser = () => {
    const { mutateAsync: createNewUser, error } = useMutation({
        mutationFn: ({ email, password }: IAuthProps) => createUser(email, password),
    });

    return { createNewUser, error };
};

export const useSignIn = () => {
    const { mutateAsync: signInUser, error } = useMutation({
        mutationFn: ({ email, password }: IAuthProps) => signIn(email, password),
    });

    return { signInUser, error };
};