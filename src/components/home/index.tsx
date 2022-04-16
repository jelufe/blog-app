import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { IPost } from "../../models/post.interface";
import { GetAllPosts } from "../../services/post";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [posts, setPosts] = useState<IPost[] | []>();

    useEffect(() => {
        initializePosts();
    }, []);

    async function initializePosts() {
        setLoading(true);

        const posts = await GetAllPosts();

        setLoading(false);

        if (posts)
            setPosts(posts);
    }

    async function openPost(id: number) {
        navigate(`/posts/${id}/details`);
    }

    return (
        <Row style={{ background: '#f0f2f5', minHeight: '79vh' }} justify="space-between" align="middle">
            {posts?.map((item) => (
            <Col>
                <Card
                    style={{
                        paddingTop: 24,
                        paddingLeft: 24,
                        paddingRight: 24,
                        marginTop: 24,
                        marginLeft: 12,
                        marginRight: 12
                    }}
                    cover={
                    <img
                        style={{
                            width: 262,
                            height: 159
                        }}
                        src="https://decisaosistemas.com.br/wp-content/uploads/2021/06/tecnologia-na-gestao-das-empresas.jpg"
                    />
                    }
                    actions={[
                        <a onClick={() => openPost(item.postId)}>Ler Publicação</a>
                    ]}
                >
                    <Meta
                        title={item.title}
                        description={`Escritor: ${item.user.name}`}
                    />
                </Card>
            </Col>
            ))}
        </Row>
    );
}