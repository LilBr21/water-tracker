import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../actions/auth";
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
