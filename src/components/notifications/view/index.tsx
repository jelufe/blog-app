import { LoadingOutlined } from "@ant-design/icons";
import { Col, Divider, Modal, Row, Spin } from "antd";
import moment from "antd/node_modules/moment";
import { useEffect, useState } from "react";
import { INotification } from "../../../models/notification.interface";
import { GetNotification } from "../../../services/notification";

export const ViewNotification = (props : {id: number, name: string}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [loading, setLoading] = useState<boolean>();
    let [notification, setNotification] = useState<INotification | null>();

    useEffect(() => {
        initializeNotification();
    }, []);

    async function initializeNotification() {
        setLoading(true);

        const notification = await GetNotification(props.id);

        setLoading(false);

        if (notification)
            setNotification(notification);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <a onClick={showModal} key="list-delete">Visualizar</a>
            {loading ?
                <Modal title={props.name} visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                    <Row
                        justify='center'
                        align='middle'
                        style={{
                            height: '50vh'
                        }}
                    >
                        <Spin tip="Carregando..." indicator={antIcon} />
                    </Row>
                </Modal>
            : 
                <Modal title={props.name} visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                    <Col span={24}>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Título: </b>{notification != null ? notification.title : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Enviado em: </b>{notification != null ? moment(notification.createdAt).format('DD/MM/YYYY HH:mm:ss') : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Enviado por: </b>{notification != null ? notification.user.name : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Enviado para: </b>{notification?.receiver?.name != null ? notification.receiver.name : 'Todos'}</Col>
                        </Row>
                        <Divider/>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 16 }}><div dangerouslySetInnerHTML={{ __html: notification != null ? notification.message : '' }} /></Col>
                        </Row>
                    </Col>
                </Modal>
            }
        </>
      );
}