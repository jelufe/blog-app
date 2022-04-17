import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, message, Row, Space, Spin, Table } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IPost } from "../../../models/post.interface";
import { GetPosts, RemovePost } from "../../../services/post";
import { DownloadPostsPdf } from "../downloadPostsPdf";

export const ListPosts = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [posts, setPosts] = useState<IPost[] | []>();

    useEffect(() => {
        initializePosts();
    }, []);

    async function initializePosts() {
        setLoading(true);

        const posts = await GetPosts();

        setLoading(false);

        if (posts)
            setPosts(posts);
    }

    async function deletePost(postId: number) {
        try {
            await RemovePost(postId);
            await initializePosts();
            message.success('Publicação removida com sucesso');
        } catch (error) {
            message.error('Erro ao remover publicação');
        }
    }

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
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
                    <a onClick={() => navigate(`/posts/${record.postId}`)} key="list-edit">Editar</a>
                    <a onClick={() => deletePost(record.postId)} key="list-delete">Excluir</a>
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
                        <DownloadPostsPdf posts={posts ? posts : []}/>
                        <Table 
                            columns={columns}
                            dataSource={posts}
                            pagination={{ pageSize: 10}}
                        />
                    </ConfigProvider>
            }
        </div>
    )
}