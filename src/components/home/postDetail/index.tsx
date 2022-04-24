import { LeftOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSessionLocalStorage, getUserLocalStorage, setSessionLocalStorage } from '../../../context/providers/util';
import { IPost } from '../../../models/post.interface';
import { GetLike, GetPost, GetVisualization } from '../../../services/post';
import { InsertVisualization, UpdateVisualization } from '../../../services/visualization';
import { CommentList } from '../commentList';
import { v4 as uuidv4 } from 'uuid';
import { InsertLike, RemoveLike } from '../../../services/like';
import { ILike } from '../../../models/like.interface';

export const PostDetail = () => {
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    let [post, setPost] = useState<IPost | null>();
    const user = getUserLocalStorage();
    let sessionId = getSessionLocalStorage();
    let [like, setLike] = useState<ILike | null>();

    useEffect(() => {
        initializePost();
    }, []);

    async function initializePost() {
        setLoading(true);

        await loadLike();

        const post = await GetPost(Number(id));

        setLoading(false);

        if (post) {
            setPost(post);
            AddVisualization();
        }
    }

    async function loadLike()
    {
        if (user) {
            try {
                const like = await GetLike(Number(id));

                if (like)
                    setLike(like);
            } catch {
                setLike(null);  
            }
        }
    }

    async function addLike()
    {
        if (user) {
            if (like) {
                await RemoveLike(Number(id));

                try {
                    const like = await GetLike(Number(id));

                    if (like)
                        setLike(like);
                } catch {
                    setLike(null);  
                }
            } else {
                await InsertLike(Number(id));

                try {
                    const like = await GetLike(Number(id));

                    if (like)
                        setLike(like);
                } catch {
                    setLike(null);  
                }
            }
        } else {
            message.error('Você precisa estar logado realizar essa ação');
        }
    }

    async function AddVisualization() {
        if (!sessionId) {
            setSessionLocalStorage(uuidv4());
            sessionId = getSessionLocalStorage();
        }

        if (user) {
            var sessionVisualization = await GetVisualization(null, sessionId, Number(id));

            if (sessionVisualization && (sessionVisualization.userId == null || sessionVisualization.userId == 0)) {
                await UpdateVisualization(sessionVisualization.visualizationId, sessionId, user.userId, Number(id));
            } else {
                var userVisualization = await GetVisualization(user.userId, null, Number(id));

                if (!userVisualization)
                    await InsertVisualization(sessionId, user.userId, Number(id));
            }
        } else {
            var sessionVisualization = await GetVisualization(null, sessionId, Number(id));

            if (!sessionVisualization)
                await InsertVisualization(sessionId, null, Number(id));
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
                        <Row>
                            <Col span={12}>
                                <div style={{ marginBottom: '4vh' }}>
                                    <a onClick={() => openHome()}>
                                        <LeftOutlined style={{ fontSize: 22, color: 'black' }} />
                                    </a>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ float: 'right' }}>
                                    <Button shape="circle" onClick={addLike} type={like ? "primary" : "default"} icon={<LikeOutlined />} />
                                </div>
                            </Col>
                        </Row>
                        <h2>{post?.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post != null ? post.description : '' }} />
                        <Divider />
                        <CommentList postId={Number(id)}/>
                </Card>
            </Col>
        </Row>
    );
}