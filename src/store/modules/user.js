import {postRequest,getRequest} from "@/utils/axiousApi";
import {getToken,setToken,removeToken} from "@/utils/auth";
import router,{reserRouter} from "@/router";
import ro from "element-ui/src/locale/lang/ro";
import da from "element-ui/src/locale/lang/da";
import {resetRouter} from "../../router";

const state = {
    token: getToken(),
    name: '',
    email: '',
    role: [],
    phone: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_ROLES: (state, role) => {
        state.role = role
    },
    SET_PHONE: (state, phone) =>  {
        state.phone = phone
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            postRequest('/login', {
                username: username.trim(),
                password: password
            }).then(resp=> {
                var data= resp.data;
                commit('SET_TOKEN', data.message);
                setToken(data.message);
                resolve();
            }).catch(error => {
                reject(error);
            });
        })
    },

    // get user info
    getInfo({ commit}) {
        return new Promise((resolve, reject) => {
            getRequest('/getInf').then(response => {
                const { data } = response;

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { role, username, email, phone} = data;

                // roles must be a non-empty array
                if (!role || role.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', role);
                commit('SET_NAME', username);
                commit('SET_EMAIL', email);
                commit('SET_PHONE', phone);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                //dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const { roles } = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            //dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        })
    },

    /**
     * 注册
     * @param commit
     * @param userInfo
     * @returns {Promise<unknown>}
     */
    register({ commit }, userInfo) {
        const { username, password, email, role } = userInfo;
        return new Promise((resolve, reject) => {
            postRequest('/register', {
                username: username.trim(),
                password: password,
                email: email,
                role: role
            }).then(resp=> {
                resolve(resp.data);
            }).catch(error => {
                reject(error);
            });
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
