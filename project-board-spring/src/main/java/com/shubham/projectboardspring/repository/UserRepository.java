package com.shubham.projectboardspring.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shubham.projectboardspring.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	
	User findByUsername(String username);
}
