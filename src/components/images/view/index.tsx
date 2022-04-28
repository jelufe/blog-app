import { Modal, Image, Row } from "antd";
import { useState } from "react";

export const ViewImage = (props : {imageId: number, imageName: string, path: string}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <a onClick={showModal} key="list-delete">Visualizar</a>
            <Modal title={props.imageName} visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <Row
                    justify='center'
                    align='middle'
                    style={{
                        height: '50vh'
                    }}
                >
                    <Image 
                        width={262}
                        height={159}
                        src={props.path}
                    />
                </Row>
            </Modal>
        </>
      );
}