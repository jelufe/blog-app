import { GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message, Card, Divider } from "antd"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";
import { getUserLocalStorage } from "../../context/providers/util";
import { UserTypeEnum } from "../../enums/UserTypeEnum";

export const Login = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    async function onFinish(values: {email: string, password: string}) {

        try {
            await auth.authenticate(values.email, values.password);

            const user = getUserLocalStorage();
            
            if (UserTypeEnum.Reader == user?.role)
                navigate('/comments');
            else
                navigate('/dashboard');

        } catch (error) {
            message.error('Usuário e/ou senha inválidos');
        }
    }

    async function openRegister() {
        navigate('/register');
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
            <Card
                style={{
                    padding: 24,
                    width: '40%'
                }}
            >
                <Col span={24}>
                    <div>
                        <h2 style={{ textAlign: 'center', marginBottom: '5vh' }}>
                            <a onClick={openHome}>Blog</a>
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
                        <Button type="primary" shape="round" icon={<GoogleOutlined />} danger>
                            Entrar com uma conta Google
                        </Button>
                    </div>
                </Col>
            </Card>
        </Row>
    )
}