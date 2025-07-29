import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const contactInfo = {
  email: "support@megicloth.com",
  whatsapp: "+92 300 1234567",
  address: "123 Textile Avenue, Lahore, Pakistan",
  hours: [
    "Monday - Saturday: 10:00 AM - 8:00 PM",
    "Sunday: Closed",
  ],
};

export const contactMethods = [
  {
    icon: EmailIcon,
    title: "Email",
    value: contactInfo.email,
    color: "#2563eb",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp Support",
    value: contactInfo.whatsapp,
    color: "#10b981",
  },
  {
    icon: LocationOnIcon,
    title: "Store Location",
    value: contactInfo.address,
    color: "#f59e0b",
  },
  {
    icon: AccessTimeIcon,
    title: "Business Hours",
    value: contactInfo.hours.join(" | "),
    color: "#ef4444",
  },
];
