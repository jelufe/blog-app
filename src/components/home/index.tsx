import { Image, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { IPost } from "../../models/post.interface";
import { GetAllPosts } from "../../services/post";
import { useNavigate } from 'react-router-dom';
import { GetImage } from "../../services/image";

export const Home = () => {
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [posts, setPosts] = useState<IPost[] | []>();
    let [images, setImages] = useState<any[]>();
    let imagesList: any[] = [];

    useEffect(() => {
        initializePosts();
    }, []);

    async function initializePosts() {
        setLoading(true);

        const posts = await GetAllPosts();

        setLoading(false);

        if (posts){
            setPosts(posts);
            setImagesList(posts);
        }
    }

    function setImagesList(postsList: IPost[]) {
        postsList.forEach(item => {
            setImageSrc(item);
        });
    }

    async function setImageSrc(item: IPost){
        const image = await GetImage(item.image.imageId);

        imagesList.push({postId: item.postId, srcImage: image});

        setImages([...imagesList]);
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
                        <Image
                            width={262}
                            height={159}
                            src={`data:image/jpg;charset=utf-8;base64,${images?.find(image => image.postId == item.image.imageId)?.srcImage}`}
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