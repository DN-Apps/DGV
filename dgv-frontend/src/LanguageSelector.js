import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const languages = [
        {
            code: "de",
            label: "Deutsch",
            flag: "https://flagcdn.com/w40/de.png"
        },
        {
            code: "en",
            label: "English",
            flag: "https://flagcdn.com/w40/gb.png"
        }
    ];

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 0"
        }}>
            <div style={{ position: "relative" }}>
                <select
                    onChange={handleChange}
                    value={i18n.language}
                    style={{
                        fontSize: "11px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        backgroundColor: "#fff",
                        paddingRight: "40px" // Platz für Flagge
                    }}
                >
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label}
                        </option>
                    ))}
                </select>

                <img
                    src={languages.find(l => l.code === i18n.language)?.flag}
                    alt="flag"
                    style={{
                        width: "24px",
                        height: "18px",
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                    }}
                />
            </div>
        </div>
    );
};

export default LanguageSelector;
