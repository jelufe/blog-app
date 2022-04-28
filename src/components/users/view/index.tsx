import { LoadingOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Spin } from "antd";
import { useState } from "react";
import { UserTypeEnum } from "../../../enums/UserTypeEnum";
import { IUser } from "../../../models/user.interface";
import { GetUser } from "../../../services/user";

export const ViewUser = (props : {id: number, name: string}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [loading, setLoading] = useState<boolean>();
    let [user, setUser] = useState<IUser | null>();

    async function initializeImage() {
        setLoading(true);

        const user = await GetUser(Number(props.id));

        setLoading(false);

        if (user)
            setUser(user);
    }

    const showModal = () => {
        setIsModalVisible(true);
        initializeImage();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function getUserType() {
        let userType = '';

        if (user != null)
        {
            if (UserTypeEnum.Administrator == user.type)
                userType = 'Administrador';
            else if (UserTypeEnum.Writer == user.type)
                userType = 'Escritor';
            else if (UserTypeEnum.Reader == user.type)
                userType = 'Leitor';
        }

        return userType;
    }

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
                            <Col style={{ fontSize: 20 }}><b>Nome de usuário: </b>{user != null ? user.name : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>E-mail: </b>{user != null ? user.email : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Tipo: </b>{getUserType()}</Col>
                        </Row>
                    </Col>
                </Modal>
            }
        </>
      );
}
