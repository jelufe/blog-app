import { LoadingOutlined } from "@ant-design/icons";
import { Col, PageHeader, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { getUserLocalStorage } from "../../context/providers/util";
import { UserTypeEnum } from "../../enums/UserTypeEnum";
import { IUser } from "../../models/user.interface";
import { GetUser } from "../../services/user";

export const Profile = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    let [loading, setLoading] = useState<boolean>();
    let [user, setUser] = useState<IUser | null>();
    const userLocalStorage = getUserLocalStorage();

    useEffect(() => {
        initializeUser();
    }, []);

    async function initializeUser() {
        setLoading(true);

        const user = await GetUser(Number(userLocalStorage.userId));

        setLoading(false);

        if (user) {
            setUser(user);
        }
    }

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
        <div>
            <PageHeader
                title="Perfil"
            />
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
                    <div>
                    <Row
                        justify='center'
                        align='middle'
                        style={{
                            height: '2vh'
                        }}
                    />
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
                    </div>
            }
        </div>
    )
}