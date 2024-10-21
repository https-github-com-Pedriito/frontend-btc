import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

function RGPDBox({ onConsent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("gdprConsent");
    if (!consent) {
      setIsOpen(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("gdprConsent", JSON.stringify(preferences));
    onConsent(true); 
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Paramètres de confidentialité</CardTitle>
          <CardDescription>
            Notre restaurant utilise des cookies pour améliorer votre expérience
            sur notre site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              <span>Cookies nécessaires</span>
              <span className="font-normal text-sm text-muted-foreground">
                Ces cookies sont essentiels au fonctionnement du site.
              </span>
            </Label>
            <Switch
              id="necessary"
              checked={preferences.necessary}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, necessary: checked })
              }
              disabled
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="functional" className="flex flex-col space-y-1">
              <span>Cookies fonctionnels</span>
              <span className="font-normal text-sm text-muted-foreground">
                Ces cookies permettent d'améliorer les fonctionnalités du site.
              </span>
            </Label>
            <Switch
              id="functional"
              checked={preferences.functional}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, functional: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="analytics" className="flex flex-col space-y-1">
              <span>Cookies analytiques</span>
              <span className="font-normal text-sm text-muted-foreground">
                Ces cookies nous aident à comprendre comment les visiteurs
                interagissent avec le site.
              </span>
            </Label>
            <Switch
              id="analytics"
              checked={preferences.analytics}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, analytics: checked })
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Fermer
          </Button>
          <Button onClick={handleSave}>Enregistrer les préférences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Définir les types de propriétés
RGPDBox.propTypes = {
  onConsent: PropTypes.func.isRequired,
};

// Exporter le composant
export default RGPDBox;