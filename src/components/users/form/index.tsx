import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message, PageHeader, Select, Spin } from "antd"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserTypeEnum } from "../../../enums/UserTypeEnum";
import { IUser } from "../../../models/user.interface";
import { GetUser, InsertUser, UpdateUser } from "../../../services/user";

export const UserForm = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    let [user, setUser] = useState<IUser | null>();
    const [form] = Form.useForm();

    useEffect(() => {
        initializeUser();
    }, []);

    async function initializeUser() {
        if (id) {
            setLoading(true);

            const user = await GetUser(Number(id));

            setLoading(false);

            if (user) {
                setUser(user);
                form.setFieldsValue(user);
            }
        }
    }

    async function onFinish(values: {name: string, type: string, email: string, password: string}) {
        if(id) {
            try {
                await UpdateUser(Number(id), values.name, values.type, values.email, values.password);
                message.success('Usuário atualizado com sucesso');
    
                navigate('/users');
            } catch (error) {
                message.error('Erro ao atualizar usuário');
            }
        } else {
            try {
                await InsertUser(values.name, values.type, values.email, values.password);
                message.success('Usuário criado com sucesso');
    
                navigate('/users');
            } catch (error) {
                message.error('Erro ao criar usuário');
            }
        }
    }

    return (
        <div>
            <PageHeader
                title={id ? "Atualizar Usuário" : "Criar Usuário"}
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
                    <Row
                        justify='center'
                        align='middle'
                        style={{
                            height: '50vh'
                        }}
                    >
                        <Col span={12}>
                            <Form
                                form={form}
                                name="login"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
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
                                    rules={[{ required: true, message: 'Digite um e-mail!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                
                                <Form.Item
                                    label='Senha'
                                    name='password'
                                    rules={[{ required: true, message: 'Digite uma senha!' }]}
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
            }
        </div>
    )
}