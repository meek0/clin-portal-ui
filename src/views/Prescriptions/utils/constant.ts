import { StatusOptions } from '../components/StatusTag';
import intl from "react-intl-universal";

export const getPrescriptionStatusDictionnary = () => ({
  [StatusOptions.Active]: intl.get("filters.options.status.active"),
  [StatusOptions.OnHold]: intl.get("filters.options.status.on-hold"),
});
