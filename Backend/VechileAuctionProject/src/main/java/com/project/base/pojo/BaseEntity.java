package com.project.base.pojo;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
		private Long id;
		@CreationTimestamp
		@Column(name="created_on")
		private LocalDate createdOn;
		@UpdateTimestamp
		@Column(name="last_updated")
		private LocalDate lastUpdated;
}
