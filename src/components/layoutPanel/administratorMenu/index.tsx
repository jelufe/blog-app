import { CommentOutlined, DashboardOutlined, FileImageOutlined, FormOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useNavigate } from "react-router-dom";

export const AdministratorMenu = () => {
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
        >

            <SubMenu key="dashboard" icon={<DashboardOutlined />} title="Dashboard">
                <Menu.Item key="1" onClick={() => navigate('/dashboard')}>Ver Dashboard</Menu.Item>
            </SubMenu>

            <SubMenu key="users" icon={<UserOutlined />} title="Usuários">
                <Menu.Item key="2" onClick={() => navigate('/users')}>Listar Usuários</Menu.Item>
                <Menu.Item key="3" onClick={() => navigate('/users/create')}>Criar Usuário</Menu.Item>
            </SubMenu>

            <SubMenu key="posts" icon={<FormOutlined />} title="Publicações">
                <Menu.Item key="4" onClick={() => navigate('/posts')}>Listar Publicações</Menu.Item>
                <Menu.Item key="5" onClick={() => navigate('/posts/create')}>Criar Publicação</Menu.Item>
            </SubMenu>

            <SubMenu key="comments" icon={<CommentOutlined />} title="Comentários">
                <Menu.Item key="6" onClick={() => navigate('/comments')}>Listar Comentários</Menu.Item>
                <Menu.Item key="7" onClick={() => navigate('/comments/create')}>Criar Comentário</Menu.Item>
            </SubMenu>

            <SubMenu key="images" icon={<FileImageOutlined />} title="Imagens">
                <Menu.Item key="8" onClick={() => navigate('/images')}>Listar Imagens</Menu.Item>
                <Menu.Item key="9" onClick={() => navigate('/images/create')}>Enviar Imagem</Menu.Item>
            </SubMenu>

            <SubMenu key="notifications" icon={<NotificationOutlined />} title="Notificações">
                <Menu.Item key="10" onClick={() => navigate('/notifications')}>Listar Notificações</Menu.Item>
                <Menu.Item key="11" onClick={() => navigate('/notifications/create')}>Criar Notificação</Menu.Item>
            </SubMenu>
        </Menu>
    );
}