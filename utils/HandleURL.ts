function HandleURL(id: string | string[]) {
    let url = ''

    let backUrl = ''

    if (Array.isArray(id)) {
        if (id.length > 1) {
            url = ''
            backUrl = ''
            url = id.join('/')
            const copyUrl = [...id]
            copyUrl.pop()
            backUrl = copyUrl.join('/')
        } else {
            url = id[0]
        }
    }
    return { url, backUrl }
}

export default HandleURL