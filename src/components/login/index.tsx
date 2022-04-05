import { Button, Col, Form, Input, Row, message, Card } from "antd"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";

export const Login = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    async function onFinish(values: {email: string, password: string}) {

        try {
            await auth.authenticate(values.email, values.password);

            navigate('/users');
        } catch (error) {
            message.error('Usuário e/ou senha inválidos');
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
                <Col span={24}>
                    <div>
                        <h2 style={{ textAlign: 'center', marginBottom: '5vh' }}>Blog</h2>
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
                    </Form>
                </Col>
            </Card>
        </Row>
    )
}