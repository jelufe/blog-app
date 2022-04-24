import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, PageHeader, Row, Select, Spin } from "antd";
import { message as messageAlert } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { getUserLocalStorage } from "../../../context/providers/util";
import { INotification } from "../../../models/notification.interface";
import { IUser } from "../../../models/user.interface";
import { GetNotification, InsertNotification, UpdateNotification } from "../../../services/notification";
import { GetUsers } from "../../../services/user";

export const NotificationForm = () => {
    const user = getUserLocalStorage();
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    let [notification, setNotification] = useState<INotification | null>();
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    let [users, setUsers] = useState<IUser[] | []>();

    useEffect(() => {
        initializeNotification();
    }, []);

    async function initializeNotification() {
        if (id) {
            setLoading(true);

            await loadUsers();

            const notification = await GetNotification(Number(id));

            setLoading(false);

            if (notification) {
                setNotification(notification);
                setMessage(notification.message);
                form.setFieldsValue({title: notification.title, receiverId: (notification.receiver == null ? 0 : notification.receiver.userId)});
            }
        } else {
            setLoading(true);

            await loadUsers();

            setLoading(false);
        }
    }

    async function loadUsers() {
        const users = await GetUsers();

        if (users) {
            setUsers(users);
        }
    }

    async function onFinish(values: {title: string, receiverId: number}) {
        if(id) {
            try {
                await UpdateNotification(Number(id), values.title, message, user.userId, values.receiverId);
                messageAlert.success('Notificação atualizada com sucesso');
    
                navigate('/notifications');
            } catch (error) {
                messageAlert.error('Erro ao atualizar notificação');
            }
        } else {
            try {
                await InsertNotification(values.title, message, user.userId, values.receiverId);
                messageAlert.success('Notificação criada com sucesso');
    
                navigate('/notifications');
            } catch (error) {
                messageAlert.error('Erro ao criar notificação');
            }
        }
    }

    return (
        <div>
            <PageHeader
                title={id ? "Atualizar Notificação" : "Criar Notificação"}
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
                        style={{
                            height: '50vh'
                        }}
                    >
                        <Col span={24}>
                            <Form
                                form={form}
                                name="notification"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label='Título'
                                    name='title'
                                    rules={[{ required: true, message: 'Digite o Título!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="receiverId" label="Destinatário" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        placeholder="Selecione o Destinatário"
                                        filterOption={(input: any, option: any) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Select.Option value={0}>Todos</Select.Option>
                                        {users?.map((item) => (
                                            <Select.Option value={item.userId}>{item.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item 
                                    label='Descrição'
                                >
                                    <ReactQuill 
                                        theme="snow" 
                                        value={message} 
                                        onChange={setMessage}
                                    />
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