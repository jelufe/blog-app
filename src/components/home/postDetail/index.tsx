import { LeftOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../../../models/post.interface';
import { GetPost } from '../../../services/post';
import { CommentList } from '../commentList';

export const PostDetail = () => {
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    let [post, setPost] = useState<IPost | null>();

    useEffect(() => {
        initializePost();
    }, []);

    async function initializePost() {
        setLoading(true);

        const post = await GetPost(Number(id));

        setLoading(false);

        if (post) {
            setPost(post);
        }
    }

    async function openHome() {
        navigate('/');
    }

    return (
        <Row style={{ background: '#f0f2f5' }} justify="space-between" align="middle">
            <Col span={24}>
                <Card
                    style={{
                        minHeight: '75vh',
                        padding: 24,
                        marginTop: 24,
                        marginLeft: 12,
                        marginRight: 12
                    }}>
                        <div style={{ marginBottom: '4vh' }}>
                            <a onClick={() => openHome()}>
                                <LeftOutlined style={{ fontSize: 22, color: 'black' }} />
                            </a>
                        </div>
                        <h2>{post?.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post != null ? post.description : '' }} />
                        <CommentList postId={Number(id)}/>
                </Card>
            </Col>
        </Row>
    );
}