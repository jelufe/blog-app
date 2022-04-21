import { Button, Col, Form, Input, Row, message, PageHeader, Select, Spin } from "antd"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IPost } from "../../../models/post.interface";
import { GetPost, InsertPost, UpdatePost } from "../../../services/post";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUserLocalStorage } from "../../../context/providers/util";
import { LoadingOutlined } from "@ant-design/icons";
import { GetImages } from "../../../services/image";
import { IImage } from "../../../models/image.interface";

export const PostForm = () => {
    const user = getUserLocalStorage();
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    let [post, setPost] = useState<IPost | null>();
    const [description, setDescription] = useState('');
    const [form] = Form.useForm();
    let [images, setImages] = useState<IImage[] | []>();

    useEffect(() => {
        initializePost();
    }, []);

    async function initializePost() {
        if (id) {
            setLoading(true);

            await loadImages();

            const post = await GetPost(Number(id));

            setLoading(false);

            if (post) {
                setPost(post);
                setDescription(post.description);
                form.setFieldsValue({title: post.title, imageId: post.image.imageId});
            }
        } else {
            setLoading(true);

            await loadImages();

            setLoading(false);
        }
    }

    async function loadImages() {
        const images = await GetImages();

        if (images) {
            setImages(images);
        }
    }

    async function onFinish(values: {title: string, imageId: number}) {
        if(id) {
            try {
                await UpdatePost(Number(id), values.title, description, user.userId, values.imageId);
                message.success('Publicação atualizada com sucesso');
    
                navigate('/posts');
            } catch (error) {
                message.error('Erro ao atualizar publicação');
            }
        } else {
            try {
                await InsertPost(values.title, description, user.userId, values.imageId);
                message.success('Publicação criada com sucesso');
    
                navigate('/posts');
            } catch (error) {
                message.error('Erro ao criar publicação');
            }
        }
    }

    return (
        <div>
            <PageHeader
                title={id ? "Atualizar Publicação" : "Criar Publicação"}
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
                                name="login"
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

                                <Form.Item name="imageId" label="Imagem de Capa" rules={[{ required: true }]}>
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        placeholder="Selecione a Imagem"
                                        filterOption={(input: any, option: any) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {images?.map((item) => (
                                            <Select.Option value={item.imageId}>{item.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item 
                                    label='Descrição'
                                >
                                    <ReactQuill 
                                        theme="snow" 
                                        value={description} 
                                        onChange={setDescription}
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