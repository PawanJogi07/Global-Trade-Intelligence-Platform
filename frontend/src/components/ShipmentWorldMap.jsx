import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { getShipments } from "../services/shipmentService";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const routeCoordinates = {
  "India -> USA": {
    start: [20.5937, 78.9629],
    end: [37.0902, -95.7129],
  },

  "China -> Germany": {
    start: [35.8617, 104.1954],
    end: [51.1657, 10.4515],
  },

  "India -> Germany": {
    start: [20.5937, 78.9629],
    end: [51.1657, 10.4515],
  },
};

function ShipmentWorldMap() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      const data = await getShipments();
      setShipments(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
      }}
    >
      <h2>🌍 Global Shipment Map</h2>

      <MapContainer
        center={[25, 20]}
        zoom={2}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {shipments.map((item) => {
          const route = routeCoordinates[item.route];

          if (!route) return null;

          const color =
            item.risk === "High"
              ? "red"
              : item.risk === "Medium"
              ? "orange"
              : "lime";

          return (
            <>
              <Marker
                key={`${item.shipmentId}-start`}
                position={route.start}
              >
                <Popup>
                  <b>{item.shipmentId}</b>
                  <br />
                  {item.route}
                  <br />
                  Risk: {item.risk}
                  <br />
                  AI Score: {item.predictedRisk ?? "-"}
                </Popup>
              </Marker>

              <Marker
                key={`${item.shipmentId}-end`}
                position={route.end}
              >
                <Popup>
                  Destination
                </Popup>
              </Marker>

              <Polyline
                positions={[route.start, route.end]}
                pathOptions={{
                  color,
                  weight: 5,
                }}
              />
            </>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default ShipmentWorldMap;