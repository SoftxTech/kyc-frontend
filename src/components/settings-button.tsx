import { useEffect, useState } from "react";
import { useSettings } from "../hooks/use-settings";
import type { Settings } from "../contexts/settings-context";
import { ToggleButton } from "@mui/material";

const getValues = (settings: Settings) => ({
  theme: settings.theme,
});
export const SettingsButton = () => {
  const { settings, saveSettings } = useSettings();
  const [values, setValues] = useState<Settings>(getValues(settings));

  useEffect(() => {
    setValues(getValues(settings));
  }, [settings]);

  const handleSave = (): void => {
    saveSettings(values);
  };
  return (
    <ToggleButton
      value="theme"
      selected={values.theme === "dark"}
      onChange={(): void =>
        setValues({
          ...values,
          theme: values.theme === "dark" ? "light" : "dark",
        })
      }
      color="primary"
      size="medium"
      sx={{
        bottom: 0,
        margin: (theme: { spacing: (arg0: number) => any }) => theme.spacing(4),
        position: "fixed",
        right: 0,
        zIndex: 1900,
      }}
    ></ToggleButton>
  );
};
