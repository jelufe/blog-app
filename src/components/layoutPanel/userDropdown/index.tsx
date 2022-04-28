import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getUserLocalStorage, removeUserLocalStorage } from '../../../context/providers/util';
import { useNavigate } from 'react-router-dom';
import { UserTypeEnum } from '../../../enums/UserTypeEnum';

export const UserDropdown = () => {
    const navigate = useNavigate();
    const user = getUserLocalStorage();
    let [dropdownVisible, setDropdownVisible] = useState<boolean>();

    const handleMenuClick = (e: { key: string; }) => {
        if (e.key === '1') {
            setDropdownVisible(false);
            
            if (UserTypeEnum.Reader == user?.role)
                navigate('/comments');
            else
                navigate('/dashboard');
        }
        if (e.key === '2') {
            setDropdownVisible(false);
            navigate('/profile');
        }
        if (e.key === '3') {
            setDropdownVisible(false);

            if (!user.googleId)
                navigate('/profile/password');
            else
                message.error('Página não disponível para usuário Google');
        }
        if (e.key === '4') {
            setDropdownVisible(false);
            removeUserLocalStorage();
            navigate('/login');
        }
    };

    const handleVisibleChange = (flag: boolean) => {
        setDropdownVisible(flag);
    };

    const menu = (
        <Menu style={{ marginTop: '2vh'}} onClick={handleMenuClick}>
            <Menu.Item key="1">Painel</Menu.Item>
            <Menu.Item key="2">Meu Perfil</Menu.Item>
            <Menu.Item key="3">Alterar Senha</Menu.Item>
            <Menu.Item key="4">Sair</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={dropdownVisible}
        >
            <a style={{ color: 'white', marginLeft: '1.5vh'}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {user.username} <DownOutlined />
            </a>
        </Dropdown>
    );
}