import React, { useEffect, useRef } from 'react';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { OpenStreetMapImageryProvider, Viewer, ImageryLayer, CzmlDataSource } from 'cesium';

window.CESIUM_BASE_URL = './Cesium/';

const CesiumMap = () => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
 
  const handleLoadFile = async () => {
    const data = await window.electronAPI.pickCzmlFile();
    // Use viewerRef.current to access the globe we created in useEffect
    if (data && viewerRef.current) {
      try {
        const dataSource = await CzmlDataSource.load(data);
        viewerRef.current.dataSources.add(dataSource);
        viewerRef.current.zoomTo(dataSource);
      } catch (e) {
        console.error("CZML load failed:", e);
      }
    }
  };

  useEffect(() => {
    if (cesiumContainer.current && !viewerRef.current) {
      viewerRef.current = new Viewer(cesiumContainer.current, {
        terrainProvider: undefined, // Optional: customize providers here
        baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
          url: 'https://a.tile.openstreetmap.org/'
        })),
        baseLayerPicker: false,
      });

      window.electronAPI.onTriggerPicker(() => {
        handleLoadFile();
      })

      return () => {
        if (viewerRef.current && !viewerRef.current.isDestroyed()) {
          viewerRef.current.destroy();
          viewerRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div
      ref={cesiumContainer}
      className="cesium-viewer-container"
      style={{
        height: "100%",
        width: "100%",
        margin: 0,
      }}
    />
  );
};

export default CesiumMap;