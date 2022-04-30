import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message, Card, Divider, Spin } from "antd"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";
import { getUserLocalStorage } from "../../context/providers/util";
import { UserTypeEnum } from "../../enums/UserTypeEnum";
import { GoogleLogin } from 'react-google-login';
import { useState } from "react";

export const Login = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const auth = useAuth();
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();

    async function onFinish(values: {email: string, password: string}) {

        try {

            setLoading(true);

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

    async function openRegister() {
        navigate('/register');
    }

    async function openHome() {
        navigate('/');
    }
    
    const responseGoogle = async (response: any) => {
        try {
            setLoading(true);

            await auth.authenticateGoogle(response.tokenId);

            const user = getUserLocalStorage();

            setLoading(false);
            
            if (UserTypeEnum.Reader == user?.role)
                navigate('/comments');
            else
                navigate('/dashboard');

        } catch (error) {
            message.error('Erro ao realizar login');

            setLoading(false);
        }
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
            <Card
                style={{
                    padding: 24,
                    width: '40%'
                }}
            >
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
                                name="login"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                                onFinish={onFinish}
                            >
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

                                <Form.Item wrapperCol={{
                                    offset: 20,
                                    span: 4
                                }}>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                    >
                                    Entrar 
                                    </Button>
                                </Form.Item>
                                Não tem uma conta? <a onClick={openRegister}>clique aqui para criar uma conta!</a>
                            </Form>
                            <Divider/>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <GoogleLogin
                                    clientId="674451072049-n70um31g8f3ea8iokpdctgjn8g0ktp4e.apps.googleusercontent.com"
                                    buttonText="Entrar com uma conta Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </Col>
                    }
            </Card>
        </Row>
    )
}