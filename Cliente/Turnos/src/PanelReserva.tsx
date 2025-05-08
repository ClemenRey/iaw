import React, { useEffect, useState } from 'react';
import FormularioReserva from './FormularioReserva';

const PanelReserva = () => {
  

  const irAStore = () => {
    window.location.href = '/store';
  };

  return (
    <div style={styles.container}>
      <h2>Reservar Cancha</h2>
      <FormularioReserva></FormularioReserva>
      
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    margin: '10px 0 5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
  },
  buttonDanger: {
    backgroundColor: '#dc3545',
  },
  buttonStore: {
    backgroundColor: '#28a745',
  },
};

export default PanelReserva;
