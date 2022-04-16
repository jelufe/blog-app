import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, PageHeader, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserLocalStorage } from "../../../context/providers/util";
import { IComment } from "../../../models/comment.interface";
import { IPost } from "../../../models/post.interface";
import { GetComment, InsertComment, UpdateComment } from "../../../services/comment";
import { GetAllPosts } from "../../../services/post";

export const CommentForm = () => {
    const user = getUserLocalStorage();
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    let [comment, setComment] = useState<IComment | null>();
    let [posts, setPosts] = useState<IPost[] | []>();
    const [form] = Form.useForm();

    useEffect(() => {
        initializeComment();
    }, []);

    async function initializeComment() {
        if (id) {
            setLoading(true);

            const comment = await GetComment(Number(id));

            await loadPosts();

            setLoading(false);

            if (comment) {
                setComment(comment);
                form.setFieldsValue(comment);
            }
        } else {
            await loadPosts();
        }
    }

    async function loadPosts() {
        const posts = await GetAllPosts();

        if (posts) {
            setPosts(posts);
        }
    }

    async function onFinish(values: {message: string, postId: number}) {
        if(id) {
            try {
                await UpdateComment(Number(id), values.message, user.userId, values.postId);
                message.success('Publicação atualizada com sucesso');
    
                navigate('/comments');
            } catch (error) {
                message.error('Erro ao atualizar publicação');
            }
        } else {
            try {
                await InsertComment(values.message, user.userId, values.postId);
                message.success('Publicação criada com sucesso');
    
                navigate('/comments');
            } catch (error) {
                message.error('Erro ao criar publicação');
            }
        }
    }

    return (
        <div>
            <PageHeader
                title={id ? "Atualizar Comentário" : "Criar Comentário"}
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
                                name="comment"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label='Mensagem'
                                    name='message'
                                    rules={[{ required: true, message: 'Digite a Mensagem!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="postId" label="Publicação" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        placeholder="Selecione a Publicação"
                                    >
                                        {posts?.map((item) => (
                                            <Select.Option value={item.postId}>{item.title}</Select.Option>
                                        ))}
                                    </Select>
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