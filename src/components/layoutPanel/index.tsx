import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { UserDropdown } from './userDropdown';
import { Footer } from 'antd/lib/layout/layout';
import { AdministratorMenu } from './administratorMenu';
import { getUserLocalStorage } from '../../context/providers/util';
import { UserTypeEnum } from '../../enums/UserTypeEnum';
import { WriterMenu } from './writerMenu';
import { ReaderMenu } from './readerMenu';

const { Header, Content, Sider } = Layout;

export const LayoutPanel = ({children, paths} : {children : JSX.Element, paths : string[]}) => {
    const user = getUserLocalStorage();
    const navigate = useNavigate();

    async function openHome() {
        navigate('/');
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo-title">
                    <a style={{ color: 'white' }} onClick={() => openHome()}>
                        Blog
                    </a>
                </div>
                <div className="avatar">
                    <div>
                        <Avatar icon={<UserOutlined />} />
                        <UserDropdown/>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    {
                        user?.role == UserTypeEnum.Administrator ?
                            <AdministratorMenu/>
                        :
                            user?.role == UserTypeEnum.Writer ?
                                <WriterMenu/>
                            :
                                <ReaderMenu/>
                    }
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {paths.map((path, i) => {        
                            return (<Breadcrumb.Item>{path}</Breadcrumb.Item>) 
                        })}
                    </Breadcrumb>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: '67.8vh',
                    }}
                    >
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Blog ©2022</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}