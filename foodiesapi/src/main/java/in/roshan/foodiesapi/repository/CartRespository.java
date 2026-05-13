package in.roshan.foodiesapi.repository;

import in.roshan.foodiesapi.entity.CartEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRespository extends JpaRepository<CartEntity, String> {

    Optional<CartEntity> findByUserId(String userId);

    @Modifying
    @Transactional
    void deleteByUserId(String userId);
}
