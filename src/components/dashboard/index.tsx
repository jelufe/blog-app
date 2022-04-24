import { Line } from "@ant-design/charts";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDashboard } from "../../models/dashboard.interface";
import { GetDashboard } from "../../services/dashboard";

export const DashboardCharts = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    const navigate = useNavigate();
    let [loading, setLoading] = useState<boolean>();
    let [dashboard, setDashboard] = useState<IDashboard | null>();

    useEffect(() => {
        initializeCharts();
    }, []);

    async function initializeCharts() {
        setLoading(true);

        const dashboard = await GetDashboard();

        setLoading(false);

        if (dashboard)
            setDashboard(dashboard);
    }
    
    const config = {
        height: 200,
        xField: 'name',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
        },
    };

    return (
        <div>
            {
                loading ?
                    <Row
                        justify='center'
                        align='middle'
                        style={{
                            height: '50vh'
                        }}
                    >
                        <Spin tip="Carregando..." indicator={antIcon} />
                    </Row>
                :
                <div>
                    <Row>
                        <Col span={12} style={{padding: '4%'}}>
                            <h3 style={{ textAlign: 'center', marginBottom: '2vh'}}>Usuários que mais comentaram no mês</h3>
                            <Line data={dashboard?.usersMostCommentsInMonth ? dashboard?.usersMostCommentsInMonth : []} {...config} />
                        </Col>
                        <Col span={12} style={{padding: '4%'}}>
                            <h3 style={{ textAlign: 'center', marginBottom: '2vh'}}>Publicações mais comentadas no mês</h3>
                            <Line data={dashboard?.postsMostCommentsInMonth ? dashboard?.postsMostCommentsInMonth : []} {...config} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{padding: '4%'}}>
                            <h3 style={{ textAlign: 'center', marginBottom: '2vh'}}>Publicações mais visualizadas no mês</h3>
                            <Line data={dashboard?.postsMostViewsInMonth ? dashboard?.postsMostViewsInMonth : []} {...config} />
                        </Col>
                        <Col span={12} style={{padding: '4%'}}>
                            <h3 style={{ textAlign: 'center', marginBottom: '2vh'}}>Publicações mais compartilhadas no mês</h3>
                            <Line data={dashboard?.postsMostSharesInMonth ? dashboard?.postsMostSharesInMonth : []} {...config} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{padding: '4%'}}>
                            <h3 style={{ textAlign: 'center', marginBottom: '2vh'}}>Publicações mais curtidas no mês</h3>
                            <Line data={dashboard?.postsMostLikesInMonth ? dashboard?.postsMostLikesInMonth : []} {...config} />
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}