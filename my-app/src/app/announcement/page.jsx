"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../components/Loading";

const Announcement = () => {
  const [announcements, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;


  useEffect(() => {
    const fetchAnnouncement = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}announcement/`, {
          method: "GET",
          headers: {
            "X-API-Key": apikey,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnnouncement(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [apikey, apiUrl]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Announcement</h1>
      <ul className="mt-4">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="border-b py-2">
            <h2 className="font-semibold">{announcement.title_th}</h2>
            {announcement.imagepath ? (
              <Image
                src={announcement.imagepath}
                alt={announcement.title_th} // More descriptive alt text
                width={500}
                height={500}
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400";
                }} // Fallback image
              />
            ) : (
              <p>No image available</p> // Fallback text if no image
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
