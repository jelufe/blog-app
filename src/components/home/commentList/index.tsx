import { UserOutlined } from "@ant-design/icons";
import { List, Form, Button, message, Avatar } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { getUserLocalStorage } from "../../../context/providers/util";
import { IComment } from "../../../models/comment.interface";
import { InsertComment } from "../../../services/comment";
import { GetComments } from "../../../services/post";

export const CommentList = ({postId} : {postId: number}) => {
    const user = getUserLocalStorage();
    let [loading, setLoading] = useState<boolean>();
    let [value = '', setValue] = useState<string>();
    let [comments = [], setComments] = useState<IComment[] | []>();

    useEffect(() => {
        initializeComments();
    }, []);

    async function initializeComments() {
        const commentsList = await GetComments(postId);

        if (commentsList)
            setComments(commentsList);
    }

    function handleChange (e: any) {
        setValue(e.target.value);
    };

    async function addComment() {
        setLoading(true);

        try {
            await InsertComment(value, user.userId, postId);
            message.success('Comentário criado com sucesso');

            setValue('');
            initializeComments();
        } catch (error) {
            message.error('Erro ao criar comentário');
        }

        setLoading(false);
    }

    return (
        <div>
            <List
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'comentários' : 'comentário'}`}
                itemLayout="horizontal"
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={item.user?.name}
                            description={item.message}
                        />
                    </List.Item>
                )}
            />

            <Form.Item>
                <TextArea rows={4} onChange={handleChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={loading} onClick={addComment} type="primary">
                    Adicionar Comentário
                </Button>
            </Form.Item>
        </div>
    );
}