const state={
    collapse:false,
    messageCount:0,
};

const mutations={
    show:(state,isShow) =>{
        state.collapse=isShow;
    },
    mCountplus:(state) =>{
        state.messageCount++;
    },
    mCountsub:(state) =>{
        state.messageCount--;
    },
    mCount:(state,count) =>{
        state.messageCount = count;
    }
}
const actions={
    showCollapse({commit},isShow){
        commit('show',isShow);
    },
    MCountplus({commit}){
        commit('mCountplus');
    },
    MCountsub({commit}){
        commit('mCountsub');
    },
    MCount({commit},count){
        commit('mCount',count);
    }
}
export default{
    namespaced:true,
    mutations,
    actions,
    state
}