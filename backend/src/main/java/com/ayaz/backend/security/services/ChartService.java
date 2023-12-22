package com.ayaz.backend.security.services;

import com.ayaz.backend.models.ChartDto;
import org.springframework.stereotype.Service;
import java.sql.*;

@Service
public class ChartService {
    public ChartDto chart(){
            String url = "jdbc:postgresql://localhost:5432/web";
            String user = "postgres";
            String password = "ayaz2002";
            ChartDto chartDto=new ChartDto();
            try (Connection connection = DriverManager.getConnection(url, user, password)) {
                String sql = "SELECT iphones.name, COUNT(shopping_list.id) AS \"kol\" " +
                        "FROM iphones " +
                        "LEFT JOIN shopping_list ON iphones.id = shopping_list.iphone_id " +
                        "GROUP BY iphones.name";

                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery(sql);

                while (resultSet.next()) {
                    System.out.println();
                    String modelName = resultSet.getString("name");
                    int purchaseCount = resultSet.getInt("kol");
                    System.out.println(modelName+purchaseCount);
                    chartDto.getName().add(modelName);
                    chartDto.getKol().add(purchaseCount);
                }
            } catch (SQLException e) {
                System.out.println("Ошибка при выполнении SQL-запроса: " + e.getMessage());
            }
            return chartDto;
    }
}
