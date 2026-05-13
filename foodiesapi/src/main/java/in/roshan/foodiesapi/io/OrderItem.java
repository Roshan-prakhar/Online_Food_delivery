package in.roshan.foodiesapi.io;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OrderItem {

    private String foodId;
    private int quantity;
    private double price;
    private String category;
    @Column(length = 1000)
    private String imageUrl;
    @Column(length = 1000)
    private String description;
    private String name;
}
