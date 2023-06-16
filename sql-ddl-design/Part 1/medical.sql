-- in terminal:
-- psql < medical.sql
-- psql medical_center

DROP DATABASE IF EXISTS  medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE Doctor (
  doctor_id INT PRIMARY KEY,
  doctor_name VARCHAR(255),
  specialization VARCHAR(255),
  contact_info VARCHAR(255)
);

CREATE TABLE Patient (
  patient_id INT PRIMARY KEY,
  patient_name VARCHAR(255),
  date_of_birth DATE,
  contact_info VARCHAR(255)
);

CREATE TABLE Visit (
  visit_id INT PRIMARY KEY,
  doctor_id INT,
  patient_id INT,
  visit_date DATE,
  FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id),
  FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

CREATE TABLE Disease (
  disease_id INT PRIMARY KEY,
  disease_name VARCHAR(255)
);

CREATE TABLE Diagnosis (
  diagnosis_id INT PRIMARY KEY,
  visit_id INT,
  disease_id INT,
  FOREIGN KEY (visit_id) REFERENCES Visit(visit_id),
  FOREIGN KEY (disease_id) REFERENCES Disease(disease_id)
);

-- Inserting doctors
INSERT INTO Doctor (doctor_id, doctor_name, specialization, contact_info)
VALUES (1, 'Dr. Smith', 'Cardiology', '123-456-7890'),
       (2, 'Dr. Johnson', 'Pediatrics', '987-654-3210');

-- Inserting patients
INSERT INTO Patient (patient_id, patient_name, date_of_birth, contact_info)
VALUES (1, 'John Doe', '1990-05-15', 'john.doe@example.com'),
       (2, 'Jane Smith', '1985-10-20', 'jane.smith@example.com');

-- Inserting visits
INSERT INTO Visit (visit_id, doctor_id, patient_id, visit_date)
VALUES (1, 1, 1, '2023-06-01'),
       (2, 2, 2, '2023-06-03');

-- Inserting diseases
INSERT INTO Disease (disease_id, disease_name)
VALUES (1, 'Hypertension'),
       (2, 'Asthma');

-- Inserting diagnoses
INSERT INTO Diagnosis (diagnosis_id, visit_id, disease_id)
VALUES (1, 1, 1),
       (2, 2, 2);