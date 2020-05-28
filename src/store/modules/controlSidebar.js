const state={
    collapse:false,
};
// const getters={
//     isShowCollapse(state){
//         return state.collapse;
//     }
// }
const mutations={
    show:(state,isShow) =>{
        state.collapse=isShow;
    }
}
const actions={
    showCollapse({commit},isShow){
        commit('show',isShow);
    },
}
export default{
    namespaced:true,
    mutations,
    actions,
    state
}