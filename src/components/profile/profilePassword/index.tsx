import { Button, Col, Form, Input, Row, message, PageHeader } from "antd"
import { useNavigate } from "react-router";
import { getUserLocalStorage } from "../../../context/providers/util";
import { ChangePassword } from "../../../services/auth";

export const ProfilePassword = () => {

    const user = getUserLocalStorage();
    const navigate = useNavigate();

    async function onFinish(values: {oldPassword: string, newPassword: string}) {
        try {
            await ChangePassword(user.email, values.oldPassword, values.newPassword);

            message.success('Senha alterada com sucesso');

            navigate('/users');
        } catch (error) {
            message.error('Erro ao alterar senha');
        }
    }

    return (
        <div>
            <PageHeader
                title="Alterar Senha"
            />
            <Row
                justify='center'
                align='middle'
                style={{
                    height: '50vh'
                }}
            >
                <Col span={12}>
                    <Form
                        name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label='Senha Atual'
                            name='oldPassword'
                            rules={[{ required: true, message: 'Digite sua senha atual!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label='Nova Senha'
                            name='newPassword'
                            rules={[{ required: true, message: 'Digite sua nova senha!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{
                            offset: 8,
                            span: 16
                        }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                            >
                            Confirmar 
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}