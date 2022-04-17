import { FilePdfOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Empty, message, Row, Space, Spin, Table, Tag } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserTypeEnum } from "../../../enums/UserTypeEnum";
import { IUser } from "../../../models/user.interface";
import { GetUsers, RemoveUser } from "../../../services/user";
import { DownloadUsersPdf } from "../downloadUsersPdf";

export const ListUsers = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [users, setUsers] = useState<IUser[] | []>();

    useEffect(() => {
        initializeUsers();
    }, []);

    async function initializeUsers() {
        setLoading(true);

        const users = await GetUsers();

        setLoading(false);

        if (users)
            setUsers(users);
    }

    async function deleteUser(userId: number) {
        try {
            await RemoveUser(userId);
            await initializeUsers();
            message.success('Usuário removido com sucesso');
        } catch (error) {
            message.error('Erro ao remover usuário');
        }
    }

    function getUserType(type: string) {
        let userType = '';

        if (UserTypeEnum.Administrator == type)
            userType = 'Administrador';
        else if (UserTypeEnum.Writer == type)
            userType = 'Escritor';
        else if (UserTypeEnum.Reader == type)
            userType = 'Leitor';

        return userType;
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
        },
        {
            title: 'Tipo',
            key: 'type',
            render: (record: any) => {
                let color = 'red';

                if (UserTypeEnum.Administrator == record.type)
                    color = 'green';
                else if (UserTypeEnum.Writer == record.type)
                    color = 'geekblue';
                else if (UserTypeEnum.Reader == record.type)
                    color = 'magenta';

                return (
                    <Tag color={color} key={record.type}>
                        {getUserType(record.type)}
                    </Tag>
                )
            },
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (record: any) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/users/${record.userId}`)} key="list-edit">Editar</a>
                    <a onClick={() => deleteUser(record.userId)} key="list-delete">Excluir</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            {
                loading ?
                    <Row
                        justify='center'
                        align='middle'
                        style={{
                            height: '50vh'
                        }}
                    >
                        <Spin tip="Carregando..." indicator={antIcon} />
                    </Row>
                :
                    <ConfigProvider renderEmpty={() => <Empty description="Nenhum registro encontrado"/>}>
                        <DownloadUsersPdf users={users ? users : []}/>
                        <Table 
                            columns={columns}
                            dataSource={users}
                            pagination={{ pageSize: 10}}
                        />
                    </ConfigProvider>
            }
        </div>
    )
}