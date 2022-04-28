import { LoadingOutlined } from "@ant-design/icons";
import { Image, Col, Divider, Modal, Row, Spin } from "antd";
import { useState } from "react";
import { IPost } from "../../../models/post.interface";
import { GetPost } from "../../../services/post";

export const ViewPost = (props : {id: number, name: string}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [loading, setLoading] = useState<boolean>();
    let [post, setPost] = useState<IPost | null>();

    async function initializePost() {
        setLoading(true);

        const post = await GetPost(props.id);

        setLoading(false);

        if (post)
        setPost(post);
    }

    const showModal = () => {
        setIsModalVisible(true);
        initializePost();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <a onClick={showModal} key="list-delete">Visualizar</a>
            {loading ?
                <Modal title={props.name} visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                    <Row
                        justify='center'
                        align='middle'
                        style={{
                            height: '50vh'
                        }}
                    >
                        <Spin tip="Carregando..." indicator={antIcon} />
                    </Row>
                </Modal>
            : 
                <Modal title={props.name} visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                    <Col span={24}>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Image
                                width={262}
                                height={159}
                                src={post?.image.path}
                            />
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Título: </b>{post != null ? post.title : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Usuário: </b>{post != null ? post.user.name : ''}</Col>
                        </Row>
                        <Divider/>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 16 }}><div dangerouslySetInnerHTML={{ __html: post != null ? post.description : '' }} /></Col>
                        </Row>
                    </Col>
                </Modal>
            }
        </>
    );
}