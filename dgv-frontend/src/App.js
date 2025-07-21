import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from "react-i18next";
import "./i18n";

const bekannteFirmen = [
  { id: 'f1', name: 'SAP SE', adresse: { strasse: 'Dietmar-Hopp-Allee', hausnummer: '16', plz: '69190', ort: 'Walldorf', land: 'Germany' } },
  { id: 'f2', name: 'BASF SE', adresse: { strasse: 'Carl-Bosch-Str.', hausnummer: '38', plz: '67056', ort: 'Ludwigshafen', land: 'Germany' } },
  { id: 'f3', name: 'Fuchs Petrolub SE', adresse: { strasse: 'Kundstr.', hausnummer: '1', plz: '68167', ort: 'Mannheim', land: 'Germany' } },
  { id: 'f4', name: 'HeidelbergCement AG', adresse: { strasse: 'Speyerer Str.', hausnummer: '4', plz: '69115', ort: 'Heidelberg', land: 'Germany' } },
  { id: 'f5', name: 'John Deere GmbH & Co. KG', adresse: { strasse: 'Hauptstr.', hausnummer: '1', plz: '68309', ort: 'Mannheim', land: 'Germany' } },
  { id: 'f6', name: 'B. Braun Melsungen AG', adresse: { strasse: 'Carl-Braun-Straße', hausnummer: '1', plz: '68642', ort: 'Heidelberg', land: 'Germany' } },
  { id: 'f7', name: 'Lufthansa Systems GmbH & Co. KG', adresse: { strasse: 'Heidelberger Str.', hausnummer: '3', plz: '68307', ort: 'Mannheim', land: 'Germany' } },
  { id: 'f8', name: 'Mann+Hummel GmbH', adresse: { strasse: 'Schwetzinger Str.', hausnummer: '43', plz: '68165', ort: 'Mannheim', land: 'Germany' } },
  { id: 'f9', name: 'Bilfinger SE', adresse: { strasse: 'Carl-Reiß-Platz', hausnummer: '1-5', plz: '68165', ort: 'Mannheim', land: 'Germany' } },
  { id: 'f21', name: 'Audi AG', adresse: { strasse: 'Ettinger Str.', hausnummer: '25', plz: '74078', ort: 'Heilbronn', land: 'Germany' } },
  { id: 'f22', name: 'Mercedes-Benz AG', adresse: { strasse: 'Mercedesstraße', hausnummer: '120', plz: '70327', ort: 'Stuttgart', land: 'Germany' } },
  { id: 'f23', name: 'Lidl Stiftung & Co. KG', adresse: { strasse: 'Stiftsbergstraße', hausnummer: '1', plz: '74172', ort: 'Neckarsulm', land: 'Germany' } },
  { id: 'f24', name: 'Robert Bosch GmbH', adresse: { strasse: 'Robert-Bosch-Platz', hausnummer: '1', plz: '70839', ort: 'Gerlingen', land: 'Germany' } },
  { id: 'f25', name: 'Porsche AG', adresse: { strasse: 'Porscheplatz', hausnummer: '1', plz: '70435', ort: 'Stuttgart', land: 'Germany' } },
];



// Neue Komponenten für rechtliche Absicherung
const DatenschutzPopup = ({ onAccept }) => {

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2>Datenschutzhinweis</h2>
        <p>
          Diese Webseite verwendet keine Cookies und speichert alle eingegebenen Daten ausschließlich lokal in Ihrem Browser.
          Die Daten werden nicht an Server übertragen oder gespeichert.
        </p>
        <button
          onClick={onAccept}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Hinweis akzeptieren
        </button>
      </div>
    </div>
  );
};

// Impressum-Popup Komponente
const ImpressumPopup = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        <h2>{t("imprint.heading")}</h2>
        <p>
          <strong>{t("imprint.legalInfo")}</strong><br />
          {t("imprint.name")}<br />
          {t("imprint.address")}<br />
          {t("imprint.city")}<br />
          {t("imprint.country")}
        </p>

        <p>
          <strong>{t("imprint.contact")}</strong><br />
          {t("imprint.phoneLabel")} <a href="tel:+491701071715">0170 1071715</a><br />
          {t("imprint.emailLabel")} <a href="mailto:daniel-nedic@hotmail.de">daniel-nedic@hotmail.de</a>
        </p>

        <p>
          <strong>{t("imprint.disclaimerHeading")}</strong><br />
          {t("imprint.disclaimer1")}<br />
          {t("imprint.disclaimer2")}<br />
          {t("imprint.disclaimer3")}
        </p>

      </div>
    </div>
  );
};

// Footer-Komponente mit Link zum Impressum
const Footer = ({ onImpressumClick }) => {
  const { t } = useTranslation();
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderTop: '1px solid #dee2e6',
      fontSize: '12px',
      zIndex: 99,
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onImpressumClick();
        }}
        style={{
          color: '#007bff',
          textDecoration: 'none'
        }}
      >
        {t("imprint.heading")}
      </a>
    </footer>
  );
};

const Wasserzeichen = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '24px',
      color: 'rgba(0,0,0,0.1)',
      pointerEvents: 'none',
      zIndex: 1,
      fontWeight: 'bold',
      whiteSpace: 'nowrap'
    }}>
      DEMONSTRATION
    </div>
  );
};



function App() {


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
  const [firmenListe, setFirmenListe] = useState([]);
  const [selectedFirma, setSelectedFirma] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [showDatenschutz, setShowDatenschutz] = useState(
    localStorage.getItem('datenschutzAkzeptiert') !== 'true'
  );
  const [showImpressum, setShowImpressum] = useState(false);

  // Dein bestehender useEffect und Methoden bleiben unverändert
  useEffect(() => {
    const overpassQuery = `
      [out:json][timeout:25];
      node["office"](49.1,8.3,49.6,8.8);
      out 50;
    `;

    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery,
      headers: { 'Content-Type': 'text/plain' }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Fehler: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.elements || data.elements.length === 0) {
          setFirmenListe([]);
          console.log("Keine Elemente von Overpass gefunden");
          return;
        }
        const apiCompaniesRaw = data.elements
          .filter(el => el.tags && el.tags.name)
          .map(el => ({
            id: 'api_' + el.id,
            name: el.tags.name,
            adresse: {
              strasse: el.tags['addr:street'] || '',
              hausnummer: el.tags['addr:housenumber'] || '',
              plz: el.tags['addr:postcode'] || '',
              ort: el.tags['addr:city'] || el.tags['addr:place'] || '',
              land: el.tags['addr:country'] || 'Germany',
            }
          }));

        const bekannteNamen = new Set(bekannteFirmen.map(f => f.name.toLowerCase()));
        const apiCompaniesFiltered = apiCompaniesRaw.filter(c => !bekannteNamen.has(c.name.toLowerCase()));
        const combinedCompanies = [...bekannteFirmen, ...apiCompaniesFiltered];
        combinedCompanies.sort((a, b) => a.name.localeCompare(b.name));

        setFirmenListe(combinedCompanies);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Firmenliste:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'firmaId') {
      const selected = firmenListe.find(f => f.id.toString() === value);
      if (selected) {
        setSelectedFirma({
          name: selected.name,
          ...selected.adresse
        });
      } else {
        setSelectedFirma(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firmaId) return;
    setSubmittedData(formData);
    setIsPopupOpen(false);
  };

  const handleReset = () => {
    setFormData({
      vorname: '',
      nachname: '',
      wunschposition: '',
      abteilung: '',
      telefonnummer: '',
      mobilnummer: '',
      email: '',
      firmaId: ''
    });
    setSelectedFirma(null);
  };

  const handleBack = () => {
    setIsPopupOpen(true);
    setSubmittedData(null);
  };

  const generateVCard = () => {
    if (!submittedData || !selectedFirma) return '';

    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'NOTE:Diese Visitenkarte dient Demonstrationszwecken\\nund stellt keine offizielle Bestätigung dar.',
      `N:${submittedData.nachname};${submittedData.vorname}`,
      `FN:${submittedData.vorname} ${submittedData.nachname}`,
      `ORG:${selectedFirma.name};${submittedData.abteilung || ''}`,
      `TITLE:${submittedData.wunschposition}`,
      `TEL;TYPE=WORK,VOICE:${submittedData.telefonnummer}`,
      `TEL;TYPE=CELL:${submittedData.mobilnummer}`,
      `EMAIL:${submittedData.email}`,
      `ADR;TYPE=WORK:;;${selectedFirma.strasse} ${selectedFirma.hausnummer};${selectedFirma.ort};;${selectedFirma.plz};${selectedFirma.land}`,
      `REV:${new Date().toISOString()}`,
      'END:VCARD'
    ];


    return vCardLines.join('\n');
  };

  const handleAcceptDatenschutz = () => {
    localStorage.setItem('datenschutzAkzeptiert', 'true');
    setShowDatenschutz(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <LanguageSelector></LanguageSelector>
      {showDatenschutz && <DatenschutzPopup onAccept={handleAcceptDatenschutz} />}
      {showImpressum && <ImpressumPopup onClose={() => setShowImpressum(false)} />}

      <Footer onImpressumClick={() => setShowImpressum(true)} />

      {submittedData ? (
        <div style={{
          ...wrapperStyle,
          ...cardContainerStyle,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '60px'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(255,0,0,0.1)',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            border: '1px dashed red'
          }}>
            DEMONSTRATION
          </div>

          <h2 style={{ margin: 0 }}>
            {selectedFirma?.name || 'Firma nicht verfügbar'}
          </h2>
          <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
            {t("card.demoNotice")}
          </p>

          <p><strong>{t("card.firstname")}</strong> {submittedData.vorname} </p>
          <p><strong>{t("card.lastname")}</strong> {submittedData.nachname}</p>
          <p><strong>{t("card.position")}</strong> {submittedData.wunschposition || t("card.positionUnavailable")}</p>
          <p><strong>{t("card.department")}</strong> {submittedData.abteilung || 'Abteilung nicht verfügbar'}</p>

          {/* Angepasste Adressanzeige mit Platzhaltern */}
          <p><strong>{t("card.street")}</strong> {selectedFirma?.strasse || 'Straße nicht verfügbar'} {selectedFirma?.hausnummer || ''}</p>
          <p><strong>{t("card.zipCity")}</strong> {selectedFirma?.plz || 'PLZ nicht verfügbar'} {selectedFirma?.ort || 'Ort nicht verfügbar'}</p>

          <p><strong>{t("card.phone")}</strong> {submittedData.telefonnummer || 'Telefon nicht verfügbar'}</p>
          <p><strong>{t("card.email")}</strong> {submittedData.email || 'Email nicht verfügbar'}</p>

          <div style={qrContainerStyle}>
            <QRCode
              value={generateVCard()}
              size={window.innerWidth < 480 ? 120 : 160}
              level="H"
              bgColor="#ffffff"
              fgColor="#000000"
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              {t("card.qrScanHint")}
            </p>
          </div>

          <Wasserzeichen />

          <button onClick={handleBack} style={{ ...buttonStyle, marginTop: '20px', backgroundColor: '#6c757d' }}>
            Zurück
          </button>
        </div>
      ) : (
        isPopupOpen && (
          <div style={popupStyle}>
            <form onSubmit={handleSubmit} style={popupFormStyle}>
              <h2 style={{ fontSize: '20px' }}>{t("card.heading")}</h2>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
                {t("card.demoNotice")}
              </p>

              <input type="text" name="vorname" placeholder={t("card.firstname")} value={formData.vorname} onChange={handleChange} required style={inputStyle} />
              <input type="text" name="nachname" placeholder={t("card.lastname")} value={formData.nachname} onChange={handleChange} required style={inputStyle} />
              <input type="text" name="wunschposition" placeholder={t("card.position")} value={formData.wunschposition} onChange={handleChange} required style={inputStyle} />
              <input type="text" name="abteilung" placeholder={t("card.department")} value={formData.abteilung} onChange={handleChange} style={inputStyle} />
              <input type="tel" name="telefonnummer" placeholder={t("card.phone")} value={formData.telefonnummer} onChange={handleChange} style={inputStyle} />
              <input type="email" name="email" placeholder={t("card.email")} value={formData.email} onChange={handleChange} required style={inputStyle} />

              <select name="firmaId" onChange={handleChange} required value={formData.firmaId} style={selectStyle}>
                <option value="">{t("card.dropdown")}</option>
                {firmenListe.map(firma => (
                  <option key={firma.id} value={firma.id}>{firma.name}</option>
                ))}
              </select>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" onClick={handleReset} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>
                  {t("card.reset")}
                </button>
                <button type="submit" style={buttonStyle}>
                  {t("card.generate")}
                </button>
              </div>
            </form>
          </div>
        )
      )}
    </>
  );
}

// Stile (unverändert)
const wrapperStyle = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '440px',
  width: '95%',
  margin: '40px auto',
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.15)',
  backgroundColor: '#fff',
};

const popupStyle = {
  position: 'fixed',
  top: '5%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 0 15px rgba(0,0,0,0.3)',
  zIndex: 100,
  width: '90%',
  maxWidth: '400px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxSizing: 'border-box'
};

const popupFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box',
};


const selectStyle = {
  ...inputStyle,
};

const buttonStyle = {
  padding: '12px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  fontWeight: '600',
  width: '100%',
  boxSizing: 'border-box',
};

const cardContainerStyle = {
  textAlign: 'left',
  padding: '15px 20px',
};

const qrContainerStyle = {
  marginTop: '20px',
  textAlign: 'center',
};

export default App;