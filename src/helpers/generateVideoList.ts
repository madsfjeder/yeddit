import type { SubList } from "../types/types";

export const generateVideoList = async(subList: SubList) => {
	for await (const sub of subList){
		console.log(sub)
	}
}