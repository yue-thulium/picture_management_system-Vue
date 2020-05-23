import mainPage from "@/views/mainpage/mainPage";

const commonRouter = {
    path: '/mainPage',
    component: mainPage,
    children: [
        {
            path: 'test',
            component: () => import('../../views/mainpage/testPage'),
            meta: {
                title: '嵌套路由测试页'
            }
        }
    ]
};

export default commonRouter;
