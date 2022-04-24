import { Button, Col, Form, Input, Row, message, Card, Select } from "antd"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks/useAuth";
import { UserTypeEnum } from "../../enums/UserTypeEnum";
import { InsertUser } from "../../services/user";

export const Register = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    async function onFinish(values: {name: string, type: string, email: string, password: string}) {
        try {
            await InsertUser(values.name, values.type, values.email, values.password);
            message.success('Usuário criado com sucesso');

        } catch (error) {
            message.error('Erro ao criar usuário');
            return;
        }

        try {
            await auth.authenticate(values.email, values.password);

            navigate('/users');
        } catch (error) {
            message.error('Usuário e/ou senha inválidos');
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
                        name="register"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
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

                        <Form.Item wrapperCol={{
                            offset: 20,
                            span: 4
                        }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                            >
                            Registrar 
                            </Button>
                        </Form.Item>
                        Já tem uma conta? <a onClick={openLogin}>clique aqui para entrar!</a>
                    </Form>
                </Col>
            </Card>
        </Row>
    )
}