const getDateWithTime = (dateString) => {
    const dateObj = new Date(dateString)

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
    }

    const formattedDate = dateObj.toLocaleString('en-IN', options)
    return formattedDate
}

const getDate = (dateString) => {
    const dateObj = new Date(dateString)

    const options = {
        month: 'short',
        day: 'numeric',
    }

    const formattedDate = dateObj.toLocaleString('en-IN', options)
    return formattedDate
}

const capitalize = (str, lower = false) => {
    return (
        str &&
        (lower ? str.toLowerCase() : str).replace(
            /(?:^|\s|["'([{])+\S/g,
            (match) => match.toUpperCase()
        )
    )
}

export { getDateWithTime, getDate, capitalize }
