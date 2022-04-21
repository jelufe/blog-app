import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, message, Row, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IImage } from "../../../models/image.interface";
import { GetImages, RemoveImage } from "../../../services/image";
import { DownloadImagesPdf } from "../downloadImagesPdf";
import { ViewImage } from "../view";

export const ListImages = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [images, setImages] = useState<IImage[] | []>();

    useEffect(() => {
        initializeImages();
    }, []);

    async function initializeImages() {
        setLoading(true);

        const images = await GetImages();

        setLoading(false);

        if (images)
            setImages(images);
    }

    async function deleteImage(imageId: number) {
        try {
            await RemoveImage(imageId);
            await initializeImages();
            message.success('Imagem removida com sucesso');
        } catch (error) {
            message.error('Erro ao remover imagem');
        }
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Usuário',
            key: 'username',
            render: (record: any) => (
                <span>{record.user.name}</span>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (record: any) => (
                <Space size="middle">
                    <ViewImage imageId={record.imageId} imageName={record.name} />
                    <a onClick={() => deleteImage(record.imageId)} key="list-delete">Excluir</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
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
                    <ConfigProvider renderEmpty={() => <Empty description="Nenhum registro encontrado"/>}>
                        <DownloadImagesPdf images={images ? images : []}/>
                        <Table 
                            columns={columns}
                            dataSource={images}
                            pagination={{ pageSize: 10}}
                        />
                    </ConfigProvider>
            }
        </div>
    )
}