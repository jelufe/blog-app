import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, message, Row, Space, Spin, Table } from "antd";
import moment from "antd/node_modules/moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INotification } from "../../../models/notification.interface";
import { GetNotifications, RemoveNotification } from "../../../services/notification";
import { DownloadNotificationsPdf } from "../downloadNotificationsPdf";

export const ListNotifications = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [notifications, setNotifications] = useState<INotification[] | []>();

    useEffect(() => {
        initializeNotifications();
    }, []);

    async function initializeNotifications() {
        setLoading(true);

        const notifications = await GetNotifications();

        setLoading(false);

        if (notifications)
            setNotifications(notifications);
    }

    async function deleteNotification(notificationId: number) {
        try {
            await RemoveNotification(notificationId);
            await initializeNotifications();
            message.success('Publicação removida com sucesso');
        } catch (error) {
            message.error('Erro ao remover publicação');
        }
    }

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
        },
        {
            title: 'Enviado por',
            key: 'username',
            render: (record: any) => (
                <span>{record.user.name}</span>
            ),
        },
        {
            title: 'Enviado em',
            key: 'createdAt',
            render: (record: any) => (
                <span>{moment(record.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (record: any) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/notifications/${record.notificationId}`)} key="list-edit">Editar</a>
                    <a onClick={() => deleteNotification(record.notificationId)} key="list-delete">Excluir</a>
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
                        <DownloadNotificationsPdf notifications={notifications ? notifications : []}/>
                        <Table 
                            columns={columns}
                            dataSource={notifications}
                            pagination={{ pageSize: 10}}
                        />
                    </ConfigProvider>
            }
        </div>
    )
}