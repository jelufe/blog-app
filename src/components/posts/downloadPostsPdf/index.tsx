import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IPost } from "../../../models/post.interface";

export const DownloadPostsPdf = (props : {posts: IPost[]}) => {

    function exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Lista de Publicações";
        const headers = [["Título", "Usuário"]];
    
        const data = props.posts.map(x=> [x.title, x.user.name]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save("posts.pdf")
    }

    return (
        <Space style={{ float: 'right', marginBottom: 16 }}>
            <Button onClick={exportPDF} type="primary" icon={<FilePdfOutlined />}>Baixar PDF</Button>
        </Space>
    );
}