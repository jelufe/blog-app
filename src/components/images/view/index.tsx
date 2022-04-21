import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { GetImage } from "../../../services/image";

export const ViewImage = (props : {imageId: number, imageName: string}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [loading, setLoading] = useState<boolean>();
    let [image, setImage] = useState<any>();

    useEffect(() => {
        initializeImage();
    }, []);

    async function initializeImage() {
        setLoading(true);

        const image = await GetImage(props.imageId);

        setLoading(false);

        if (image)
            setImage(image);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <a onClick={showModal} key="list-delete">Visualizar</a>
            {loading ?
                <Modal title={props.imageName} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                <Modal title={props.imageName} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <img style={{width: '100%', height: 'auto'}} src={`data:image/jpg;charset=utf-8;base64,${image}`} />
                </Modal>
            }
        </>
      );
}