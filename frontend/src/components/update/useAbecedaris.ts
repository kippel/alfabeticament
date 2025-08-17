import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";

type AbecedarisProps = {
  id: number;
  lletres: string;
  courses: string;
  abecedaris_id: string;
};

const useAbecedaris = () => {
  const [abc, setAbc] = useState<AbecedarisProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useAuth();

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!session?.accessToken || !backendUrl) return;

    async function fetchAbecedaris() {
      try {
        const res = await axios.get<{ abecedari: AbecedarisProps[] }>(
          `${backendUrl}/abc/abcedaris`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        setAbc(res.data.abecedari);
      } catch (error) {
        console.error("Error fetching abecedaris:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAbecedaris();
  }, [session]);

  return { abc, loading };
};

export default useAbecedaris;
