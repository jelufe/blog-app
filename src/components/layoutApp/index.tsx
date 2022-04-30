import './index.css';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { getUserLocalStorage } from "../../context/providers/util";
import { UserDropdown } from "../layoutPanel/userDropdown";
import { useNavigate } from 'react-router-dom';

export const LayoutApp = ({children} : {children : JSX.Element}) => {
    const user = getUserLocalStorage();
    const navigate = useNavigate();

    async function openLogin() {
        navigate('/login');
    }

    async function openRegister() {
        navigate('/register');
    }

    async function openHome() {
        navigate('/');
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo-title">
                    <a style={{ color: 'white' }} onClick={() => openHome()}>
                        Devzeiros
                    </a>
                </div>
                {
                    user != null
                    ? <div className="avatar">
                        <div>
                            <Avatar icon={<UserOutlined />} />
                            <UserDropdown/>
                        </div>
                    </div>
                    :
                    <div className="menu">
                        <a style={{ color: 'white', marginRight: '1.5vh'}} onClick={() => openLogin()}>
                            Entrar
                        </a>
                        <span style={{ color: 'white' }}> | </span>
                        <a style={{ color: 'white', marginLeft: '1.5vh'}} onClick={() => openRegister()}>
                            Registrar
                        </a>
                    </div>
                }
            </Header>
            <Layout>
                <Layout>
                    <Content className="site-layout-background">
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Devzeiros ©2022</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}