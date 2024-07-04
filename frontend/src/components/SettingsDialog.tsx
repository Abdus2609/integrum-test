import { Switch } from "antd";
import React from "react";
import { useTheme } from "../utilities/globalContext";

const SettingsDialog: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 flex flex-col justify-center">
      <h2 className="text-lg font-semibold">Settings</h2>
      <Switch
        style={{ backgroundColor: theme === "dark" ? "#60a5fa" : "#ccc" }}
        unCheckedChildren="Light"
        checkedChildren="Dark"
        checked={theme === "dark"}
        onChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
};

export default SettingsDialog;
