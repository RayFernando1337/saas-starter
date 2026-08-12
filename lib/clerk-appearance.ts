/** Shared Clerk appearance mapped to the SABLE design tokens. */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#101010",
    colorBackground: "#efede8",
    colorForeground: "#101010",
    colorMutedForeground: "#8a8781",
    colorInput: "#efede8",
    colorInputForeground: "#101010",
    colorBorder: "rgba(16,16,16,0.30)",
    borderRadius: "0px",
    fontFamily: "var(--font-archivo), system-ui, sans-serif",
  },
  elements: {
    card: { boxShadow: "none", border: "1px solid rgba(16,16,16,0.14)" },
    headerTitle: {
      textTransform: "uppercase" as const,
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    formButtonPrimary: {
      textTransform: "uppercase" as const,
      letterSpacing: "0.22em",
      fontSize: "10px",
      fontWeight: 500,
      padding: "14px 28px",
      "&:hover": { backgroundColor: "#2e2e2e" },
    },
  },
};
