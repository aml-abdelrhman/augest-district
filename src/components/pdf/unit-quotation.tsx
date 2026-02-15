"use client";

import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Unit } from "@/types";

interface UnitQuotationProps {
  data: Unit;
}

// Register fonts
Font.register({
  family: "GE-Dinar-Two",
  fonts: [
    {
      src: "../../app/fonts/ge-dinar-two/GE-Dinar-Two-Light-Italic.woff",
      fontWeight: 200,
    },
    {
      src: "../../app/fonts/ge-dinar-two/GE-Dinar-Two-Light.woff",
      fontWeight: 300,
    },
    {
      src: "../../app/fonts/ge-dinar-two/GE-Dinar-Two-Medium-Italic.woff",
      fontWeight: 500,
    },
    {
      src: "../../app/fonts/ge-dinar-two/GE-Dinar-Two-Medium.woff",
      fontWeight: 500,
    },
  ],
});
