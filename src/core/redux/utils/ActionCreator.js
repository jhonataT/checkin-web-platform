import { actionsCreator, capitalize } from "./Actions"
import { success, begin, failure } from "./Reducers"

class ActionCreator {
  constructor(name) {
    this.name = name

    const { actions, functions } = actionsCreator(name)

    this.actions = this.actions ? this.actions.concat(actions) : actions
    this.functions = this.functions ? this.functions.concat(functions) : functions

    this.get = this.get.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.getSimple = this.getSimple.bind(this)
    this.defaultReducer = this.defaultReducer.bind(this)
  }

  get(asyncFunction) {
    return (fields) => {
      return (dispatch) => {
        dispatch(this.functions[`get${capitalize(this.name)}Begin`]({}))
        return asyncFunction(fields)
          .then((items) => {
            dispatch(this.functions[`get${capitalize(this.name)}Success`]({ items }))
            return items
          })
          .catch((error) => {
            dispatch(this.functions[`get${capitalize(this.name)}Error`](error.message))
            throw error
          })
      }
    }
  }

  getSimple(asyncFunction) {
    return (fields) => {
      return (dispatch) => {
        dispatch(this.functions[`get${capitalize(this.name)}Begin`]({}))
        return asyncFunction(fields)
          .then((response) => {
            dispatch(this.functions[`get${capitalize(this.name)}Success`](response))
            return response
          })
          .catch((error) => {
            dispatch(this.functions[`get${capitalize(this.name)}Error`](error.message))
            throw error
          })
      }
    }
  }

  add(asyncFunction) {
    return (item) => {
      return (dispatch) => {
        dispatch(this.functions[`add${capitalize(this.name)}Begin`]({}))
        return asyncFunction(item)
          .then((data) => {
            dispatch(this.functions[`add${capitalize(this.name)}Success`]({ item: data }))
            return data
          })
          .catch((error) => {
            dispatch(this.functions[`add${capitalize(this.name)}Error`](error.message))
            throw error
          })
      }
    }
  }

  update(asyncFunction) {
    return (item) => {
      return (dispatch) => {
        dispatch(this.functions[`update${capitalize(this.name)}Begin`]({}))
        return asyncFunction(item)
          .then((data) => {
            dispatch(this.functions[`update${capitalize(this.name)}Success`]({ item: data }))
            return data
          })
          .catch((error) => {
            dispatch(this.functions[`update${capitalize(this.name)}Error`](error.message))
            throw error
          })
      }
    }
  }

  remove(asyncFunction) {
    return (id) => {
      return (dispatch) => {
        dispatch(this.functions[`delete${capitalize(this.name)}Begin`]({}))
        return asyncFunction(id)
          .then(() => {
            dispatch(this.functions[`delete${capitalize(this.name)}Success`]({ id }))
            return id
          })
          .catch((error) => {
            dispatch(this.functions[`delete${capitalize(this.name)}Error`](error.message))
            throw error
          })
      }
    }
  }

  set(type) {
    return (payload) => {
      return (dispatch) => {
        dispatch({ type, payload })
      }
    }
  }

  defaultReducer(state, action) {
    let newState = state
    if (action.type) {
      if (action.type.endsWith(`_${this.name.toUpperCase()}_SUCCESS`)) {
        newState = success(state, { ...action.payload })
      } else if (action.type.endsWith(`_${this.name.toUpperCase()}_BEGIN`)) {
        newState = begin(state, action.payload)
      } else if (action.type.endsWith(`_${this.name.toUpperCase()}_ERROR`)) {
        newState = failure(state, action.payload.error)
      }
    }
    return newState
  }
}

export default ActionCreator
