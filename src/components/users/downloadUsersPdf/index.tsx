import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { UserTypeEnum } from "../../../enums/UserTypeEnum";
import { IUser } from "../../../models/user.interface";

export const DownloadUsersPdf = (props : {users: IUser[]}) => {

    function getUserType(type: string) {
        let userType = '';

        if (UserTypeEnum.Administrator == type)
            userType = 'Administrador';
        else if (UserTypeEnum.Writer == type)
            userType = 'Escritor';
        else if (UserTypeEnum.Reader == type)
            userType = 'Leitor';

        return userType;
    }

    function exportPDF() {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Lista de Usuários";
        const headers = [["Nome", "E-mail", "Tipo"]];
    
        const data = props.users.map(x=> [x.name, x.email, getUserType(x.type)]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save("users.pdf")
    }

    return (
        <Space style={{ float: 'right', marginBottom: 16 }}>
            <Button onClick={exportPDF} type="primary" icon={<FilePdfOutlined />}>Baixar PDF</Button>
        </Space>
    );
}