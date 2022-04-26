import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { INotification } from "../../../models/notification.interface";
import moment from 'moment';

export const DownloadNotificationsPdf = (props : {notifications: INotification[]}) => {

    function exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Lista de Notificações";
        const headers = [["Título", "Enviado por", "Enviado em"]];
    
        const data = props.notifications.map(x=> [x.title, x.user.name, moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save("notifications.pdf")
    }

    return (
        <Space style={{ float: 'right', marginBottom: 16 }}>
            <Button onClick={exportPDF} type="primary" icon={<FilePdfOutlined />}>Baixar PDF</Button>
        </Space>
    );
}