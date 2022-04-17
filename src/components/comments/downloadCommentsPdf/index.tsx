import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IComment } from "../../../models/comment.interface";

export const DownloadCommentsPdf = (props : {comments: IComment[]}) => {

    function exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Lista de Comentários";
        const headers = [["Mensagem", "Usuário", "Publicação"]];
    
        const data = props.comments.map(x=> [x.message, x.user.name, x.post.title]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save("comments.pdf")
    }

    return (
        <Space style={{ float: 'right', marginBottom: 16 }}>
            <Button onClick={exportPDF} type="primary" icon={<FilePdfOutlined />}>Baixar PDF</Button>
        </Space>
    );
}