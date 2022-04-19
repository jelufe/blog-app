import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, message, PageHeader, Row, Upload } from "antd";
import { Api } from "../../../services/api";

export const ImageForm = () => {
    const api = new Api();

    const props = {
        name: 'file',
        action: `${api.baseApiUrl}image`,
        headers: {
            authorization: api.getToken(),
        },
        onChange(info: any) {

            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                message.success(`${info.file.name} arquivo enviado com sucesso`);
            } else if (info.file.status === 'error') {
                message.error(`Ocorreu uma falha no envio do arquivo ${info.file.name}`);
            }
        },
    };

    return (
        <div>
            <PageHeader
                title={"Enviar Imagem"}
            />
            <Row
                justify='center'
                align='middle'
                style={{
                    height: '50vh'
                }}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Clique para enviar o arquivo</Button>
                </Upload>
            </Row>
        </div>
    )
}