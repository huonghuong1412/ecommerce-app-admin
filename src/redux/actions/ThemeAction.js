const setMode = mode => {
    return {
        type: 'SET_MODE',
        payload: mode
    }
}

const setColor = color => {
    return {
        type: 'SET_COLOR',
        payload: color
    }
}

const getTheme = () => {
    return {
        type: 'GET_THEME'
    }
}

const toggleSideBar = (open) => {
    return {
        type: 'TOGGLE_SIDEBAR',
        payload: open
    }
}

const exportDefault = {
    setColor,
    setMode,
    getTheme,
    toggleSideBar
}

export default exportDefault