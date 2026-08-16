package com.example.employeemanagement.config;

import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(EmployeeRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Employee(null, "Sai", "sai@example.com", "IT", 55000.0));
                repository.save(new Employee(null, "Anjali", "anjali@example.com", "HR", 48000.0));
                repository.save(new Employee(null, "Rahul", "rahul@example.com", "Finance", 60000.0));
            }
        };
    }
}
