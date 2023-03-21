import { appActions } from "./Actions";
import { success } from "../utils/Reducers";

export const initialState = {
  isLoading: false,
  error: null,
  companies: [],
  workgroups: [],
  projects: [],
  token: "",
  user: {}
}

export default function Reduc (state = initialState, action) {
  let oldData
  let oldFiles
  if (appActions) {
    switch (action.type) {
      case "SET_DATA":
        state = success(state, { ...action.payload })
        break
      case "SET_DATA_INCREMENTAL":
        oldData = state[action.payload.key]
        state = success(state, { [action.payload.key]: { ...oldData, ...action.payload.data } })
        break
      case "DELETE_DATA_ATTACHMENT":
        oldData = state[action.payload.key]
        state = success(state, {
          [action.payload.key]: {
            ...oldData,
            files: oldData.files
              ? oldData.files.filter((item) => item && item.id !== action.payload.id)
              : [],
          },
        })
        break
      case "SET_DATA_ATTACHMENT":
        oldData = state[action.payload.key]
        oldFiles = oldData.files || []
        state = success(state, {
          [action.payload.key]: { ...oldData, files: oldFiles.concat(action.payload.file) },
        })
        break
      default:
        break
    }
  }
  return state
}
