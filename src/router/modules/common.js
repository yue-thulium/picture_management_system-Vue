import mainPage from "@/views/mainpage/mainPage";

const commonRouter = {
    path: '/mainPage',
    name:mainPage,
    component: mainPage,
    children: [
        {
            path: 'test',
            name: 'test',
            component: () => import('../../views/mainpage/testPage'),
            meta: {
                title: '嵌套路由测试页'
            }
        },
        {
            path: 'showSquare',
            name: 'showSquare',
            component: ()=> import('@/views/lookAround/haveALook'),
            meta: {
                title: '随便看哈'
            }
        },
        {
            path: 'publish-picture',
            name: 'publish-picture',
            component: ()=> import('@/views/publish/publish-picture'),
            meta: {
                title: '我要发布涩图'
            }
        },
        {
            path: 'publish-topic',
            name: 'publish-topic',
            component: ()=> import('@/views/publish/publish-topic'),
            meta: {
                title: '我要ghs'
            }
        },
        {
            path: 'mine-fans',
            name: 'mine-fans',
            component: ()=> import('@/views/mine/fans'),
            meta:{
                title: '我的粉丝'
            }
        },
        {
            path: 'mine-concern',
            name: 'mine-concern',
            component: ()=> import('@/views/mine/concern'),
            meta:{
                title: '我的关注'
            }
        },
        {
            path: 'mine-collection',
            name: 'mine-collection',
            component: ()=> import('@/views/mine/collection'),
            meta:{
                title: '我的收藏'
            },
        },
        {
            path:'imgItem-detail',
            name:'imgItem-detail',
            component: ()=> import('@/views/mine/ImgItemDetail'),
        },
        {
            path: 'mine-personalMessage',
            name: 'mine-personalMessage',
            component: ()=> import('@/views/mine/personalMessage'),
            meta:{
                title: '我的私信'
            }
        },
        {
            path: 'mine-history',
            name: 'mine-history',
            component: ()=> import('@/views/mine/history'),
            meta:{
                title: '历史记录'
            }
        },
        {
            path: 'userSetting',
            name: 'UserSetting',
            component: ()=>import('@/views/userSetting/UserSetting'),
            meta:{
                title:'用户设置'
            },

        },
        {
            path:'baseinf',
            name: 'baseinf',
            component: ()=>import('@/views/userSetting/baseinf'),
            meta:{
                title:'基本信息'
            },
        },
        {
            path:'iconconfig',
            name: 'iconconfig',
            component: ()=>import('@/views/userSetting/iconconfig'),
            meta:{
                title:'头像设置'
            },
        },
        {
            path:'passwordconfig',
            name: 'passwordconfig',
            component: ()=>import('@/views/userSetting/passwordconfig'),
            meta:{
                title:'修改密码'
            },
        },
    ]
};

export default commonRouter;
