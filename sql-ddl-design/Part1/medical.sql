-- in terminal:
-- psql < medical.sql
-- psql medical_center

DROP DATABASE IF EXISTS  medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctor (
  doctor_id SERIAL PRIMARY KEY,
  doctor_name TEXT NOT NULL,
  specialization TEXT NOT NULL
);

CREATE TABLE patient (
  patient_id SERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  date_of_birth DATE,
  contact_info VARCHAR(255)
);

CREATE TABLE visit (
  visit_id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctor,
  patient_id INTEGER REFERENCES patient,
  visit_date DATE
);

CREATE TABLE disease (
  disease_id SERIAL PRIMARY KEY,
  disease_name TEXT
);

CREATE TABLE diagnosis (
  diagnosis_id SERIAL PRIMARY KEY,
  visit_id INTEGER REFERENCES visit,
  disease_id INTEGER REFERENCES disease
);

-- Inserting doctors
INSERT INTO doctor (doctor_id, doctor_name, specialization)
VALUES (1, 'Dr. Smith', 'Cardiology'),
       (2, 'Dr. Johnson', 'Pediatrics');

-- Inserting patients
INSERT INTO patient (patient_id, patient_name, date_of_birth, contact_info)
VALUES (1, 'John Doe', '1990-05-15', 'john.doe@example.com'),
       (2, 'Jane Smith', '1985-10-20', 'jane.smith@example.com');

-- Inserting visits
INSERT INTO visit (visit_id, doctor_id, patient_id, visit_date)
VALUES (1, 1, 1, '2023-06-01'),
       (2, 2, 2, '2023-06-03');

-- Inserting diseases
INSERT INTO disease (disease_id, disease_name)
VALUES (1, 'Hypertension'),
       (2, 'Asthma');

-- Inserting diagnoses
INSERT INTO diagnosis (diagnosis_id, visit_id, disease_id)
VALUES (1, 1, 1),
       (2, 2, 2);