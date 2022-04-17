import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Empty, message, Row, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IComment } from "../../../models/comment.interface";
import { GetComments, RemoveComment } from "../../../services/comment";
import { DownloadCommentsPdf } from "../downloadCommentsPdf";

export const ListComments = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [comments, setComments] = useState<IComment[] | []>();

    useEffect(() => {
        initializeComments();
    }, []);

    async function initializeComments() {
        setLoading(true);

        const comments = await GetComments();

        setLoading(false);

        if (comments)
            setComments(comments);
    }

    async function deleteComment(commentId: number) {
        try {
            await RemoveComment(commentId);
            await initializeComments();
            message.success('Comentário removido com sucesso');
        } catch (error) {
            message.error('Erro ao remover comentário');
        }
    }

    const columns = [
        {
            title: 'Mensagem',
            dataIndex: 'message',
        },
        {
            title: 'Usuário',
            key: 'username',
            render: (record: any) => (
                <span>{record.user.name}</span>
            ),
        },
        {
            title: 'Publicação',
            key: 'post',
            render: (record: any) => (
                <span>{record.post.title}</span>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (record: any) => (
                <Space size="middle">
                    <a onClick={() => navigate(`/comments/${record.commentId}`)} key="list-edit">Editar</a>
                    <a onClick={() => deleteComment(record.commentId)} key="list-delete">Excluir</a>
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
                        <DownloadCommentsPdf comments={comments ? comments : []}/>
                        <Table 
                            columns={columns}
                            dataSource={comments}
                            pagination={{ pageSize: 10}}
                        />
                    </ConfigProvider>
            }
        </div>
    )
}