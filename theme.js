import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    guru: {
      50: "#e6e6ff",
      100: "#b5b3ff",
      200: "#9c99ff",
      300: "#8480ff",
      400: "#6b66ff",
      500: "#635dff",
      600: "#524dff",
    },
  },

  components: {
    Button: {
      variants: {
        solid: {
          borderRadius: "8px",
          border: "1px solid #635dff",
          _hover: {
            borderColor: "#524dff",
          },
        },
        outline: {
          borderRadius: "8px",
        },
      },
      sizes: {
        guruMd: {
          h: "38px",
          fontSize: "1rem",
          px: "4",
          py: "18px",
        },
      },
    },
  },
});

export default theme;
