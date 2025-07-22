package com.authentication.uoa.repository;

import com.authentication.uoa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {


    //defining custom methods just too math emailid and password

    public abstract User findByEmailIdAndPassword(String emailId, String Password);

    List<User> findByRoleAndApprovalStatus(String role, User.ApprovalStatus approvalStatus);

}
