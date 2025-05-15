import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

function App() {
  const [firmen, setFirmen] = useState([]);
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    wunschposition: '',
    abteilung: '',
    telefonnummer: '',
    mobilnummer: '',
    email: '',
    firmaId: ''
  });
  const [selectedFirma, setSelectedFirma] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  useEffect(() => {
    axios.get('/api/firmen')
      .then(response => setFirmen(response.data))
      .catch(error => console.error('Fehler beim Laden der Firmen:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'firmaId') {
      const firma = firmen.find(f => f.id === parseInt(value));
      setSelectedFirma(firma || null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setIsPopupOpen(false);
  };

  const generateVCard = () => {
    if (!submittedData || !selectedFirma) return '';

    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${submittedData.nachname};${submittedData.vorname}`,
      `FN:${submittedData.vorname} ${submittedData.nachname}`,
      `ORG:${selectedFirma.name}`,
      `TITLE:${submittedData.wunschposition}`,
      `TEL;TYPE=WORK,VOICE:${submittedData.telefonnummer}`,
      `TEL;TYPE=CELL:${submittedData.mobilnummer}`,
      `EMAIL:${submittedData.email}`,
      `ADR;TYPE=WORK:;;${selectedFirma.strasse} ${selectedFirma.hausnummer};${selectedFirma.ort};;${selectedFirma.plz};Germany`,
      `REV:${new Date().toISOString()}`,
      'END:VCARD'
    ];

    return vCardLines.join('\n');
  };

  return (
    <div style={wrapperStyle}>
      {submittedData && (
        <div style={cardContainerStyle}>
          <h2 style={{ margin: 0 }}>
            {selectedFirma?.name || 'Firma nicht gefunden'}
          </h2>
          <p><strong>Vorname Nachname:</strong> {submittedData.vorname} {submittedData.nachname}</p>
          <p><strong>Jobtitel:</strong> {submittedData.wunschposition}</p>
          <p><strong>Abteilung:</strong> {submittedData.abteilung}</p>
          <p><strong>Straße:</strong> {selectedFirma?.strasse || '---'} {selectedFirma?.hausnummer || '---'}</p>
          <p><strong>PLZ Ort:</strong> {selectedFirma?.plz || '---'} {selectedFirma?.ort || '---'}</p>
          <p><strong>Telefon:</strong> {submittedData.telefonnummer}</p>
          <p><strong>Mobil:</strong> {submittedData.mobilnummer}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>

          <div style={qrContainerStyle}>
            <h3>Kontakt hinzufügen</h3>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              Scan mich mit der Kamera-App
            </p>
            <QRCode
              value={generateVCard()}
              size={160}
              level="H"
              bgColor="#ffffff"
              fgColor="#000000"
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              Funktioniert auf iPhone & Android
            </p>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div style={popupStyle}>
          <form onSubmit={handleSubmit} style={popupFormStyle}>
            <h2>Generiere deine Visitenkarte</h2>
            <h3>Informationen eingeben</h3>
            <input type="text" name="vorname" placeholder="Vorname" value={formData.vorname} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="nachname" placeholder="Nachname" value={formData.nachname} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="wunschposition" placeholder="Wunschposition" value={formData.wunschposition} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="abteilung" placeholder="Abteilung" value={formData.abteilung} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="telefonnummer" placeholder="Telefonnummer" value={formData.telefonnummer} onChange={handleChange} style={inputStyle} />
            <input type="text" name="mobilnummer" placeholder="Mobilnummer" value={formData.mobilnummer} onChange={handleChange} style={inputStyle} />
            <input type="email" name="email" placeholder="E-Mail-Adresse" value={formData.email} onChange={handleChange} required style={inputStyle} />
            <select name="firmaId" value={formData.firmaId} onChange={handleChange} required style={inputStyle}>
              <option value="">Firma auswählen</option>
              {firmen.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <button type="submit" style={buttonStyle}>Speichern</button>
          </form>
        </div>
      )}
    </div>
  );
}

// Stile
const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#fafafa',
};

const cardContainerStyle = {
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  boxSizing: 'border-box',
  borderRadius: '10px',
  textAlign: 'left',
  marginBottom: '20px'
};

const qrContainerStyle = {
  marginTop: '20px',
  textAlign: 'center',
  padding: '15px',
  backgroundColor: 'white',
  borderRadius: '8px'
};

const popupStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  boxSizing: 'border-box'
};

const popupFormStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default App;
