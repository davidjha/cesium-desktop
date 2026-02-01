//Type definitions
interface Window {
    CESIUM_BASE_URL: string;
    electronAPI: {
        pickCzmlFile: () => Promise<any>;
        onTriggerPicker: (callback: () => void) => (() => void);
        removeListener: (channel: string, func: (...args: any[]) => void) => void; 
    };
}