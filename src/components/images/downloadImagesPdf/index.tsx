import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IImage } from "../../../models/image.interface";

export const DownloadImagesPdf = (props : {images: IImage[]}) => {

    function exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Lista de Imagens";
        const headers = [["Nome", "Usuário"]];
    
        const data = props.images.map(x=> [x.name, x.user.name]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save("images.pdf")
    }

    return (
        <Space style={{ float: 'right', marginBottom: 16 }}>
            <Button onClick={exportPDF} type="primary" icon={<FilePdfOutlined />}>Baixar PDF</Button>
        </Space>
    );
}