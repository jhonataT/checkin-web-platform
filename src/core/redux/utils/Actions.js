export const capitalize = (str) => {
    if (str) {
      const splitStr = str.toLowerCase().split(" ")
      for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      // Directly return the joined string
      return splitStr.join(" ")
    }
  
    return
  }
  
  export const begin = (dsType, obParams) => {
    return {
      type: dsType,
      ...obParams,
    }
  }
  
  export const success = (dsType, obParams) => {
    return {
      type: dsType,
      payload: { ...obParams, error: undefined },
    }
  }
  
  export const failure = (dsType, error) => {
    return {
      type: dsType,
      payload: { error },
    }
  }
  
  export const actionsCreator = (...items) => {
    const types = ["get", "update", "add", "delete"]
    const states = ["begin", "success", "error"]
  
    const actions = {}
    const functions = {}
    const object = {
      actions,
      functions,
    }
    items.map((name) => {
      types.map((type) => {
        states.map((state) => {
          const keyAction = `${type}_${name}_${state}`.toUpperCase()
          const keyFunction = `${type}${capitalize(name)}${capitalize(state)}`
          actions[keyAction] = keyAction
          if (state === "begin") {
            functions[keyFunction] = (response) => begin(keyAction, response)
          } else if (state === "error") {
            functions[keyFunction] = (error) => failure(keyAction, error)
          } else {
            functions[keyFunction] = (response) => success(keyAction, response)
          }
          return state;
        })
        return type;
      })
      return name;
    })
    object["actions"] = actions
    object["functions"] = functions
  
    return object
  }
  
  export const get = (name, functions, asyncFunction) => {
    return (...id) => {
      return (dispatch) => {
        dispatch(functions[`get${capitalize(name)}Begin`]({}))
        return asyncFunction(id)
          .then((response) => {
            dispatch(
              functions[`get${capitalize(name)}Success`]({ [id ? "item" : "items"]: response }),
            )
          })
          .catch((error) => {
            dispatch(functions[`get${capitalize(name)}Error`](error.message))
          })
      }
    }
  }
  
  export const add = (name, functions, asyncFunction) => {
    return (item) => {
      return (dispatch) => {
        dispatch(functions[`add${capitalize(name)}Begin`]({}))
        return asyncFunction(item)
          .then((data) => {
            dispatch(functions[`add${capitalize(name)}Success`]({ item: data }))
          })
          .catch((error) => {
            dispatch(functions[`add${capitalize(name)}Error`](error.message))
          })
      }
    }
  }
  
  export const update = (name, functions, asyncFunction) => {
    return (item) => {
      return (dispatch) => {
        dispatch(functions[`update${capitalize(name)}Begin`]({}))
        return asyncFunction(item)
          .then((data) => {
            dispatch(functions[`update${capitalize(name)}Success`]({ item: data }))
          })
          .catch((error) => {
            dispatch(functions[`update${capitalize(name)}Error`](error.message))
          })
      }
    }
  }
  
  export const remove = (name, functions, asyncFunction) => {
    return (id) => {
      return (dispatch) => {
        dispatch(functions[`delete${capitalize(name)}Begin`]({}))
        return asyncFunction(id)
          .then(() => {
            dispatch(functions[`delete${capitalize(name)}Success`]({ id }))
          })
          .catch((error) => {
            dispatch(functions[`delete${capitalize(name)}Error`](error.message))
          })
      }
    }
  }
  