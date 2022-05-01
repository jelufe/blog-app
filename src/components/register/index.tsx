import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message, Card, Select, Spin } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";
import { getUserLocalStorage } from "../../context/providers/util";
import { UserTypeEnum } from "../../enums/UserTypeEnum";
import { InsertUser } from "../../services/user";
import './index.css';

export const Register = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const auth = useAuth();
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();

    async function onFinish(values: {name: string, type: string, email: string, password: string}) {
        try {
            setLoading(true);

            await InsertUser(values.name, values.type, values.email, values.password);
            message.success('Usuário criado com sucesso');

        } catch (error) {
            message.error('Erro ao criar usuário');

            setLoading(false);

            return;
        }

        try {
            await auth.authenticate(values.email, values.password);

            const user = getUserLocalStorage();

            setLoading(false);

            if (UserTypeEnum.Reader == user?.role)
                navigate('/comments');
            else
                navigate('/dashboard');
        } catch (error) {
            message.error('Usuário e/ou senha inválidos');

            setLoading(false);
        }

    }

    async function openLogin() {
        navigate('/login');
    }

    async function openHome() {
        navigate('/');
    }

    return (
        <Row
            justify='center'
            align='middle'
            style={{
                height: '100vh',
                background: '#f0f2f5'
            }}
        >
            <Card className="card-responsive">
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
                        <Col span={24}>
                            <div>
                                <h2 style={{ textAlign: 'center', marginBottom: '5vh' }}>
                                    <a onClick={openHome}>Devzeiros</a>
                                </h2>
                            </div>
                            <Form
                                name="register"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label='Nome'
                                    name='name'
                                    rules={[{ required: true, message: 'Digite seu Nome!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Selecione o tipo do usuário"
                                    >
                                        <Select.Option value={UserTypeEnum.Administrator}>Administrador</Select.Option>
                                        <Select.Option value={UserTypeEnum.Writer}>Escritor</Select.Option>
                                        <Select.Option value={UserTypeEnum.Reader}>Leitor</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label='E-mail'
                                    name='email'
                                    rules={[{ required: true, message: 'Digite seu e-mail!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label='Senha'
                                    name='password'
                                    rules={[{ required: true, message: 'Digite sua senha!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                        >
                                            Registrar 
                                        </Button>
                                    </Form.Item>
                                </Col>
                                Já tem uma conta? <a onClick={openLogin}>clique aqui para entrar!</a>
                            </Form>
                        </Col>
                    }
            </Card>
        </Row>
    )
}