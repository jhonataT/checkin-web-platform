import { actionsCreator } from "../utils/Actions";
import ActionCreator from "../utils/ActionCreator";

const { set } = new ActionCreator("app");

const { actions } = actionsCreator("app");
export { actions as appActions }

export const setData = set("SET_DATA");
export const setDataMerge = set("SET_DATA_INCREMENTAL");
export const setDataAttachment = set("SET_DATA_ATTACHMENT");
export const deleteDataAttachment = set("DELETE_DATA_ATTACHMENT");
