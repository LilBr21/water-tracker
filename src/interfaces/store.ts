import { IUserData } from "../actions/auth";
import { DataState } from "../actions/data";

export interface RootAuthState {
    auth: IUserData;
  }

export interface RootDataState {
    data: DataState;
}