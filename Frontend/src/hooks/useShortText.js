import { useCallback, useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
    // ⬆️ Mengecek apakah kondisi media query saat ini sesuai (true/false)
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    // ⬆️ Membuat objek MediaQueryList berdasarkan query (misalnya "(min-width: 768px)")

    const listener = () => setMatches(media.matches);
    // ⬆️ Setiap kali ukuran layar berubah, update state 'matches' sesuai hasil terbaru

    media.addEventListener("change", listener);
    // ⬆️ Daftarkan listener agar dipanggil ketika media query berubah status

    return () => media.removeEventListener("change", listener);
    // ⬆️ Bersihkan listener ketika komponen unmount agar tidak ada kebocoran memori
  }, [query]);

  return matches;
  // ⬆️ Mengembalikan nilai boolean (true jika kondisi media terpenuhi, false jika tidak)
}

// Hook utama
export default function useShortText() {
  const isGridTwo = useMediaQuery("(min-width: 768px)");

  // fungsi pemotong teks
  const shortText = useCallback(
    (text) => {
      if (!text) return "";
      if (isGridTwo && text.length > 13) {
        return text.substring(0, 13) + "...";
      }
      return text;
    },
    [isGridTwo]
  );

  return { shortText };
}
