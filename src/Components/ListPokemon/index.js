import React from "react";
import { List, Card, Typography, Space } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";

const { Text } = Typography;
export default function ListPokemon(props) {
  return (
    <List
      className="box"
      dataSource={props.data}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      renderItem={(item) => (
        <List.Item>
          <Card
            style={{ flex: 1 }}
            bordered={true}
            className="card"
            cover={<img alt={item.name} src={item.sprites.front_default} />}
          >
            <Space direction="vertical">
              <Space>
                <Text strong>Nome:</Text>
                <Text>{item.name}</Text>
              </Space>
              <Space>
                <Text strong>Quantidade de Habilidades:</Text>
                <Text>{item.abilities.length}</Text>
              </Space>
              <Space>
                <Text strong>Tipo:</Text>
                <Text>
                  {item.types.map(
                    (type, index) =>
                      type.type.name +
                      (index !== item.types.length - 1 ? ", " : "")
                  )}
                </Text>
              </Space>
            </Space>
          </Card>
        </List.Item>
      )}
    />
  );
}
