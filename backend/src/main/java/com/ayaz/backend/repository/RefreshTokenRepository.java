package com.ayaz.backend.repository;

import java.util.Optional;

import com.ayaz.backend.models.RefreshToken;
import com.ayaz.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;


@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);
  void deleteByToken(String token);

  @Modifying
  int deleteByUser(User user);
}
