import { token } from "./stores";

export const setToken = (tokenStr: string) => {
	token.set(tokenStr)
}