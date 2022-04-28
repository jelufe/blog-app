import { LoadingOutlined } from "@ant-design/icons";
import { Col, Divider, Modal, Row, Spin } from "antd";
import { useState } from "react";
import { IComment } from "../../../models/comment.interface";
import { GetComment } from "../../../services/comment";

export const ViewComment = (props : {id: number, name: string}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [loading, setLoading] = useState<boolean>();
    let [comment, setComment] = useState<IComment | null>();

    async function initializeComment() {
        setLoading(true);

        const comment = await GetComment(Number(props.id));

        setLoading(false);

        if (comment)
            setComment(comment);
    }

    const showModal = () => {
        setIsModalVisible(true);
        initializeComment();
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
                            <Col style={{ fontSize: 20 }}><b>Publicação: </b>{comment != null ? comment.post.title : ''}</Col>
                        </Row>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 20 }}><b>Usuário: </b>{comment != null ? comment.user.name : ''}</Col>
                        </Row>
                        <Divider/>
                        <Row
                            justify='center'
                            align='middle'
                        >
                            <Col style={{ fontSize: 16 }}><div dangerouslySetInnerHTML={{ __html: comment != null ? comment.message : '' }} /></Col>
                        </Row>
                    </Col>
                </Modal>
            }
        </>
    );
}