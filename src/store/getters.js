const getters = {
    username: state => state.user.name,
    token: state => state.user.token,
    email: state => state.user.email,
    roles: state => state.user.role,
    sex: state => state.user.sex,
    phone: state => state.user.phone,
    birthdata: state => state.user.birthdata,
    collapse: state =>state.controlSidebar.collapse,
}

export default getters
