import { CommentOutlined, NotificationOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const { SubMenu } = Menu;
import { useNavigate } from "react-router-dom";

export const ReaderMenu = () => {
    const navigate = useNavigate();

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['comments']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <SubMenu key="comments" icon={<CommentOutlined />} title="Comentários">
                <Menu.Item key="1" onClick={() => navigate('/comments')}>Listar Comentários</Menu.Item>
                <Menu.Item key="2" onClick={() => navigate('/comments/create')}>Criar Comentário</Menu.Item>
            </SubMenu>

            <SubMenu key="notifications" icon={<NotificationOutlined />} title="Notificações">
                <Menu.Item key="3" onClick={() => navigate('/notifications')}>Listar Notificações</Menu.Item>
            </SubMenu>
        </Menu>
    );
}